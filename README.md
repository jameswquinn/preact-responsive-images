# Preact Responsive Image Project

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourusername/your-repo-name)

This project demonstrates a Preact application that uses responsive images with WebP support and fallback to PNG or JPEG based on alpha channel presence.

## Table of Contents

- [File Structure](#file-structure)
- [Setup](#setup)
- [API](#api)
- [FAQ](#faq)
- [Deployment](#deployment)

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
└── README.md
```

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Build for production:
   ```
   npm run build
   ```

## API

### ResponsiveImage Component

The `ResponsiveImage` component is the core of this project. It handles the responsive loading of images with WebP support and appropriate fallbacks.

#### Props

- `src` (string, required): The filename of the image in the `public/images/` directory.
- `alt` (string, required): The alt text for the image.

#### Usage

```jsx
import ResponsiveImage from './components/ResponsiveImage';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <ResponsiveImage src="large_original.png" alt="A responsive image" />
    </div>
  );
}
```

### Webpack Configuration

The Webpack configuration in `webpack.config.js` handles the generation of responsive images. It creates multiple sizes of PNG and WebP images for all PNG files in the `public/images/` directory. It also generates JPEG versions, but only for PNG files without an alpha channel.

#### Key features:

- Generates images in sizes: 300w, 600w, 1200w, 2000w
- Creates WebP versions of all images
- Creates JPEG versions only for images without alpha channel
- Uses `responsive-loader` and `sharp` for efficient image processing

## FAQ

Q: Why use WebP?
A: WebP offers superior compression and quality compared to PNG and JPEG, resulting in smaller file sizes and faster load times.

Q: What happens if a browser doesn't support WebP?
A: The component automatically falls back to PNG or JPEG, depending on whether the original image had an alpha channel.

Q: How does the component decide between PNG and JPEG fallback?
A: If the original image had an alpha channel, it falls back to PNG. Otherwise, it uses JPEG for better compression.

Q: Can I use this with images other than PNG?
A: The current setup is optimized for PNG input. To use other formats, you'd need to modify the Webpack configuration.

Q: How can I change the generated image sizes?
A: Modify the `sizes` array in the Webpack configuration file.

## Deployment

This project is set up for easy deployment to Vercel. Click the "Deploy with Vercel" button at the top of this README to deploy your own instance.

For other deployment options:

1. Build the project:
   ```
   npm run build
   ```

2. The `dist/` directory will contain the built project, which can be deployed to any static hosting service.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
