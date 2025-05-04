import * as fs from './file.ts'
import * as msvcrt from './msvcrt.ts'


let fileName:string = 'test.txt'

function main(){
    msvcrt.printf("ok")

    fs.readFile(fileName)

    msvcrt.printf(" end")
}