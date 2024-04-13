(() => {
  (function() {
    let t = window.localStorage.getItem("theme") || "auto";
    l(t), document.addEventListener("DOMContentLoaded", () => {
      let e = document.querySelector(".header-nav--btn");
      e && e.addEventListener("click", () => {
        e.classList.toggle("open")
      });
      let n = document.querySelector("#theme-light"), o = document.querySelector("#theme-dark"), s = document.querySelector("#theme-auto");
      n && o && s && (n.addEventListener("click", () => l("light")), o.addEventListener("click", () => l("dark")), s.addEventListener("click", () => l("auto")));
      let i = document.querySelectorAll("[background-image-lazy]"), a = i.length;
      if (a > 0) {
        let r = new IntersectionObserver((c, w) => {
          c.forEach(d => {
            if (d.isIntersecting) {
              let u = d.target.dataset.img;
              u && (d.target.style.backgroundImage = `url(${u})`), r.unobserve(d.target), a--, a <= 0 && r.disconnect()
            }
          })
        });
        i.forEach(c => {
          r.observe(c)
        })
      }
      f(), g()
    })
  })();

  function h(t) {
    let e = t.split("-");
    return e.length === 1 ? e[0] : e.reduce((n, o) => n + o.toLowerCase()
      .replace(/( |^)[a-z]/g, s => s.toUpperCase()))
  }
  function m(t) {
    let e = {}, n = ["lrcType"], o = new Map([
      ["true", !0],
      ["false", !1]
    ]);
    return Array.from(t.attributes)
      .forEach(({
      name: i,
      value: a
    }) => {
      let r = h(i.replace("config-", "")), c = o.get(a);
      c !== void 0 ? e[r] = c : n.includes(r) ? e[r] = parseInt(a || "0", 10) : e[r] = a || ""
    }), e
  }
  function l(t) {
    let e = document.documentElement;
    t === "auto" && (t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")
      .matches ? "dark" : "light"), e.classList.remove("theme-light", "theme-dark"), e.classList.add(`theme-${t}`), window.localStorage.setItem("theme", t)
  }
  function f() {
    let t = document.querySelectorAll(".aplayer-box");
    t.length && window.APlayer && t.forEach(e => {
      let n = {
        container: e,
        audio: {...e.dataset || {}
        }
      }, o = m(e);
      new window.APlayer(Object.assign({}, o, n))
    })
  }
  function g() {
    let t = document.querySelectorAll(".dplayer-box");
    t.length && window.DPlayer && t.forEach(e => {
      let n = {
        container: e,
        video: {...e.dataset || {}
        }
      }, o = m(e);
      new window.DPlayer(Object.assign({}, o, n))
    })
  }
})();