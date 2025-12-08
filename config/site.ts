export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PicWe CCN",
  description: "Commodity Credit Network - Global Commodity Financing & Settlement Platform",
  navItems: [
    {
      label: "Home", // 首页
      href: "/home",
    },
    {
      label: "Products", // 商品管理
      href: "/products",
    },
    {
      label: "Financing", // 融资申请
      href: "/financing",
    },
    {
      label: "Pools", // 融资池
      href: "/pools",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/leafjava/picwe",
    twitter: "https://x.com/PicWeGlobal?t=Yzb-vFY7C0JApMzx0z42GQ&s=05",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
