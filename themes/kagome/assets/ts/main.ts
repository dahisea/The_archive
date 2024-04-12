(function () {
  const currentTheme = window.localStorage.getItem('theme') || 'auto'; // 默認為自動切換模式
  switchTheme(currentTheme); // 根據保存的主題設置切換主題

  document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.header-nav--btn'); // 找到移動菜單按鈕

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
      });
    }

    const themeLightBtn = document.querySelector('#theme-light');
    const themeDarkBtn = document.querySelector('#theme-dark');
    const themeAutoBtn = document.querySelector('#theme-auto');

    if (themeLightBtn && themeDarkBtn && themeAutoBtn) {
      themeLightBtn.addEventListener('click', () => switchTheme('light'));
      themeDarkBtn.addEventListener('click', () => switchTheme('dark'));
      themeAutoBtn.addEventListener('click', () => switchTheme('auto'));
    }

    // Lazy load background images
    const lazyBackgrounds = document.querySelectorAll('[background-image-lazy]');
    let lazyBackgroundsCount = lazyBackgrounds.length;

    if (lazyBackgroundsCount > 0) {
      const lazyBackgroundObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target.dataset.img;
            if (img) {
              entry.target.style.backgroundImage = `url(${img})`;
            }
            lazyBackgroundObserver.unobserve(entry.target);
            lazyBackgroundsCount--;
            if (lazyBackgroundsCount <= 0) {
              lazyBackgroundObserver.disconnect();
            }
          }
        });
      });

      lazyBackgrounds.forEach(lazyBackground => {
        lazyBackgroundObserver.observe(lazyBackground);
      });
    }

    // Initialize APlayer and DPlayer
    aplayerInit();
    dplayerInit();
  });
})();

function toCamel(str) {
  const arrs = str.split('-');
  if (arrs.length === 1) return arrs[0];
  return arrs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.toLowerCase().replace(/( |^)[a-z]/g, v => v.toUpperCase());
  });
}

function formatAttr(el) {
  const config = {};
  const numberList = ['lrcType'];
  const boolMap = new Map([
    ['true', true],
    ['false', false],
  ]);

  const attrs = Array.from(el.attributes);

  attrs.forEach(({ name, value }) => {
    const key = toCamel(name.replace('config-', ''));
    const toBool = boolMap.get(value);

    if (toBool !== undefined) { // 处理布尔值
      config[key] = toBool;
    } else if (numberList.includes(key)) { // 处理数值
      config[key] = parseInt(value || '0', 10); // 使用十进制解析数值
    } else { // 字符串
      config[key] = value || '';
    }
  });

  return config;
}

function switchTheme(theme) {
  const rootDom = document.documentElement;

  if (theme === 'auto') {
    // 根据系统设置切换主题
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDarkMode ? 'dark' : 'light';
  }

  // 根据主题设置更新 CSS 变量
  rootDom.classList.remove('theme-light', 'theme-dark');
  rootDom.classList.add(`theme-${theme}`);

  // 保存主题设置到本地存储
  window.localStorage.setItem('theme', theme);
}

function aplayerInit() {
  const aplayers = document.querySelectorAll('.aplayer-box');
  if (aplayers.length && window.APlayer) {
    aplayers.forEach(el => {
      const params = { container: el, audio: { ...(el.dataset || {}) } };
      const config = formatAttr(el);
      new window.APlayer(Object.assign({}, config, params));
    });
  }
}

function dplayerInit() {
  const dplayers = document.querySelectorAll('.dplayer-box');
  if (dplayers.length && window.DPlayer) {
    dplayers.forEach(el => {
      const params = { container: el, video: { ...(el.dataset || {}) } };
      const config = formatAttr(el);
      new window.DPlayer(Object.assign({}, config, params));
    });
  }
}
