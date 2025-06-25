import * as msvcrt from './system/msvcrt.ts'

function main(){
    msvcrt.printf("ok ")

    let valA:number = 0

    valA = msvcrt.malloc(16)

    let idx:number = 0
    valA[idx] = 11
    valA[1] = 12

    msvcrt.printf("%i ", valA[idx])
    msvcrt.printf("%i ", valA[1])
    msvcrt.printf("%i ", valA[idx])


    msvcrt.printf("end ")
}