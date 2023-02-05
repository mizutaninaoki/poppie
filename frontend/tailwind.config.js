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
  daisyui: {
    themes: [
      {
        mytheme: {
          // primary: '#570DF8',
          primary: '#16A34A', // bg-green-600の色
          secondary: '#F000B8',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
};
