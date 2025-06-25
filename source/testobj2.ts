import * as msvcrt from './system/msvcrt.ts'

let objA = {
    fieldA: 12,
    fieldB: 13,
}

function main(){
    msvcrt.printf("ok")

    msvcrt.printf(" %i ", objA.fieldA)

    let {fieldA,fieldB} = objA

    msvcrt.printf(" %i ", fieldA)
}