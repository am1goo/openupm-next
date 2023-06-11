// Configuration for region us (lang zh-CN)

export const config: any = {
  lang: "zh-CN",
  title: "OpenUPM中文网",
  description: "OpenUPM是收集Unity开源软件包的仓库和自动化构建服务。",
  head: [
    ["meta", { name: "keywords", content: "openupm,upm,registry,unity,package,manager,open source,开源,软件源,软件包,软件包仓库" }],
    ["script", { src: "/vendors/https-only/https-only.js" }],
    // GA4
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-2GQ1LGF9G0' }],
    ['script', {}, ["window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-2GQ1LGF9G0');"]],
  ],
};

const docSideBar = function () {
  return [
    {
      title: "使用指南",
      collapsable: false,
      children: [
        "/zh/docs/",
        "/zh/docs/getting-started",
        "/zh/docs/adding-upm-package",
        "/zh/docs/modifying-upm-package",
        "/zh/docs/opt-out",
        "/zh/support/"
      ]
    },
    {
      title: "NuGet",
      collapsable: false,
      children: [
        "/nuget/"
      ]
    },
    {
      title: "软件包作者指南",
      collapsable: false,
      children: ["/zh/docs/adding-badge", "/zh/docs/managing-upm-project"]
    },
    {
      title: "OpenUPM维护指南",
      collapsable: true,
      children: ["/zh/docs/dev/"]
    },
    {
      title: "其他资源",
      collapsable: true,
      children: [
        "/zh/docs/team",
        "/zh/docs/terms",
        "/zh/docs/code-of-conduct",
        "/zh/docs/privacy"
      ]
    }
  ];
};

export const themeConfig: any = {
  editLinkText: "编辑此页面",
  navbar: [
    { text: "软件包", link: "/packages/" },
    { text: "NuGet", link: "/nuget/" },
    { text: "文档", link: "/zh/docs/" },
    {
      text: "支持",
      children: [
        { text: "支持OpenUPM", link: "/zh/support/" },
        { text: "贡献者", link: "/contributors/" }
      ]
    },
    {
      text: "社区",
      children: [
        {
          text: "GitHub",
          link:
            "https://github.com/openupm/openupm/blob/master/README.zh-cn.md",
          icon: "fab fa-github",
          iconLeft: true
        },
        {
          text: "GitHub论坛",
          link: "https://github.com/openupm/openupm/discussions",
          icon: "fas fa-hands-helping",
          iconLeft: true
        },
        {
          link: "mailto:hello@openupm.com",
          text: "联系我们",
          icon: "fas fa-envelope",
          iconLeft: true
        },
        {
          link: "https://api.openupm.cn/feeds/updates/rss",
          text: "软件包更新",
          icon: "fa fa-rss-square",
          raw: true,
          iconLeft: true
        }
      ]
    },
    {
      text: "命令行工具",
      link: "https://github.com/openupm/openupm-cli/blob/master/README.zh-cn.md#openupm-cli",
      icon: "fa fa-keyboard",
      iconLeft: true
    },
    {
      text: "区域",
      children: [
        { text: "Global/国际区", link: "https://openupm.com" },
        { text: "中文区", link: "/" }
      ]
    }
  ],
  sidebar: {
    "/docs/": docSideBar(),
    "/nuget/": docSideBar(),
    "/support/": docSideBar(),
    "/zh/": docSideBar()
  },
};
