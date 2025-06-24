import * as msvcrt from './system/msvcrt.ts'

let txtA:string = 'test'
let txtB:string = 'ABC'

function main(){
    msvcrt.printf("ok ")

    msvcrt.printf(" %s ", txtA)

    //let len:number = 0
    //len = StrLen(txtA)
    msvcrt.printf(" %i ", txtA.length)

    let txt:string = ''
    txt = StrCon(txtA,txtB)
    msvcrt.printf(" %s ", txt)

    msvcrt.printf(" end")
}