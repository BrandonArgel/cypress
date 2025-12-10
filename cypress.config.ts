import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "po879t",

  e2e: {
    baseUrl: "https://demoqa.com/",
    excludeSpecPattern: ["**/learning/**"],
    viewportWidth: 2560,
    viewportHeight: 1440,
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" || browser.name === "electron") {
          launchOptions.args.push("--force-dark-mode");
          launchOptions.args.push("--enable-features=WebUIDarkMode");
        }

        return launchOptions;
      });

      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },
    env: {
      CYPRESS_HIDE_XHR: true,
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
