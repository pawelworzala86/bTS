export declare function printf(...args:any[]):void//msvcrt

class OBJ{
    fieldA:number = 12
    fieldB:number = 13
}

let objA = new OBJ()

function funcA(propA:number){
    printf("%i", propA)
    printf("end ")

    printf("%i", objA.fieldA)
}

function main(){
    printf("ok")
    funcA(11)
}