#!/usr/bin/env node

const { spawn } = require('child_process')
const path = require('path')

// Path to the release-it config bundled with this package
const configPath = path.join(process.cwd(), '..', 'config', 'release-it.js')

// Run release-it with our bundled config
const args = [
  '--config',
  configPath,
  ...process.argv.slice(2), // Pass through any additional args
]

const releaseIt = spawn('npx', ['release-it', ...args], {
  stdio: 'inherit',
  shell: true,
})

releaseIt.on('close', (code) => {
  process.exit(code)
})
