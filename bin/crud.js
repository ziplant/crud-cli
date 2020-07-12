#!/usr/bin/env node
const commander = require('commander')
const package = require('../package.json')

commander.version(package.version).description(package.description)

require('../lib/commands/init')
require('../lib/commands/config')
require('../lib/commands/create')
require('../lib/commands/read')
require('../lib/commands/update')
require('../lib/commands/delete')

commander.parse(process.argv)

