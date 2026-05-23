import * as msvcrt from './system/msvcrt.ts'

let txtA:number = 0
let txtB:string = 'hello'

function main(){
    msvcrt.printf("ok ")

    txtA = StrCopy(txtB)

    msvcrt.printf(" %s ", txtA)

    msvcrt.printf(" end")
}