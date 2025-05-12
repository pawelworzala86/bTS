

F3_create:
     push rbp
    mov rbp, rsp
    sub rsp, 8*0

    
    

invoke malloc,16*8

mov     [rbp - 8], rax

  

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 1*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 2*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 3*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 4*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 6*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 7*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 8*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 9*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 11*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 12*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 13*8], rax;

mov rsi,[rbp - 8]

mov rax,0.0
mov qword[rsi + 14*8], rax;



mov rsi,[rbp - 8]

mov rax,1.0
mov qword[rsi + 0*8], rax;

mov rsi,[rbp - 8]

mov rax,1.0
mov qword[rsi + 5*8], rax;

mov rsi,[rbp - 8]

mov rax,1.0
mov qword[rsi + 10*8], rax;

mov rsi,[rbp - 8]

mov rax,1.0
mov qword[rsi + 15*8], rax;

  mov rax, [rbp - 8];
    
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