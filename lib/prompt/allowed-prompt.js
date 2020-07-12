const { prompt } = require('inquirer')

async function databasesPrompt(databases) {
  config = {}
  await prompt([
    { type: 'checkbox', name: 'db', message: 'Choose allowed databases: ', choices: databases },
  ]).then(options => {
    options.db.forEach(el => {
      config[el] = []
    })
  })
  return config
}

async function tablesPrompt(tables, database) {
  config = []
  await prompt([
    { type: 'checkbox', name: 'tb', message: `Choose allowed tables in ${database}: `, choices: tables },
  ]).then(options => {
    options.tb.forEach(el => {
      config.push(el)
    })
  })
  return config
}

module.exports = {
  databasesPrompt,
  tablesPrompt
}