import fs from './system/file2.ts'
import * as msvcrt from './system/msvcrt.ts'

let fileName:string = 'test.txt'
let buffor:number = 0
let bytes:number = 8
let one:number = 1
let idx:number = 0
let index:number = 0
let buffLocal:number = 0
let tmp:number = 0

function slice(buffer:number, start:number, end:number){
    let size:number = 0
    size = end - start
    size = size + one
    //size = size * bytes
    buffLocal = msvcrt.malloc(size)
    for(index = 0;index<1;index++){
        tmp = buffer[index]
        buffLocal[idx] = tmp
        idx++
    }
    //tmp = buffer[0]
    //buffLocal[0] = tmp
    //buffLocal[1] = buffor[1]
    //buffLocal = buffer
    return buffLocal
}

let slicedBuffor:number = 0

function main(){
    msvcrt.printf("ok")

    //buffor = fs.readFile(fileName)
    buffor = msvcrt.malloc(16)
    buffor[0] = 11
    buffor[1] = 12

    slicedBuffor = slice(buffor, 0, 2)

    msvcrt.printf(" %i ", slicedBuffor[0])

    msvcrt.printf(" end")
}