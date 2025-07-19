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
        this.array = msvcrt.realloc(this.array, size)
        let array:number = 0
        array = this.array
        array[index] = value
    }
    get(index:number){
        //let array:number = 0
        //array = this.array
        return this.array[0]
    }
}

let array:ARRAY = new ARRAY()

function main(){
    msvcrt.printf("ok ")

    array.push(111)

    let value:number = 0
    value = array.get(0)



    msvcrt.printf("end ")
}