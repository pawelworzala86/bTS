import * as msvcrt from './system/msvcrt.ts'

function funcA(propA:number,propB:number){
    msvcrt.printf(" %i ", propA)
    msvcrt.printf(" %i ", propB)
}

function main(){
    msvcrt.printf(" start ")

    funcA(11, 12)

    msvcrt.printf(" end ")
}