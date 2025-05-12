import * as msvcrt from './system/msvcrt.ts'
import * as mat4 from './opengl/mat4.ts'




let arrayA:number = 0

let createMatCaption:string = 'create'

function main(){
    msvcrt.printf("ok ")



    arrayA = mat4.create()

    mat4.print(createMatCaption,arrayA)




    msvcrt.printf("end ")
}