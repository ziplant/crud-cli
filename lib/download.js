const download = require('download')
const chalk = require('chalk')

module.exports = async function downloadApi() {
  console.log('Downloading CRUDapi...')
  await download('https://github.com/ziplant/CRUDapi/archive/master.zip', 'api', {
    mode: "755",
    extract: true,
    strip: 1
  })
  console.log(chalk.green('Download ompleted!'))
}

