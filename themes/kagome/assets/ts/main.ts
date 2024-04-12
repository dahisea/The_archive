(function () {
  
// 新的代碼片段
const currentTheme = window.localStorage.getItem('theme') || 'auto'; // 默認為自動切換模式

switchTheme(currentTheme); // 根據保存的主題設置切換主題

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.header-nav--btn') as HTMLElement; // 更改元素類型

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


    /** background image lazy */
    const lazyBackgrounds = querySelectorArrs('[background-image-lazy]')
    let lazyBackgroundsCount = lazyBackgrounds.length
    if (lazyBackgroundsCount > 0) {
      let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function({ isIntersecting, target }) {
          if (isIntersecting) {
            let img = target.dataset.img
            if (img) {
              target.style.backgroundImage = `url(${img})`
            }
            lazyBackgroundObserver.unobserve(target)
            lazyBackgroundsCount --
          }
          if (lazyBackgroundsCount <= 0) {
            lazyBackgroundObserver.disconnect()
          }
        })
      })

      lazyBackgrounds.forEach(function(lazyBackground) {
        lazyBackgroundObserver.observe(lazyBackground)
      })
    }

    /** aplayer init */
    aplayerInit()
    /** dplayer init */
    dplayerInit()
  });
})();

function toCamel(str:string) {
  const arrs = str.split('-')
  if (arrs.length === 1) return arrs[0]
  return arrs.reduce((accumulator:string, currentValue:string) => {
    return accumulator + currentValue.toLowerCase().replace(/( |^)[a-z]/g, v => v.toUpperCase())
  })
}

/**
 * 处理aplayer || dplayer 参数
 * @param el aplayer || dplayer dom
 * @returns 配置项参数
 */
function formatAttr(el:Element): object {
  const config = {}
  const numberList = ['lrcType']
  const boolMap = new Map([
    ['true', true],
    ['false', false],
  ])
  const attrs = el.getAttributeNames().filter(key => key.startsWith('config-'))
  attrs.forEach(attr => {
    const key = toCamel(attr.replace('config-', ''))
    const value = el.getAttribute(attr)
    const toBool = boolMap.get(value)
    
    if (toBool !== undefined) {             /** 处理bool值 */
      config[key] = toBool
    } else if (numberList.includes(key)) {  /** 处理number值 */
      config[key] = parseInt(value)
    } else {                                /** string */
      config[key] = value
    }
  })
  return config
}

function querySelectorArrs (selector:string):Array<Element> {
  return Array.from(document.querySelectorAll(selector))
}

function switchTheme(theme: string) {
  const rootDom: HTMLElement = document.documentElement;

  if (theme === 'auto') {
    // 根據系統設置切換主題
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDarkMode ? 'dark' : 'light';
  }

  // 根據主題設置更新 CSS 變量
  rootDom.classList.remove('theme-light', 'theme-dark');
  rootDom.classList.add(`theme-${theme}`);

  // 保存主題設置到本地存儲
  window.localStorage.setItem('theme', theme);
}


function aplayerInit () {
  const aplayers = querySelectorArrs('.aplayer-box')
  if (aplayers.length && APlayer) {
    aplayers.forEach(el => {
      const params = { container: el, audio: { ...el.dataset } }
      const config = formatAttr(el)
      new APlayer(Object.assign({}, config, params))
    })
  }
}

function dplayerInit () {
  const dplayers = querySelectorArrs('.dplayer-box')
  if (dplayers.length && DPlayer) {
    dplayers.forEach(el => {
      const params = { container: el, video: { ...el.dataset } }
      const config = formatAttr(el)
      new DPlayer(Object.assign({}, config, params))
    })
  }
}