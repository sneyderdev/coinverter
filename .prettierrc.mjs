/** @type {import("prettier").Config} */
export default {
  quoteProps: "consistent",
  trailingComma: "es5",
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};