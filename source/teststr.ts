import * as msvcrt from './system/msvcrt.ts'

function funcA(propA:string){
    msvcrt.printf(" %s ", propA)

    mov rbx, propA
    mov r9, 0
    movzx rax, byte [rbx]
    while(rax!=0){
        //msvcrt.printf(" %c ", rax)
        inc rbx
        inc r9
        movzx rax, byte [rbx]
    }
    msvcrt.printf(" %i ", r9)
}

let strA:string = '11'

function main(){
    msvcrt.printf(" start ")

    funcA(strA)

    msvcrt.printf(" end ")
}