import * as msvcrt from './system/msvcrt.ts'

let txtA:number = 0
let txtB:string = 'hello'

let tA:string = 'kuku'

function main(){
    msvcrt.printf("ok ")

    txtA = tA
    msvcrt.printf(" %s ", txtA)

    txtA = StrCopy(txtA)
    msvcrt.printf(" %s ", txtA)

    msvcrt.printf(" end")
}