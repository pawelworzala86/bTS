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
  //tmp = fovy / twoDouble
  Macro_Math_podziel qword fovy, qword twoDouble, qword tmp
  Macro_Math_tan qword tmp, qword tan
  //fff = oneDouble / tan;
  Macro_Math_podziel qword oneDouble, qword tan, qword fff
  //msvcrt.printf(" p3 ")
  //out[0] = fff / aspect;
  Macro_Math_podziel qword fff, qword aspect, qword out[0]
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
    //nf = oneDouble / tmp
    Macro_Math_podziel qword oneDouble, qword tmp, qword nf
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

export function translate(out:number,a:number,v:number){
  //msvcrt.printf("translate ")
  let x:number = 0
  //msvcrt.printf(" v1 %f", v[1])
  x = v[0]
  let y:number = 0
  y = v[1]
  let z:number = 0
  z = v[2]
  //msvcrt.printf("t ")
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
//msvcrt.printf("a ")
  let aa0:number = 0
  aa0 = a[0]
  let aa1:number = 0
  aa1 = a[1]
  let aa2:number = 0
  aa2 = a[2]
  let aa3:number = 0
  aa3 = a[3]
  let aa4:number = 0
  aa4 = a[4]
  let aa5:number = 0
  aa5 = a[5]
  let aa6:number = 0
  aa6 = a[6]
  let aa7:number = 0
  aa7 = a[7]
  let aa8:number = 0
  aa8 = a[8]
  let aa9:number = 0
  aa9 = a[9]
  let aa10:number = 0
  aa10 = a[10]
  let aa11:number = 0
  aa11 = a[11]
  let aa12:number = 0
  aa12 = a[12]
  let aa13:number = 0
  aa13 = a[13]
  let aa14:number = 0
  aa14 = a[14]
  let aa15:number = 0
  aa15 = a[15]
//msvcrt.printf("aa %f ",aa15)
  /*if(a==out){
    out[12] = aa0 * x + aa4 * y + aa8 * z + aa12
    out[13] = aa1 * x + aa5 * y + aa9 * z + aa13
    out[14] = aa2 * x + aa6 * y + aa10 * z + aa14
    out[15] = aa3 * x + aa7 * y + aa11 * z + aa15
  }else{*/
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

    out[12] = a00 * x + a10 * y + a20 * z + aa12
    out[13] = a01 * x + a11 * y + a21 * z + aa13
    out[14] = a02 * x + a12 * y + a22 * z + aa14
    out[15] = a03 * x + a13 * y + a23 * z + aa15
  //}

  return out;
}