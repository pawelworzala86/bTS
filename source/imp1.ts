import * as msvcrt from './system/msvcrt.ts'

export function testFunc(){
    msvcrt.printf(" ee ")
}

export let dataA:number = 1222

export class OBJ{
    fieldA:number = 12
    fieldB:number = 13
    constructor(){
        this.fieldA = 111
        this.fieldA = this.fieldB
    }
}