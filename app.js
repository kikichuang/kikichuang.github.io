const pageMetadata = {
  "zh-CN": {
    title: "庄乃汇（莊迺彙）｜Naihui Chuang",
    description: "厦门大学法学院法学本科生庄乃汇的个人主页，记录她在法学研究、社会调研、学生组织与公共服务中的学习和实践。",
    identity: "庄乃汇 · Naihui Chuang",
    skip: "跳至主要内容",
    themeLight: "切换至明亮模式",
    themeDark: "切换至暗色模式",
    languageLabel: "语言切换",
    topLabel: "返回顶部",
    footer: "庄乃汇 · Naihui Chuang",
  },
  "zh-Hant": {
    title: "莊迺彙｜Naihui Chuang",
    description: "廈門大學法學院法學本科生莊迺彙的個人主頁，記錄她在法學研究、社會調研、學生組織與公共服務中的學習和實踐。",
    identity: "莊迺彙 · Naihui Chuang",
    skip: "跳至主要內容",
    themeLight: "切換至明亮模式",
    themeDark: "切換至暗色模式",
    languageLabel: "語言切換",
    topLabel: "返回頂部",
    footer: "莊迺彙 · Naihui Chuang",
  },
  en: {
    title: "Naihui Chuang | Law Undergraduate at Xiamen University",
    description: "The personal website of Naihui Chuang, a law undergraduate at Xiamen University whose work spans legal research, fieldwork, student leadership, and community service.",
    identity: "Naihui Chuang",
    skip: "Skip to main content",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
    languageLabel: "Language",
    topLabel: "Back to top",
    footer: "Naihui Chuang",
  },
};

const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const languageButtons = [...document.querySelectorAll("[data-language]")];
const pages = [...document.querySelectorAll("[data-page-language]")];
const metaDescription = document.querySelector('meta[name="description"]');
const skipLink = document.querySelector(".skip-link");
const languageGroup = document.querySelector(".language-switch");
const identityLink = document.querySelector(".identity-link");
const footerName = document.querySelector(".footer-name");

let currentLanguage = localStorage.getItem("naihui-language");
if (!pageMetadata[currentLanguage]) currentLanguage = "zh-CN";

function updateThemeLabel() {
  const copy = pageMetadata[currentLanguage];
  const targetIsLight = root.dataset.theme === "dark";
  themeButton.setAttribute("aria-label", targetIsLight ? copy.themeLight : copy.themeDark);
  themeButton.setAttribute("title", targetIsLight ? copy.themeLight : copy.themeDark);
}

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("naihui-theme", theme);
  updateThemeLabel();
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("naihui-language", language);

  pages.forEach((page) => {
    page.hidden = page.dataset.pageLanguage !== language;
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });

  const copy = pageMetadata[language];
  root.lang = language;
  document.title = copy.title;
  metaDescription.setAttribute("content", copy.description);
  skipLink.textContent = copy.skip;
  languageGroup.setAttribute("aria-label", copy.languageLabel);
  identityLink.setAttribute("aria-label", copy.topLabel);
  identityLink.innerHTML = language === "en"
    ? "<span>Naihui Chuang</span>"
    : `<span class="identity-primary">${language === "zh-Hant" ? "莊迺彙" : "庄乃汇"}</span><span class="identity-separator" aria-hidden="true">·</span><span>Naihui Chuang</span>`;
  footerName.textContent = copy.footer;
  updateThemeLabel();
}

themeButton.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

setLanguage(currentLanguage);
