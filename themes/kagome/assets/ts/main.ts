(function () {
  const currentTheme = window.localStorage.getItem('theme') || 'auto'; // 默認為自動切換模式
  switchTheme(currentTheme); // 根據保存的主題設置切換主題

  document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.header-nav--btn') as HTMLElement | null; // 更改元素類型

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
      });
    }

    const themeLightBtn = document.querySelector('#theme-light') as HTMLElement | null;
    const themeDarkBtn = document.querySelector('#theme-dark') as HTMLElement | null;
    const themeAutoBtn = document.querySelector('#theme-auto') as HTMLElement | null;

    if (themeLightBtn && themeDarkBtn && themeAutoBtn) {
      themeLightBtn.addEventListener('click', () => switchTheme('light'));
      themeDarkBtn.addEventListener('click', () => switchTheme('dark'));
      themeAutoBtn.addEventListener('click', () => switchTheme('auto'));
    }

    // Lazy load background images
    const lazyBackgrounds = querySelectorArrs('[background-image-lazy]');
    let lazyBackgroundsCount = lazyBackgrounds.length;

    if (lazyBackgroundsCount > 0) {
      const lazyBackgroundObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            const img = target.dataset.img;
            if (img) {
              target.style.backgroundImage = `url(${img})`;
            }
            lazyBackgroundObserver.unobserve(target);
            lazyBackgroundsCount--;
          }
          if (lazyBackgroundsCount <= 0) {
            lazyBackgroundObserver.disconnect();
          }
        });
      });

      lazyBackgrounds.forEach(lazyBackground => {
        lazyBackgroundObserver.observe(lazyBackground);
      });
    }

    // Initialize APlayer
    aplayerInit();

    // Initialize DPlayer
    dplayerInit();
  });
})();

function toCamel(str: string): string {
  const arrs = str.split('-');
  if (arrs.length === 1) return arrs[0];
  return arrs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.toLowerCase().replace(/( |^)[a-z]/g, v => v.toUpperCase());
  });
}

/**
 * 处理 APlayer 或 DPlayer 参数
 * @param el APlayer 或 DPlayer DOM 元素
 * @returns 配置项参数
 */
function formatAttr(el: Element): object {
  const config: { [key: string]: any } = {};
  const numberList = ['lrcType'];
  const boolMap = new Map([
    ['true', true],
    ['false', false],
  ]);

  const attrs = el.getAttributeNames().filter(key => key.startsWith('config-'));

  attrs.forEach(attr => {
    const key = toCamel(attr.replace('config-', ''));
    const value = el.getAttribute(attr);
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

function querySelectorArrs(selector: string): Element[] {
  return Array.from(document.querySelectorAll(selector));
}

function switchTheme(theme: string): void {
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

function aplayerInit(): void {
  const aplayers = querySelectorArrs('.aplayer-box');
  if (aplayers.length && window.APlayer) {
    aplayers.forEach((el: Element) => {
      const params = { container: el, audio: { ...(el.dataset as DOMStringMap) } };
      const config = formatAttr(el);
      new window.APlayer(Object.assign({}, config, params));
    });
  }
}

function dplayerInit(): void {
  const dplayers = querySelectorArrs('.dplayer-box');
  if (dplayers.length && window.DPlayer) {
    dplayers.forEach((el: Element) => {
      const params = { container: el, video: { ...(el.dataset as DOMStringMap) } };
      const config = formatAttr(el);
      new window.DPlayer(Object.assign({}, config, params));
    });
  }
}
