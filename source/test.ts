import * as imp1 from './imp1.ts'
import * as msvcrt from './system/msvcrt.ts'

let objA:imp1.OBJ = new imp1.OBJ()

let valA:number = 123

function funcA(propA:number){
    msvcrt.printf("%i", propA)
    msvcrt.printf("end ")

    msvcrt.printf("%i ", objA.fieldA)

    msvcrt.printf("%i ", valA)
}

function main(){
    msvcrt.printf("ok")
    funcA(11)

    imp1.testFunc()

    msvcrt.printf("%i ", imp1.dataA)

    objA.constructor()
    msvcrt.printf("%i ", objA.fieldA)

    valA = 456
    msvcrt.printf("%i ", valA)
}