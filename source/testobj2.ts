import * as msvcrt from './system/msvcrt.ts'

//export declare function printf(...args:any[]):void//msvcrt

let objA = {
    fieldA: 12,
    fieldB: 13,
}

function main(){
    msvcrt.printf("ok")

    //msvcrt.printf(" %i ", objA.fieldA)

    let {fieldA,fieldB} = objA

    msvcrt.printf(" %i ", fieldA)
}