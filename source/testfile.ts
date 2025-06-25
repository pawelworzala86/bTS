import * as fs from './system/file.ts'
import * as msvcrt from './system/msvcrt.ts'

let fileName:string = 'test.txt'
let buffor:number = 0

function main(){
    msvcrt.printf("ok")

    buffor = fs.readFile(fileName)

    msvcrt.printf(" %s ", buffor)

    msvcrt.printf(" end")
}