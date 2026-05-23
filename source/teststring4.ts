import * as msvcrt from './system/msvcrt.ts'

let txtA:string = 'test'
let txtB:string = 'hello'

let tA:string = 'kuku'

function main(){
    msvcrt.printf("ok ")

    //txtA = tA
    msvcrt.printf(" %s ", txtA)

    txtA = StrCopy(txtB)
    msvcrt.printf(" %s ", txtA)

    msvcrt.printf(" end")
}