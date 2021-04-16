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
