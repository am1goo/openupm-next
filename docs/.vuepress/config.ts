import { isArray, mergeWith } from "lodash-es";
import { defaultTheme } from 'vuepress'
import { getDirname, path } from "@vuepress/utils";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { viteBundler } from '@vuepress/bundler-vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import OpenupmPlugin from '../../dist/vuepress-plugin-openupm';

const __dirname = getDirname(import.meta.url)

const VITE_OPENUPM_REGION = process.env.VITE_OPENUPM_REGION == "cn" ? "cn" : "us";
import configUs from "./config-us";
import configCn from "./config-cn";
const regionConfig: any = VITE_OPENUPM_REGION == "cn" ? configCn : configUs;
const THEME_COLOR = "#3068E5";

// Merge customizer to concat arrays
const mergeCustomizer = (obj, src) => { if (isArray(obj)) return obj.concat(src); };

// Merge themeConfig with regionConfig.themeConfig
const themeConfig: any = mergeWith({
  // Default theme configurations
  // https://v2.vuepress.vuejs.org/reference/default-theme/config.html
  docsRepo: "https://github.com/openupm/openupm-next",
  docsDir: "docs",
  editLinks: true,
  logo: "/images/openupm-icon-256.png",
  lastUpdated: false,
  contributors: false,
  // Custom configurations here
  // ...
}, regionConfig.themeConfig, mergeCustomizer);

// Merge config with regionConfig.config
const config: any = mergeWith({
  theme: defaultTheme(themeConfig),
  head: [
    ["meta", { name: "theme-color", content: THEME_COLOR }],
    ["link", { rel: "icon", href: "/images/openupm-icon-256.png" }],
    ["link", { rel: "mask-icon", href: "/images/openupm-icon-mask.svg", color: THEME_COLOR }],
    ["link", { rel: "apple-touch-icon", href: "/images/openupm-icon-256.png" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "msapplication-TileImage", content: "/images/openupm-icon-256.png" }],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["link", { rel: "stylesheet", href: "/vendors/fontawesome-free@5.15.1/css/all.css" }],
    ["link", { rel: "stylesheet", href: "/vendors/cookieconsent@3.1.1/build/cookieconsent.min.css" }],
  ],
  plugins: [
    registerComponentsPlugin({ componentsDir: path.resolve(__dirname, "./components") }),
    OpenupmPlugin({}),
  ],
  alias: {
    '@': path.resolve(__dirname),
    '@node': path.resolve(__dirname, '../../src/node'),
    '@shared': path.resolve(__dirname, '../../src/shared'),
    '@theme/AutoLink.vue': path.resolve(__dirname, 'components/AutoLink.vue'),
    '@theme/Navbar.vue': path.resolve(__dirname, 'components/Navbar.vue'),
    // https://github.com/intlify/vue-i18n-next/issues/789
    'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-browser.prod.js',
  },
  markdown: {
    code: {
      lineNumbers: false,
    }
  },
  shouldPrefetch: false,
  bundler: viteBundler({
    viteOptions: {
      css: {
        preprocessorOptions: {
          scss: { quietDeps: true }
        }
      },
      plugins: [
        VueI18nPlugin({
          // locale messages resource pre-compile option
          include: [path.resolve(__dirname, './locales/**')],
        }),
      ]
    },
  }),
}, regionConfig.config, mergeCustomizer);

export default config;
