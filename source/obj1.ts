import * as msvcrt from './system/msvcrt.ts'

export class INNOBJ{
    fieldA:number = 12
    fieldB:number = 13
    testA(){
        msvcrt.printf(" inner ")
    }
}

export class OBJ{
    fieldA:number = 12
    fieldB:number = 13
    ino:INNOBJ = new INNOBJ()
    constructor(){
        this.fieldA = 111
        this.fieldA = this.fieldB
    }
    testFunc(){
        msvcrt.printf(" %i ", this.ino.fieldA)
        this.ino.testA()
    }
}