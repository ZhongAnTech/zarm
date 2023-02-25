const path = require('path');

const config = {
  projectName: 'demo',
  date: '2022-11-10',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html'
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false,
    }
  },
  alias: {
    'react': path.resolve(__dirname, '../', 'node_modules/react'),
    '@tarojs/components': path.resolve(__dirname, '../', 'node_modules/@tarojs/plugin-platform-weapp/dist/components-react'),
    // 'react-dom': path.resolve(__dirname, '../', 'node_modules/react-dom/client'),
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      },
      'postcss-transform-selector': {
        enable: true,
        config: {
          selector: [':root, page', '^za'],
          transform: (decl) => {
            const oldValue = decl.value;
            const val = oldValue.replace(/(\d*\.?\d+)(px)/g, (_match, value) => {
              return `${parseInt(value, 10) * 2}rpx`;
            });
            decl.value = val;
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      },
      // 'postcss-selector-replace': {
      //   enable: true,
      //   config: {
      //     before: ['page'],
      //     after: [':root'],
      //   }
      // },
      'postcss-transform-selector': {
        enable: true,
        config: {
          selector: [':root, page', '^za'],
          transform: (decl) => {
            const oldValue = decl.value;
            const val = oldValue.replace(/(\d*\.?\d+)(px)/g, (_match, value, unit) => {
              return `${value * 2}${unit}`;
            });
            decl.value = val;
          }
        }
      }
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
};

module.exports =  (merge) => {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
