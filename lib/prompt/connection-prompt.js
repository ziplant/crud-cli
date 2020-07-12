const { prompt } = require('inquirer')

module.exports = async function connectionPrompt() {
  let config = {}
  
  await prompt([
    { type: 'input', name: 'domain', message: 'Your domain: ', default: 'localhost' },
  ]).then(options => {
    
    config.domain = options.domain
  })
  await prompt([
    { type: 'input', name: 'host', message: 'Database host: ', default: 'localhost' },
    { type: 'input', name: 'user', message: 'Database user: ', default: 'root' },
    { type: 'password', name: 'password', message: 'Database password: ', default: '' },
  ]).then(options => {
    config.connection = options
  })

  return config
}
