import * as msvcrt from './msvcrt.ts'

export class OBJ{
    fieldA:number = 12
    fieldB:number = 13
    constructor(){
        this.fieldA = 111
        this.fieldA = this.fieldB
    }
    testFunc(){
        msvcrt.printf(" %i ", this.fieldA)
    }
}