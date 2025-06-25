import * as msvcrt from './system/msvcrt.ts'

let valA:number = 0

function main(){
    msvcrt.printf("ok ")

    valA = msvcrt.malloc(16)


    valA[0] = 11
    valA[1] = 12
    msvcrt.printf("%i ", valA[0])
    msvcrt.printf("%i ", valA[1])

    msvcrt.printf("%i ", valA[0])


    msvcrt.printf("end ")
}