import * as msvcrt from './system/msvcrt.ts'

export class OBJ{
    fieldA:number = 12
    fieldB:number = 13
    init(){
        this.fieldA = 111
        this.fieldA = this.fieldB
    }
    testFunc(){
        msvcrt.printf(" %i ", this.fieldA)
    }
}

function main(){
    msvcrt.printf("ok")

    let objA:OBJ = new OBJ()

    objA.init()
    msvcrt.printf(" %i ", objA.fieldA)

    objA.testFunc()

    msvcrt.printf(" end")
}