import * as msvcrt from './system/msvcrt.ts'

let valA:number = 0
let idx:number = 0

function main(){
    msvcrt.printf("ok ")

    valA = msvcrt.malloc(16)

    idx = 0
    valA[idx] = 11
    valA[1] = 12
    idx = 0
    msvcrt.printf("%i ", valA[idx])
    idx = 0
    msvcrt.printf("%i ", valA[1])
    idx = 0
    msvcrt.printf("%i ", valA[idx])


    msvcrt.printf("end ")
}