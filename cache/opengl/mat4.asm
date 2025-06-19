

F3_create:
     push rbp
    mov rbp, rsp
    sub rsp, 8*1

    
    

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
    sub rsp, 8*10

    
  

  

  

  

  

  Macro_Math_podziel qword [rbp + 24], qword [F3_twoDouble], qword [rbp - 24]

  Macro_Math_tan qword [rbp - 24], qword [rbp - 16]

  

  Macro_Math_podziel qword [F3_oneDouble], qword [rbp - 16], qword [rbp - 8]

  

  

mov rsi,[rbp + 16]

  Macro_Math_podziel qword [rbp - 8], qword [rbp + 32], qword[rsi + 0*8]

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

    

    Macro_Math_podziel qword [F3_oneDouble], qword [rbp - 24], qword [rbp - 32]

Macro_Math_dodaj qword [rbp + 48],qword [rbp + 40],qword [mth1]

mov r15, [mth1]
mov     qword [rbp - 24], r15

Macro_Math_pomnoz qword [rbp - 24],qword [rbp - 32],qword [mth1]

mov rsi,[rbp + 16]

mov r15, [mth1];
mov      qword[rsi + 10*8], r15

Macro_Math_pomnoz qword [rbp + 40],qword [rbp - 32],qword [mth1]

Macro_Math_pomnoz qword [rbp + 48],qword [mth1],qword [mth2]

Macro_Math_pomnoz qword [F3_twoDouble],qword [mth2],qword [mth3]

mov rsi,[rbp + 16]

mov r15, [mth3];
mov      qword[rsi + 14*8], r15



mov rsi,[rbp + 16]

mov rax,-2.0202020202020203
mov qword[rsi + 14*8], rax

  

  

  

  

  mov rax, [rbp + 16];
    
    mov rsp, rbp
    pop rbp
ret

F3_translate:
     push rbp
    mov rbp, rsp
    sub rsp, 8*34

    
  

  

  

mov rsi,[rbp + 32]

mov r15,  qword[rsi + 0*8]
mov   qword [rbp - 8], r15

  

mov rsi,[rbp + 32]

mov r15,  qword[rsi + 1*8]
mov   qword [rbp - 16], r15

  

mov rsi,[rbp + 32]

mov r15,  qword[rsi + 2*8]
mov   qword [rbp - 24], r15

  

  

  

  

  

  

  

  

  

  

  

  

  



  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 0*8]
mov   qword [rbp - 128], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 1*8]
mov   qword [rbp - 136], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 2*8]
mov   qword [rbp - 144], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 3*8]
mov   qword [rbp - 152], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 4*8]
mov   qword [rbp - 160], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 5*8]
mov   qword [rbp - 168], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 6*8]
mov   qword [rbp - 176], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 7*8]
mov   qword [rbp - 184], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 8*8]
mov   qword [rbp - 192], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 9*8]
mov   qword [rbp - 200], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 10*8]
mov   qword [rbp - 208], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 11*8]
mov   qword [rbp - 216], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 12*8]
mov   qword [rbp - 224], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 13*8]
mov   qword [rbp - 232], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 14*8]
mov   qword [rbp - 240], r15

  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 15*8]
mov   qword [rbp - 248], r15



  

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 0*8];
mov     qword [rbp - 32], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 1*8];
mov     qword [rbp - 40], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 2*8];
mov     qword [rbp - 48], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 3*8];
mov     qword [rbp - 56], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 4*8];
mov     qword [rbp - 64], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 5*8];
mov     qword [rbp - 72], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 6*8];
mov     qword [rbp - 80], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 7*8];
mov     qword [rbp - 88], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 8*8];
mov     qword [rbp - 96], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 9*8];
mov     qword [rbp - 104], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 10*8];
mov     qword [rbp - 112], r15

mov rsi,[rbp + 24]

mov r15,  qword[rsi + 11*8];
mov     qword [rbp - 120], r15



mov rsi,[rbp + 16]

mov r15, qword [rbp - 32];
mov      qword[rsi + 0*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 40];
mov      qword[rsi + 1*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 48];
mov      qword[rsi + 2*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 56];
mov      qword[rsi + 3*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 64];
mov      qword[rsi + 4*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 72];
mov      qword[rsi + 5*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 80];
mov      qword[rsi + 6*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 88];
mov      qword[rsi + 7*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 96];
mov      qword[rsi + 8*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 104];
mov      qword[rsi + 9*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 112];
mov      qword[rsi + 10*8], r15

mov rsi,[rbp + 16]

mov r15, qword [rbp - 120];
mov      qword[rsi + 11*8], r15



Macro_Math_pomnoz qword [rbp - 96],qword [rbp - 24],qword [mth1]

Macro_Math_pomnoz qword [rbp - 64],qword [rbp - 16],qword [mth2]

Macro_Math_pomnoz qword [rbp - 32],qword [rbp - 8],qword [mth3]

Macro_Math_dodaj qword [mth1],qword [rbp - 224],qword [mth4]

Macro_Math_dodaj qword [mth2],qword [mth4],qword [mth5]

Macro_Math_dodaj qword [mth3],qword [mth5],qword [mth6]

mov rsi,[rbp + 16]

mov r15, [mth6]
mov      qword[rsi + 12*8], r15

Macro_Math_pomnoz qword [rbp - 104],qword [rbp - 24],qword [mth1]

Macro_Math_pomnoz qword [rbp - 72],qword [rbp - 16],qword [mth2]

Macro_Math_pomnoz qword [rbp - 40],qword [rbp - 8],qword [mth3]

Macro_Math_dodaj qword [mth1],qword [rbp - 232],qword [mth4]

Macro_Math_dodaj qword [mth2],qword [mth4],qword [mth5]

Macro_Math_dodaj qword [mth3],qword [mth5],qword [mth6]

mov rsi,[rbp + 16]

mov r15, [mth6]
mov      qword[rsi + 13*8], r15

Macro_Math_pomnoz qword [rbp - 112],qword [rbp - 24],qword [mth1]

Macro_Math_pomnoz qword [rbp - 80],qword [rbp - 16],qword [mth2]

Macro_Math_pomnoz qword [rbp - 48],qword [rbp - 8],qword [mth3]

Macro_Math_dodaj qword [mth1],qword [rbp - 240],qword [mth4]

Macro_Math_dodaj qword [mth2],qword [mth4],qword [mth5]

Macro_Math_dodaj qword [mth3],qword [mth5],qword [mth6]

mov rsi,[rbp + 16]

mov r15, [mth6]
mov      qword[rsi + 14*8], r15

Macro_Math_pomnoz qword [rbp - 120],qword [rbp - 24],qword [mth1]

Macro_Math_pomnoz qword [rbp - 88],qword [rbp - 16],qword [mth2]

Macro_Math_pomnoz qword [rbp - 56],qword [rbp - 8],qword [mth3]

Macro_Math_dodaj qword [mth1],qword [rbp - 248],qword [mth4]

Macro_Math_dodaj qword [mth2],qword [mth4],qword [mth5]

Macro_Math_dodaj qword [mth3],qword [mth5],qword [mth6]

mov rsi,[rbp + 16]

mov r15, [mth6]
mov      qword[rsi + 15*8], r15

  



  mov rax, [rbp + 16];
    
    mov rsp, rbp
    pop rbp
ret