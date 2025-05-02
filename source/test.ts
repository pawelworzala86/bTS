export declare function printf(...args:any[]):void//msvcrt

struct OBJ
    fieldA dq 12
    fieldB dq 13
ends

let objA = new OBJ()

function funcA(propA:number){
    printf("%i", propA)
    printf("end ")

    lea rax, [objA]
    mov rbx, [rax + OBJ.fieldA]
    printf("%i", rbx)
}

function main(){
    printf("ok")
    funcA(11)
}