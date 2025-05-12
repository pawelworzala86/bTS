

F3_create:
     push rbp
    mov rbp, rsp
    sub rsp, 8*0

    
    

invoke malloc,16*8

mov     qword [rbp - 8], rax

  

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 1*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 2*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 3*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 4*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 6*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 7*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 8*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 9*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 11*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 12*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 13*8], rax;

mov rsi,qword [rbp - 8]

mov rax,0.0
mov qword[rsi + 14*8], rax;



mov rsi,qword [rbp - 8]

mov rax,1.0
mov qword[rsi + 0*8], rax;

mov rsi,qword [rbp - 8]

mov rax,1.0
mov qword[rsi + 5*8], rax;

mov rsi,qword [rbp - 8]

mov rax,1.0
mov qword[rsi + 10*8], rax;

mov rsi,qword [rbp - 8]

mov rax,1.0
mov qword[rsi + 15*8], rax;

  mov rax, qword [rbp - 8];
    
    mov rsp, rbp
    pop rbp
ret

F3_print:
     push rbp
    mov rbp, rsp
    sub rsp, 8*2

    
    invoke printf," %s%s%s ", lf, [rbp + 16], lf



mov rsi,[rbp + 24]

    invoke printf,"%f ",  qword[rsi + 0*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 1*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 2*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 3*8]

    invoke printf," %s ", lf



mov rsi,[rbp + 24]

    invoke printf,"%f ",  qword[rsi + 4*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 5*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 6*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 7*8]

    invoke printf," %s ", lf



mov rsi,[rbp + 24]

    invoke printf,"%f ",  qword[rsi + 8*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 9*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 10*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 11*8]

    invoke printf," %s ", lf



mov rsi,[rbp + 24]

    invoke printf,"%f ",  qword[rsi + 12*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 13*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 14*8]

mov rsi,[rbp + 24]

    invoke printf,", %f ",  qword[rsi + 15*8]

    invoke printf," %s ", lf
    
    mov rsp, rbp
    pop rbp
ret







F3_perspective:
     push rbp
    mov rbp, rsp
    sub rsp, 8*5

    
  invoke printf," F3_perspective "

  

  

  

Macro_Math_podziel qword [rbp + 24],qword [F3_twoDouble],qword [mth1]

mov r15, [mth1]
mov   qword [rbp - 24], r15

  Macro_Math_tan qword [rbp - 24], qword [rbp - 16]

Macro_Math_podziel qword [F3_oneDouble],qword [rbp - 16],qword [mth1]

mov r15, [mth1];
mov   qword [rbp - 8], r15

  invoke printf," p3 "

Macro_Math_podziel qword [rbp - 8],qword [rbp + 32],qword [mth1]

mov rsi,[rbp + 16]

mov r15, [mth1];
mov    qword[rsi + 0*8], r15

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 1*8], rax;

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 2*8], rax;

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 3*8], rax;

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 4*8], rax;

mov rsi,[rbp + 16]

mov r15, qword [rbp - 8];
mov    qword[rsi + 5*8], r15

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 6*8], rax;

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 7*8], rax;

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 8*8], rax;

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 9*8], rax;

mov rsi,[rbp + 16]

mov rax,-1.0
mov qword[rsi + 11*8], rax;

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 12*8], rax;

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 13*8], rax;

mov rsi,[rbp + 16]

mov rax,0.0
mov qword[rsi + 15*8], rax;

  

    

    

Macro_Math_odejmnij qword [rbp + 40],qword [rbp + 48],qword [mth1]

mov r15, [mth1]
mov     qword [rbp - 24], r15

Macro_Math_podziel qword [F3_oneDouble],qword [rbp - 24],qword [mth1]

mov r15, [mth1]
mov     qword [rbp - 32], r15

Macro_Math_dodaj qword [rbp + 48],qword [rbp + 40],qword [mth1]

mov r15, [mth1]
mov     qword [rbp - 24], r15

Macro_Math_pomnoz qword [rbp - 24],qword [rbp - 32],qword [mth1]

mov rsi,[rbp + 16]

mov r15, [mth1];
mov      qword[rsi + 10*8], r15

Macro_Math_pomnoz qword [rbp + 40],qword [rbp - 32],qword [mth1]

Macro_Math_pomnoz qword [rbp + 48],qword [mth1],qword [mth3]

Macro_Math_pomnoz qword [F3_twoDouble],qword [mth3],qword [mth5]

mov rsi,[rbp + 16]

mov r15, [mth5];
mov      qword[rsi + 14*8], r15



mov rsi,[rbp + 16]

mov rax,-2.0202020202020203
mov qword[rsi + 14*8], rax

  

  

  

  

  mov rax, [rbp + 16];
    
    mov rsp, rbp
    pop rbp
ret