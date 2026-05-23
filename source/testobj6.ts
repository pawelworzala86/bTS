import * as msvcrt from './system/msvcrt.ts'
import * as obj4 from './obj4.ts'

let numA:number = 123

let objA:obj4.OBJ = new obj4.OBJ(numA)

function main(){
    msvcrt.printf("ok")

    objA.testFunc()

    msvcrt.printf(" end")
}