// see: https://tailwindcss.jp/docs/configuration
module.exports = {
  mode: 'jit', // Just In Timeモード使用
  // see: https://zenn.dev/azukiazusa/articles/bee71756d66679
  darkMode: 'media',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        allscreen: '9999px', // トップ画面で全画面に対してbackground-colorを当てるため
      },
    },
  },
  plugins: [require('daisyui')],
};
