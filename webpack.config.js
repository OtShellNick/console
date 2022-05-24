const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { NODE_ENV } = process.env;
const IsDev = process.env.NODE_ENV === 'development';

const filename = (ext) => (IsDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }];

  if (IsDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

const plugins = () => [
  new HTMLWebpackPlugin({
    template: './src/index.html',
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: filename('css'),
  }),
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.scss'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  mode: NODE_ENV || 'production',
  entry: ['@babel/polyfill', path.resolve(__dirname, './src/index.tsx')],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        oneOf: [
          {
            resourceQuery: /tsx/,
            use: ['@svgr/webpack'],
          },
          {
            use: 'url-loader',
          },
        ],
        issuer: /\.[jt]sx?$/,
      },
      {
        test: /\.svg$/,

      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[contenthash][ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-typescript'),
          },
        ],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react'),
          },
        ],
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react'),
          },
          {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-typescript'),
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: true,
    static: './build',
    historyApiFallback: true,
  },
  plugins: plugins(),
};
