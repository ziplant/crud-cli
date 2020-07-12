const commander = require('commander')
const chalk = require('chalk')
const createConfig = require('../createConfig');
const downloadApi = require('../download')

module.exports = commander
  .command('init')
  .description('project initialization via downloading CRUDapi from git repository and creating config file')
  .action(async () => {
    await downloadApi()
    await createConfig()

    console.log(chalk.green('Initialization completed!'))
  })