import * as msvcrt from './system/msvcrt.ts'

let arrayRecordSize = 8

class ARRAY{
    array:number = 0
    total:number = 0
    push(value:number){
        let index:number = 0
        index = this.total
        this.total++
        let size:number = 0
        size = this.total * arrayRecordSize//int
        this.array = msvcrt.malloc(size)
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

    let value:number = 0
    value = arra.get(0)



    msvcrt.printf("end ")
}