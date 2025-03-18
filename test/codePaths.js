import path from 'path'
import appModulePath from 'app-module-path'

appModulePath.addPath(path.join(__dirname, '..'))
appModulePath.addPath(path.join(__dirname, '..', 'src'))
appModulePath.addPath(path.join(__dirname, '..', 'test'))
