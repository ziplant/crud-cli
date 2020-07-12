const commander = require('commander')
const fetch = require('node-fetch')
const readConfig = require('../readConfig')

commander
  .command('update <database> <table>')
  .description('update rows in table')
  .option('-q, --query <value>', 'query condition, format example: key=value&key=value')
  .option('-b, --body <value>', 'query body via key=value format or json string')
  .alias('u')
  .action((database, table, cmd) => {
    let config = JSON.parse(readConfig())

    if(!config) {
      console.log('Error: cannot read config.json')
    } else {
      let path = `http://${config.domain}/api/${database}/${table}/?${cmd.query ? cmd.query : ''}`
      fetch(path, {
        method: 'put',
        body: cmd.body
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    }
  })