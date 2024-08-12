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

... [previous questions remain the same]

Q: How does the image processing decide which formats to generate?
A: The Webpack configuration analyzes each image. It always creates WebP versions, creates PNG versions only for images with an alpha channel, and creates JPEG versions only for images without an alpha channel.

... [rest of the FAQ and document remains the same]
