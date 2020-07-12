const path = require("path")
const fs = require('fs')

module.exports = function readConfig() {
  if (fs.existsSync(path.join(path.resolve(), 'config.json'))) {
    return fs.readFileSync(path.join(path.resolve(), 'config.json'), {encoding: 'utf-8'})
  }
  else if (fs.existsSync(path.join(path.resolve(), 'api', 'config.json'))) {
    return fs.readFileSync(path.join(path.resolve(), 'api', 'config.json'), {encoding: 'utf-8'})
  }
}