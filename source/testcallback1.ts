import * as msvcrt from './system/msvcrt.ts'

function calle(func:Function){
    func()
}

function main(){
    msvcrt.printf("ok")

    calle(function t(){
        msvcrt.printf("ok")
    })

    msvcrt.printf("end")
}