const commander = require('commander')
const fetch = require('node-fetch')
const readConfig = require('../readConfig')

commander
  .command('read <database> <table>')
  .description('read rows in table')
  .option('-q, --query <value>', 'query condition, format example: key=value&key=value')
  .alias('r')
  .action((database, table, cmd) => {
    let config = JSON.parse(readConfig())

    if(!config) {
      console.log('Error: cannot read config.json')
    } else {
      let path = `http://${config.domain}/api/${database}/${table}/?${cmd.query ? cmd.query : ''}`
      fetch(path)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    }
  })
