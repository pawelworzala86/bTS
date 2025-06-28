import * as msvcrt from './system/msvcrt.ts'

let dataA:number = 123

let objA = {
    fieldA: 12,
    fieldB: dataA,
}

function main(){
    msvcrt.printf("ok")

    objA.constructor()

    msvcrt.printf(" %i ", objA.fieldA)

    let {fieldA,fieldB} = objA

    msvcrt.printf(" %i ", fieldA)
}