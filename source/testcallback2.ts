import * as msvcrt from './system/msvcrt.ts'
import * as obj2 from './obj2.ts'

function calle(func:Function){
    func()
}

let objA:obj2.OBJ = new obj2.OBJ()

function main(){
    msvcrt.printf("ok")

    calle(function t(){
        msvcrt.printf("ok")
    })

    calle(objA.testA)

    msvcrt.printf("end")
}