function funcA(propA:number){
    invoke printf, "%i", propA
    invoke printf, "end"
}

function main(){
    invoke printf, "ok"

    funcA(11)
}