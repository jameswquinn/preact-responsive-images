# Preact App with Responsive Images

This project demonstrates a Preact application that uses responsive images with WebP support and intelligent fallback to PNG or JPEG based on alpha channel presence.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourusername/your-repo-name)

## File Structure

```
project-root/
│
├── src/
│   ├── components/
│   │   └── ResponsiveImage.js
│   ├── index.js
│   └── index.html
│
├── public/
│   └── images/
│       └── large_original.png
│
├── webpack.config.js
├── package.json
├── .babelrc
├── vercel.json
└── README.md
```

## Files

### webpack.config.js

```javascript
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
```

### src/components/ResponsiveImage.js

```javascript
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function ResponsiveImage({ src, alt }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    import(`../../public/images/${src}`).then((importedImage) => {
      setImageData(importedImage.default);
    });
  }, [src]);

  if (!imageData) return <div>Loading image...</div>;

  const fallbackFormat = imageData.images.some(img => img.path.endsWith('.png')) ? 'png' : 'jpg';
  const srcSet = imageData.images
    .filter(img => img.path.endsWith('.webp'))
    .map(img => `${img.path} ${img.width}w`)
    .join(', ');
  const fallbackSrcSet = imageData.images
    .filter(img => img.path.endsWith(`.${fallbackFormat}`))
    .map(img => `${img.path} ${img.width}w`)
    .join(', ');

  return (
    <img
      src={imageData.src}
      srcSet={`${srcSet}, ${fallbackSrcSet}`}
      sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      alt={alt}
    />
  );
}

export default ResponsiveImage;
```

### src/index.js

```javascript
import { h, render } from 'preact';
import ResponsiveImage from './components/ResponsiveImage';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to our Preact application with responsive images.</p>
      <ResponsiveImage src="large_original.png" alt="Responsive Image" />
    </div>
  );
}

render(<App />, document.body);
```

### src/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preact Hello World with Responsive Images</title>
</head>
<body>
    <!-- Preact will render into the body -->
</body>
</html>
```

### package.json

```json
{
  "name": "preact-responsive-images",
  "version": "1.0.0",
  "description": "Preact app demonstrating responsive images with WebP support",
  "main": "src/index.js",
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "preact": "^10.5.13"
  },
  "devDependencies": {
    "@babel/core": "^7.14.3",
    "@babel/preset-env": "^7.14.2",
    "@babel/preset-react": "^7.13.13",
    "babel-loader": "^8.2.2",
    "html-webpack-plugin": "^5.3.1",
    "responsive-loader": "^2.3.0",
    "sharp": "^0.28.3",
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

### .babelrc

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", {"pragma": "h", "pragmaFrag": "Fragment"}]
  ]
}
```

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/[^.]+", "dest": "/index.html" }
  ]
}
```

## Setup Instructions

1. Create a new directory for your project and navigate into it.
2. Create the file structure as shown above.
3. Copy the contents of each file into its respective location in your project.
4. Place your `large_original.png` file in the `public/images/` directory.
5. Run `npm install` to install all the dependencies.
6. To start the development server, run `npm start`.
7. To build for production, run `npm run build`.

## How it works

- The Webpack configuration generates multiple sizes of PNG, WebP, and JPEG images based on the input image characteristics:
  - WebP versions are always created.
  - PNG versions are only created for images with an alpha channel.
  - JPEG versions are only created for images without an alpha channel.
- The Preact component `ResponsiveImage` dynamically imports the image data generated by Webpack.
- It creates a `srcSet` that includes both WebP and the fallback format (PNG or JPEG).
- The browser will use WebP if supported, falling back to PNG or JPEG if not.
- The `sizes` attribute ensures the browser selects the appropriate image size based on the viewport.

This setup provides a responsive image solution that:
- Respects the alpha channel of the original image
- Uses WebP when supported by the browser
- Falls back to PNG or JPEG as appropriate
- Uses a single `<img>` tag for simplicity and compatibility
- Allows for responsive image loading based on viewport size

## Deployment

This project is set up for easy deployment to Vercel. Click the "Deploy with Vercel" button at the top of this README to deploy your own instance.

For other deployment options, run `npm run build` and deploy the contents of the `dist/` directory to any static hosting service.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
