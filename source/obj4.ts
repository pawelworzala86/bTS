import * as msvcrt from './system/msvcrt.ts'

export class OBJ{
    fieldA:number = 12
    fieldB:number = 13
    constructor(paramA:number){
        this.fieldA = paramA
        msvcrt.printf(" %i ", paramA)
    }
    testFunc(){
        msvcrt.printf(" %i ", this.fieldA)
    }
}

export default OBJ