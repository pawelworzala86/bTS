import * as msvcrt from './system/msvcrt.ts'

let txtA:string = 'test wrd'
let txtB:string = 'ABC'

let search:string = 'st'
let index:number = 0

function main(){
    msvcrt.printf("ok ")

    msvcrt.printf(" %s ", txtA)

    //let len:number = 0
    //len = StrLen(txtA)
    msvcrt.printf(" %i ", txtA.length)

    let txt:string = ''
    txt = txtA + txtB
    msvcrt.printf(" %s ", txt)

    index = StrPos(txtA,search,0)
    msvcrt.printf(" %i ", rax)

    msvcrt.printf(" end")
}