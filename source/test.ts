export declare function printf(...args:any[]):void//msvcrt

function funcA(propA:number){
    printf("%i", propA)
    printf("end")
}

function main(){
    printf("ok")
    funcA(11)
}