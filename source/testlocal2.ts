import * as imp1 from './imp1.ts'
import * as msvcrt from './system/msvcrt.ts'

function main(){
    msvcrt.printf("ok")

    let locA:number = 11
    //locA = 11
    msvcrt.printf("loc A: %i", locA)

    let objA:imp1.OBJ = new imp1.OBJ()

    msvcrt.printf(" end")
}