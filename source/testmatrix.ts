import * as msvcrt from './system/msvcrt.ts'





let arrayA:number = 0

export function create(){
    let out:number = 0
    out = msvcrt.malloc(16*8)
  
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = 0.0;
    out[9] = 0.0;
    out[11] = 0.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = 0.0;

  out[0] = 1.0;
  out[5] = 1.0;
  out[10] = 1.0;
  out[15] = 1.0;
  return out;
}

export function print(mat:number){
    msvcrt.printf(" %f ", mat[0])
}

function main(){
    msvcrt.printf("ok ")

    arrayA = create()

    print(arrayA)

    msvcrt.printf("end ")
}