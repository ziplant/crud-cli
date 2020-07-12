const mysql = require('mysql')
const fs = require('fs')
const connectionPrompt = require('./prompt/connection-prompt')
const { databasesPrompt, tablesPrompt } = require('./prompt/allowed-prompt')
const chalk = require('chalk')

module.exports = async function createConfig() {
  let config = {}

  console.log('Creating config file...')

  config = await connectionPrompt()

  let db = mysql.createConnection(config.connection)
  
  db.query('show databases', async (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    let databases = []
    res.forEach(el => {
      databases.push(el.Database)
    })
    config.allowed = await databasesPrompt(databases)
    
    let queries = Object.keys(config.allowed).length

    for(key in config.allowed) {
      let currentKey = key
      db.query(`show tables from ${currentKey}`, async (err, res) => {
        if (err) {
          console.log(err)
          return
        }
        res.forEach(el => {
          config.allowed[currentKey].push(el[`Tables_in_${currentKey}`])
        })
        queries--
      })
    }
    
    let queryCheck = setInterval(async () => {
      if(!queries) {
        clearInterval(queryCheck)
        for (key in config.allowed) {
          config.allowed[key] = await tablesPrompt(config.allowed[key], key)
        }

        db.destroy()
        fs.writeFileSync('api/config.json', JSON.stringify(config, null, 2))
        console.log(chalk.green('Config file created!'))
      }
    }, 100)
    
    
  })
}
