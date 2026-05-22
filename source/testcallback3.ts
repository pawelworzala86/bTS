import * as msvcrt from './system/msvcrt.ts'
import * as obj3 from './obj3.ts'

function calle(func:Function){
    func(122)
}

let objA:obj3.OBJ = new obj3.OBJ()

//todo: test callback'a - paremetry

function main(){
    msvcrt.printf("ok")

    calle(function t(){
        msvcrt.printf("ok")
    })

    objA.constructor()

    calle(objA.testA)

    msvcrt.printf("end")
}