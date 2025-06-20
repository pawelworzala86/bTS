import * as msvcrt from './system/msvcrt.ts'

function funcA(propA:string){
    msvcrt.printf(" %s ", propA)

    mov rbx, propA
    movzx rax, byte [rbx + 0]
    if(rax!=0){
        msvcrt.printf(" %c ", rax)
    }
}

let strA:string = '11'

function main(){
    msvcrt.printf(" start ")

    funcA(strA)

    msvcrt.printf(" end ")
}