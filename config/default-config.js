// TODO: config away, this is all AI boilerplate for now

// index.js
const defaultConfig = {
  git: {
    commitMessage: "chore: release v${version}",
    tagName: "v${version}",
    requireBranch: "main"
  },
  npm: {
    publish: true,
    publishCommand: "yarn npm publish"
  },
  github: {
    release: true,
    releaseName: "Release ${version}"
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: "angular",
      infile: "CHANGELOG.md"
    }
  },
  hooks: {
    // TODO: a good reason to enable other packages to customize this, is to
    // add a test hook here... we'll flexibilize this later
    "before:init": ["yarn lint"]
    // "after:bump": "yarn build"
  }
}

export default defaultConfig

// Different configurations for different project types
// const configs = {
//   default: defaultConfig,
  
//   library: {
//     ...defaultConfig,
//     hooks: {
//       "before:init": ["yarn lint", "yarn test"],
//       "after:bump": ["yarn build", "yarn test:integration"]
//     }
//   },
  
//   application: {
//     ...defaultConfig,
//     npm: {
//       publish: false  // Don't publish apps to npm
//     },
//     hooks: {
//       "before:init": ["yarn lint", "yarn test"],
//       "after:bump": "yarn build"
//     }
//   },
  
//   monorepo: {
//     ...defaultConfig,
//     git: {
//       ...defaultConfig.git,
//       commitMessage: "chore: release ${name}@${version}"
//     },
//     npm: {
//       publish: true,
//       publishCommand: "yarn workspace ${name} npm publish"
//     }
//   }
// }

// // Function to merge user config with base config
// function createConfig(type = 'default', userConfig = {}) {
//   const baseConfig = configs[type] || configs.default
  
//   // Deep merge function
//   function deepMerge(target, source) {
//     const result = { ...target }
    
//     for (const key in source) {
//       if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
//         result[key] = deepMerge(target[key] || {}, source[key])
//       } else {
//         result[key] = source[key]
//       }
//     }
    
//     return result
//   }
  
//   return deepMerge(baseConfig, userConfig)
// }

// module.exports = {
//   configs,
//   createConfig,
//   default: defaultConfig
// }