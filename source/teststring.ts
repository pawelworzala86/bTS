import * as msvcrt from './system/msvcrt.ts'

let txtA:string = 'hello'
let txtB:string = ' world'

let search:string = 'lo'
let dest:string = 'LO'
let index:number = 0

function main(){
    msvcrt.printf("ok ")

    msvcrt.printf(" %s ", txtA)

    msvcrt.printf(" %i ", txtA.length)

    let txt:string = ''
    txt = txtA + txtB
    msvcrt.printf(" %s ", txt)

    index = txtA.indexOf(search)
    msvcrt.printf(" %i ", index)

    txt = txtA.substring(0,2)
    msvcrt.printf(" %s ", txt)

    txt = txtA.replace(search,dest)
    msvcrt.printf(" %s ", txt)

    msvcrt.printf(" end")
}