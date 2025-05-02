const fs = require('fs')

let code = fs.readFileSync('./source/test.js').toString()


let frame = fs.readFileSync('./frame/cmd.inc').toString()
frame = frame.replace('{{CODE}}',code)
frame = frame.replace('{{DATA}}','')

fs.writeFileSync('./cache/test.asm',frame)