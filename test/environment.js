import path from 'path'
import appModulePath from 'app-module-path'
import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'

// This require has side-effects - it adds the project root to the module path,
// so that imports like 'test/server/...' will work
require('./codePaths')
// Also add in the top-level directory so that imports like 'test/server/...'
// will work
appModulePath.addPath(path.join(__dirname, '..', '..'))

chai.use(sinonChai)
chai.use(chaiAsPromised)

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()

// Load up our custom Chai assertions
require('./custom-chai')
