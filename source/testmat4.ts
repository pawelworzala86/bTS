import * as msvcrt from './system/msvcrt.ts'
import * as mat4 from './opengl/mat4.ts'




let arrayA:number = 0
let arrayPer:number = 0

let createMatCaption:string = 'create'
let perMatCaption:string = 'perspective'

let fovy:number = 45.0
let aspect:number = 1.0
let near:number = 0.01
let far:number = 1000.0

function main(){
    msvcrt.printf("ok ")



    arrayA = mat4.create()
    mat4.print(createMatCaption,arrayA)

    arrayPer = mat4.create()
    mat4.perspective(arrayPer,fovy,aspect,near,far)
    mat4.print(perMatCaption,arrayPer)


    msvcrt.printf("end ")
}