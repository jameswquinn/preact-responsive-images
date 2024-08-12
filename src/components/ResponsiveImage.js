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
