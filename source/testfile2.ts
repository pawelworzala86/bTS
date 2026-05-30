import fs from './system/file2.ts'
import * as msvcrt from './system/msvcrt.ts'

let fileName:string = 'test.txt'
let buffor:number = 0

function main(){
    msvcrt.printf("ok")

    buffor = fs.readFile(fileName)

    msvcrt.printf(" %c ", buffor[0])

    msvcrt.printf(" end")
}