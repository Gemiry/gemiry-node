const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

class Jwt {
  constructor(data) {
    this.data = data.data
    this.from = data.from
  }
  //生成token
  generateToken() {
    let data = this.data
    let from = this.from
    let created = Math.floor(Date.now() / 1000)
    let cert
    if (from === 'pc') {
      cert = fs.readFileSync(path.join(__dirname, '/pc/rsa_private_key.pem')) //读取pc私钥
    } else {
      cert = fs.readFileSync(
        path.join(__dirname, '/mobile/rsa_private_key.pem')
      ) //读取mobile私钥
    }

    let token = jwt.sign(
      {
        data,
        exp: created + 60 * 30
      },
      cert,
      { algorithm: 'RS256' }
    )
    return token
  }
  //校验token
  verifyToken() {
    let token = this.data
    let from = this.from
    let cert
    if (from === 'pc') {
      cert = fs.readFileSync(path.join(__dirname, '/pc/rsa_public_key.pem')) //读取pc公钥
    } else {
      cert = fs.readFileSync(path.join(__dirname, '/mobile/rsa_public_key.pem')) //读取mobile公钥
    }
    let res
    //测试token 不做校验
    if (
      token ===
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMiIsImV4cCI6MTU2MTc4MDQ1NSwiaWF0IjoxNTYxNzc4NjU1fQ.rX9O-94DHQ3qeDvc5gBGOTWE7HjuThEoy43LV1plyzPddQkOj4aIeRDyfZlW0f7QTsmGCsdl0-x_vhRAQz3k42cRmubpepX6BPIan5YysgWPp8IH89BeHZAfBvCDX2GacivRHBXvn6xYsTMhQQ7UpWPv2caVj1vYzrVrUWHesFf7Uj60TH7bpAQpj1rnPfmJbokEngbvHyj8widKE2yB15bjfjnZwjUbt0YdHWaWCWwskzEJcGW1229a6CGKEu6zvItFKwvLZZ4B4RT2C1SNydGJLfEhhTReNDGnZ5lZf4rtqBdi2dyu6NEmlulbCKZrMtn4qZ0HTGrIWjysXqPDhQ'
    ) {
      return 1
    }
    try {
      let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {}
      let { exp = 0 } = result,
        current = Math.floor(Date.now() / 1000)
      if (current <= exp) {
        res = result.data || {}
      }
    } catch (e) {
      res = 'err'
    }
    return res
  }
}
module.exports = Jwt
