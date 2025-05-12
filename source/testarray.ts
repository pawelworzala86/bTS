import * as imp1 from './imp1.ts'
import * as msvcrt from './system/msvcrt.ts'

//export declare function printf(...args:any[]):void//msvcrt

/*class OBJ{
    fieldA:number = 12
    fieldB:number = 13
}*/

//let objA:imp1.OBJ = new imp1.OBJ()

//let valA:number = 123

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