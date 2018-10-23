require('../build/env-config')
const paths = [
  "index",
  "/product",
  "/order",
  "/user",
  "/common",
  "/trade",
  "/market",
  "/pos",
  "/bill"
]

const useStrategy = {
  target:process.env.BASE_URL,
  changeOrigin: true
}

const proxyTableObj = {}

paths.forEach(path => {
  proxyTableObj[path] = Object.assign({}, useStrategy)
})

module.exports = proxyTableObj;