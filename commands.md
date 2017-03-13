/* eslint-disable */
Перед вами пример неполной установки js-stack-from-scratch v2 вплоть до socket.io обеспечивает проверку линтом, джестом, сборку вебпаком, вебпак сервер с хот релоадом, редукс и immutablejs
может использоваться как начальный этап развития приложения.
большинство команд установки ниже.

eslint : {
  yarn add --dev eslint
  yarn add --dev eslint-config-kentcdodds
  .eslintrc: {
    {
      "extends": [
        "kentcdodds",
      ],
      "plugins": [
        "react"
      ],
      "rules": {
        "semi": [2, "never"], // убираем точку с запятой
        "no-unexpected-multiline": 2,
        "linebreak-style": 0,
        "import/no-unassigned-import": 0,
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "class-methods-use-this": 0,
        "no-invalid-this": 0,
        "babel/no-invalid-this": 2,
        "no-unused-vars": 0,
        "valid-jsdoc": 0,
        "no-console": 0,
      }
    }
  }
}

babel: {
  yarn add --dev babel-cli // окружение
  yarn add --dev babel-preset-env // пресеты
  yarn add --dev babel-preset-react babel-preset-flow
  .babelrc: {
    {
      "presets": [
        "env",
        "flow",
        "react"
      ]
    }
  }
}

flow: {
  yarn add --dev flow-bin babel-preset-flow babel-eslint eslint-plugin-flowtype
  .babelrc {
    {
      "presets": [
        "env",
        "flow"
      ]
    }
  }
  .flowconfig: { // чтобы иметь возможность отключить flow на след строке // flow-disable-next-line
    [options]
    suppress_comment= \\(.\\|\n\\)*\\flow-disable-next-line
  }
}

jest: { // тесты
  yarn add --dev jest babel-jest
  .eslint: add {
    "env": {
      "jest": true
    }
  }
}

husky: { // не дает сделать коммит, не прошедший тест
  yarn add --dev husky
  package.json: {
    "scripts": {
      "start": "babel-node src",
      "test": "eslint src && flow && jest --coverage",
      "precommit": "yarn test",
      "prepush": "yarn test"
    },
  }
}

////////////////////////////////////////////////////////

express: {
  yarn add express compression
}

webpack: {
  yarn add --dev webpack webpack-dev-server babel-core babel-loader
  webpack.config.babel.js: {
    import path from 'path'

    import {WDS_PORT} from './src/shared/config'
    import {isProd} from './src/shared/util'

    export default {
      entry: [
        './src/client',
      ],
      output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
      },
      module: {
        rules: [
          {test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/},
        ],
      },
      devtool: isProd ? false : 'source-map',
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      devServer: {
        port: WDS_PORT,
      },
    }
  }
}

react! : {
  yarn add react react-dom
}

Hot Module Replacement {
  yarn add react-hot-loader@next
  webpack.config.babel.js: {
    import webpack from 'webpack'
    // [...]
    entry: [
      'react-hot-loader/patch',
      './src/client',
    ],
    // [...]
    devServer: {
      port: WDS_PORT,
      hot: true,
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  }
}
