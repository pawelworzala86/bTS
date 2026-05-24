import * as msvcrt from './system/msvcrt.ts'
import OBJ from './obj4.ts'

let numA:number = 123

let objA:OBJ = new OBJ(numA)

function main(){
    msvcrt.printf("ok")

    objA.testFunc()

    msvcrt.printf(" end")
}