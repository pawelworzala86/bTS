import * as msvcrt from './system/msvcrt.ts'

class String{
    length(){
        let len:number = 0
        len = StrLen(this)
        return len
    }
}

let txtA:string = 'test'

function main(){
    msvcrt.printf("ok ")

    msvcrt.printf(" %s ", txtA)

    let len:number = 0
    len = StrLen(txtA)
    msvcrt.printf(" %i ", len)

    msvcrt.printf(" end")
}