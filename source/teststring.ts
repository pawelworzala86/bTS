import * as msvcrt from './system/msvcrt.ts'

let txtA:string = 'test'

function main(){
    msvcrt.printf("ok ")

    msvcrt.printf(" %s ", txtA)

    let len:number = 0
    len = StrLen(txtA)
    msvcrt.printf(" %i ", len)

    msvcrt.printf(" end")
}