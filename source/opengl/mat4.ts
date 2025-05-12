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
  //msvcrt.printf(" perspective ")
  let fff:number = 0.0
  let tan:number = 0.0
  let tmp:number = 0.0
  tmp = fovy / twoDouble
  Macro_Math_tan qword tmp, qword tan
  fff = oneDouble / tan;
  //msvcrt.printf(" p3 ")
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
/*
export function translate(out:number,a:number,v:number){
  let x:number = 0
  x = v[0]
  let y:number = 0
  y = v[1]
  let z:number = 0
  z = v[2]
  let a00:number = 0
  let a01:number = 0
  let a02:number = 0
  let a03:number = 0
  let a10:number = 0
  let a11:number = 0
  let a12:number = 0
  let a13:number = 0
  let a20:number = 0
  let a21:number = 0
  let a22:number = 0
  let a23:number = 0

  if(a==out){
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  }else{
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}*/