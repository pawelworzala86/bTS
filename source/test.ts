export declare function printf(...args:any[]):void//msvcrt

function funcA(propA:number){
    invoke printf, "%i", propA
    invoke printf, "end"
}

function main(){
    invoke printf, "ok"

    funcA(11)
}