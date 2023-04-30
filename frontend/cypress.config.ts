import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3000`,
    supportFile: "cypress/support/e2e.ts",
    // 以下にインテグレーションテストを走らせる前に設定することを書く
    // https://docs.cypress.io/guides/references/configuration#e2e
    // https://qiita.com/odennkunn/items/bd643f5aa1cd0e6930f0
    // setupNodeEvents(on, config) {
    //   let envFile = config.env.CYPRESS_ENV === 'dev' ? '.e2e.env' : '.env.production';
    //   require('dotenv').config({ path: envFile });
    // },
  },
});
