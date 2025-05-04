import * as msvcrt from './msvcrt.ts'


export class INNOBJ{
    fieldA:number = 12
    fieldB:number = 13
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
        msvcrt.printf(" %i ", this.fieldA)
    }
}