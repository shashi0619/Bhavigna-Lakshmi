const withOptimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins(
  [
    [
      withOptimizedImages,
      {
        optimizeImagesInDev: true,
      },
    ],
  ],
  {
    images: {
      disableStaticImages: true,
    },
    async rewrites() {
      return [
        { source: '/piece/:slug', destination: '/piece?slug=:slug' },
        { source: '/gallery/:collection', destination: '/gallery?collection=:collection' },
      ];
    },
  }
);
