import * as msvcrt from './../system/msvcrt.ts'

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

export function print(caption:string,mat:number){
    msvcrt.printf(" %s%s%s ", lf, caption, lf)

    msvcrt.printf("%f ", mat[0])
    msvcrt.printf(", %f ", mat[1])
    msvcrt.printf(", %f ", mat[2])
    msvcrt.printf(", %f ", mat[3])
    msvcrt.printf(" %s ", lf)

    msvcrt.printf("%f ", mat[4])
    msvcrt.printf(", %f ", mat[5])
    msvcrt.printf(", %f ", mat[6])
    msvcrt.printf(", %f ", mat[7])
    msvcrt.printf(" %s ", lf)

    msvcrt.printf("%f ", mat[8])
    msvcrt.printf(", %f ", mat[9])
    msvcrt.printf(", %f ", mat[10])
    msvcrt.printf(", %f ", mat[11])
    msvcrt.printf(" %s ", lf)

    msvcrt.printf("%f ", mat[12])
    msvcrt.printf(", %f ", mat[13])
    msvcrt.printf(", %f ", mat[14])
    msvcrt.printf(", %f ", mat[15])
    msvcrt.printf(" %s ", lf)
}

let oneDouble:number = 1.0
let twoDouble:number = 2.0




export function perspective(out:number,fovy:number,aspect:number,near:number,far:number){
  msvcrt.printf(" perspective ")
  let fff:number = 0.0
  let tan:number = 0.0
  let tmp:number = 0.0
  tmp = fovy / twoDouble
  Macro_Math_tan qword tmp, qword tan
  fff = oneDouble / tan;
  msvcrt.printf(" p3 ")
  out[0] = fff / aspect;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = fff;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = 0.0;
  out[9] = 0.0;
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[15] = 0.0;
  //if (far != null && far !== Infinity) {
    let nf:number = 0.0
    let tmp:number = 0.0
    tmp = near - far
    nf = oneDouble / tmp
    tmp = far + near
    out[10] = tmp * nf;
    out[14] = twoDouble * far * near * nf;

    out[14] = -2.0202020202020203
  //} else {
  //  out[10] = -1;
  //  out[14] = -2 * near;
  //}
  return out;
}