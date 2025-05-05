import * as fs from './file.ts'
import * as msvcrt from './msvcrt.ts'


let fileName:string = 'test.txt'

function main(){
    msvcrt.printf("ok")

    //lea rax, [fileName]
    fs.readFile(fileName)

    msvcrt.printf(" end")
}