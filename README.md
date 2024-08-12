# Preact Responsive Image Project

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourusername/your-repo-name)

This project demonstrates a Preact application that uses responsive images with WebP support and intelligent fallback to PNG or JPEG based on alpha channel presence.

## Table of Contents

- [File Structure](#file-structure)
- [Setup](#setup)
- [API](#api)
- [FAQ](#faq)
- [Deployment](#deployment)

... [previous sections remain the same]

## API

### Webpack Configuration

The Webpack configuration in `webpack.config.js` handles the intelligent generation of responsive images. It processes all image files in the `public/images/` directory as follows:

- Creates WebP versions for all images in sizes: 300w, 600w, 1200w, 2000w
- Creates PNG versions only for images with an alpha channel
- Creates JPEG versions only for images without an alpha channel

#### Key features:

- Intelligent format selection based on image characteristics
- Multiple sizes for responsive loading: 300w, 600w, 1200w, 2000w
- WebP creation for all images for browsers that support it
- Uses `responsive-loader` and `sharp` for efficient image processing

... [rest of the README remains the same]

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

Q: How does the image processing decide which formats to generate?
A: The Webpack configuration analyzes each image. It always creates WebP versions, creates PNG versions only for images with an alpha channel, and creates JPEG versions only for images without an alpha channel.


