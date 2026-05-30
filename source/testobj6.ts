import * as msvcrt from './system/msvcrt.ts'
import * as aobj from './obj4.ts'

let numA:number = 123

let objA:aobj.OBJ = new aobj.OBJ(numA)

function main(){
    msvcrt.printf("ok")

    objA.testFunc()

    msvcrt.printf(" end")
}