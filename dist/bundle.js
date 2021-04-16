(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const data = require("./data.js")

const CookieClicker = {
  init() {
    this.cookies = 0
    this.cookieType = 0
    this.bonus = 0
  },
  setupDom() {
    this.btn = document.getElementById("clicker")
    this.label = document.getElementById("cookies")
    this.img = document.getElementById("cookie")
    this.buynextBtn = document.getElementById("buynext")
    this.cookieName = document.getElementById("cookieName")

    this.btn.onclick = (e) => this.click()
    this.buynextBtn.onclick = (e) => this.buyNext()
    this.img.src = "/dist/img/"+data.cookieTypes[this.cookieType].img + ".png"
  },
  save() {
    let save = JSON.stringify({
      cookies: this.cookies,
      cookieType: this.cookieType,
    })
    // Store game data in the local storage item "staleCookie"
    localStorage.setItem("staleCookie", save)
  },
  update() {
    this.label.innerText = this.cookies
    this.img.src = "/dist/img/"+data.cookieTypes[this.cookieType].img + ".png"
    this.cookieName.innerText = data.cookieTypes[this.cookieType].name
    this.buynextBtn.innerText = data.cookieTypes[this.cookieType+1].cost
    this.bonus = data.cookieTypes[this.cookieType].bonus
  },
  load() {
    let save = JSON.parse(localStorage.getItem("staleCookie"))

    if (save) {
      this.cookies = save.cookies
      this.cookieType = save.cookieType
    } else {
      // If there is not a save, start a new game
      this.init()
    }
    this.setupDom()
    this.update()
  },
  click() {
    this.cookies += 1 + this.bonus
    this.update()
  },
  buyNext() {
    let price = data.cookieTypes[this.cookieType+1].cost
    if (this.cookies >= price) {
      this.cookies -= price
      this.cookieType += 1
    }
    this.update()
  },
  startSaver(ms=5000) {
    this.saver = setInterval(()=>this.save(), ms)
  },
  stopSaver() {
    clearInterval(this.saver)
  }
}


module.exports = CookieClicker

},{"./data.js":2}],2:[function(require,module,exports){
module.exports = {
  cookieTypes: {
    0: {
      name: "Boring",
      img: "boring",
      bonus: 0,
      cost: 50
    },
    1: {
      name: "Chocolate Chip",
      img: "chocChip",
      bonus: 1,
      cost: 50
    },
    2: {
      name: "Snickerdoodle",
      img: "snickerdoodle",
      bonus: 2,
      cost: 50
    },
    3: {
      name: "Triple Chocolate",
      img: "tripleChoc",
      bonus: 3,
      cost: 50
    },
  }
}

},{}],3:[function(require,module,exports){
const CookieClicker = require("./cookie.js")
CookieClicker.load()

CookieClicker.startSaver(1000)

},{"./cookie.js":1}]},{},[3]);
