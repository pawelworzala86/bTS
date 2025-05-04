import * as imp1 from './imp1.ts'
import * as msvcrt from './msvcrt.ts'

//export declare function printf(...args:any[]):void//msvcrt

/*class OBJ{
    fieldA:number = 12
    fieldB:number = 13
}*/

//let objA:imp1.OBJ = new imp1.OBJ()

//let valA:number = 123

let valA:number = 10.0
let valB:number = 3.0
let valC:number = 0.0

function main(){
    msvcrt.printf("ok ")

    valC = valA * valB

    msvcrt.printf("%f ", valC)


    msvcrt.printf("end ")
}