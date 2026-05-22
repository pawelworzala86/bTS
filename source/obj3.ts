import * as msvcrt from './system/msvcrt.ts'

export class OBJ{
    fieldA:number = 12
    fieldB:number = 13
    testA(paramA:number){
        msvcrt.printf(" testObj %i ", paramA)
    }
}