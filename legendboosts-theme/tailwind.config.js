/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.njk',
    './templates/**/*.njk',
    './components/**/*.njk',
    './snippets/**/*.njk',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--cl-background) / <alpha-value>)',
        card: 'rgb(var(--cl-card) / <alpha-value>)',
        'accent-500': 'rgb(var(--cl-accent) / <alpha-value>)',
        't-primary': 'rgb(var(--cl-t-primary) / <alpha-value>)',
        't-accent': 'rgb(var(--cl-t-accent) / <alpha-value>)',
      },
      aspectRatio: {
        'product-card-image': 'var(--product-card-image-aspect-ratio)',
        'product-page-image': 'var(--product-page-image-aspect-ratio)',
        'group-card-image': 'var(--group-card-image-aspect-ratio)',
        'blog-card-image': 'var(--blog-card-image-aspect-ratio)',
      },
      objectFit: {
        'product-image': 'var(--product-image-fit)',
        'group-image': 'var(--group-image-fit)',
      },
    },
  },
  plugins: [],
};
