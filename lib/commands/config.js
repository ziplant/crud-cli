const commander = require('commander')
const createConfig = require('../createConfig');

commander
  .command('config')
  .description('configure config file')
  .action(() => {
    createConfig()
  })
