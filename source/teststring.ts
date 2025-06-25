import * as msvcrt from './system/msvcrt.ts'

let txtA:string = 'hello'
let txtB:string = ' world'

let search:string = 'lo'
let index:number = 0

function main(){
    msvcrt.printf("ok ")

    msvcrt.printf(" %s ", txtA)

    msvcrt.printf(" %i ", txtA.length)

    let txt:string = ''
    txt = txtA + txtB
    msvcrt.printf(" %s ", txt)

    msvcrt.printf(" %s ", txtA)
    StrPos(txtA,search,0)
    msvcrt.printf(" %i ", rax)

    msvcrt.printf(" end")
}