const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sharp = require('sharp');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|jpe?g)$/,
        include: path.resolve(__dirname, 'public'),
        use: [
          {
            loader: 'responsive-loader',
            options: {
              adapter: async (imagePath) => {
                const image = sharp(imagePath);
                const metadata = await image.metadata();
                if (metadata.hasAlpha) {
                  return sharp(imagePath);
                }
                return null; // Skip PNG generation for images without alpha channel
              },
              sizes: [300, 600, 1200, 2000],
              placeholder: true,
              placeholderSize: 20,
              name: 'images/[name]-[width]-[hash:8].png',
              format: 'png',
            },
          },
          {
            loader: 'responsive-loader',
            options: {
              adapter: sharp({
                failOnError: false,
              }),
              sizes: [300, 600, 1200, 2000],
              placeholder: true,
              placeholderSize: 20,
              name: 'images/[name]-[width]-[hash:8].webp',
              format: 'webp',
            },
          },
          {
            loader: 'responsive-loader',
            options: {
              adapter: async (imagePath) => {
                const image = sharp(imagePath);
                const metadata = await image.metadata();
                if (!metadata.hasAlpha) {
                  return sharp(imagePath);
                }
                return null; // Skip JPEG generation for images with alpha channel
              },
              sizes: [300, 600, 1200, 2000],
              placeholder: true,
              placeholderSize: 20,
              name: 'images/[name]-[width]-[hash:8].jpg',
              format: 'jpg',
              quality: 85,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
