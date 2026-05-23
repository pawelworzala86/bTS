import * as msvcrt from './system/msvcrt.ts'

let txtA:string = 'hello world'

class OBJ{
    fieldA:string = txtA
    testFunc(){
        msvcrt.printf(" %s ", this.fieldA)
    }
}

let obj:OBJ = new OBJ()

function main(){
    msvcrt.printf("ok ")

    obj.testFunc()

    msvcrt.printf(" end")
}