import * as msvcrt from './system/msvcrt.ts'

let arrayRecordSize = 8
let ls:number = 0
let rs:number = 0

class ARRAY{
    array:number = 0
    size:number = 0
    total:number = 0
    constructor(){
        this.array = msvcrt.malloc(8)
    }
    push(value:number){
        let index:number = 0
        index = this.total
        this.total++
        ls = this.total
        rs = this.size
        if(ls==rs){
            let size:number = 0
            size = this.total * arrayRecordSize//int
            this.array = msvcrt.realloc(this.array,size)
        }
        this.array[index] = value
    }
    get(index:number){
        return this.array[index]
    }
}

let arra:ARRAY = new ARRAY()

function main(){
    msvcrt.printf("ok ")

    arra.push(111)
    arra.push(222)

    let value:number = 0
    value = arra.get(1)
    msvcrt.printf(" %i ",value)


    msvcrt.printf("end ")
}