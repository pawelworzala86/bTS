const fs = require('fs')

let code = fs.readFileSync('./source/test.js').toString()

fs.writeFileSync('./cache/test.asm',code)