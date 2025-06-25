import * as obj1 from './obj1.ts'
import * as msvcrt from './system/msvcrt.ts'

let objA:obj1.OBJ = new obj1.OBJ()

function main(){
    msvcrt.printf("ok")

    objA.constructor()
    msvcrt.printf(" %i ", objA.fieldA)

    objA.testFunc()

    msvcrt.printf(" end")
}