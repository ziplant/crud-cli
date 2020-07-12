const commander = require('commander')
const fetch = require('node-fetch')
const readConfig = require('../readConfig')

commander
  .command('create <database> <table>')
  .description('create row in table')
  .option('-b, --body <value>', 'query body via key=value&key=value format or json string')
  .alias('c')
  .action((database, table, cmd) => {
    let config = JSON.parse(readConfig())

    if(!config) {
      console.log('Error: cannot read config.json')
    } else {
      let path = `http://${config.domain}/api/${database}/${table}/`
      fetch(path, {
        method: 'post',
        body: cmd.body
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    }
  })