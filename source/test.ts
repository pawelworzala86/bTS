export declare function printf(...args:any[]):void//msvcrt

class OBJ{
    fieldA:number = 12
    fieldB:number = 13
}

let objA = new OBJ()

let valA:number = 123

function funcA(propA:number){
    printf("%i", propA)
    printf("end ")

    printf("%i ", objA.fieldA)

    printf("%i ", valA)
}

function main(){
    printf("ok")
    funcA(11)
}