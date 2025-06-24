StrLen:
    push rbp
    mov rbp, rsp
    sub rsp, 8*1

    mov rsi, [rbp + 16]
    xor rdx, rdx

.while:
    mov al, [rsi + rdx]
    cmp al, 0
    je .end
    inc rdx
    jmp .while
.end:

    mov rax, rdx

    mov rsp, rbp
    pop rbp
ret


StrCopy:
    push rbp
    mov rbp, rsp
    sub rsp, 8*2

    mov rsi, [rbp + 16]

    push rsi
    call StrLen
    add rsp, 8
    inc rax
    invoke malloc, rax
    mov rdi, rax

    xor rdx, rdx

.while:
    mov al, [rsi + rdx]
    mov [rdi + rdx], al
    cmp al, 0
    je .end
    inc rdx
    jmp .while
.end:
    ; wynik długości jest w rdx

    mov rax, rdi

    mov rsp, rbp
    pop rbp
ret

StrPos:
    push rbp
    mov rbp, rsp
    sub rsp, 8*3

    mov rsi, [rbp + 16]
    mov rdi, [rbp + 24]
    mov rdx, [rbp + 32]

    xor r9, r9

.while:
    xor r9, r9
    mov al, [rsi + rdx]
    .secStr:
    inc r9
    mov bl, [rdi + r9]
    ;invoke printf, '%c', bl
    cmp bl, 0
    je .endA
    cmp bl, al
    je .secStr
    ;xor r9, r9
    cmp al, 0
    je .end
    inc rdx
    jmp .while
.end:
    mov rax, -1
    jmp .endB
.endA:
    mov rax, rdx
.endB:

    ;mov rax, rdx

    mov rsp, rbp
    pop rbp
ret

StrSub:
    push rbp
    mov rbp, rsp
    sub rsp, 8*3

    mov rsi, [rbp + 16]

    mov rbx, [rbp + 24]
    mov r12, [rbp + 32]

    mov rax, r12
    sub rax, rbx

    inc rax
    invoke malloc, rax
    mov rdi, rax

    mov r9, 0          

.while:
    mov al, [rsi + rbx]
    mov [rdi + r9], al
    inc r9
    inc rbx

    cmp rbx, r12
    je .end
    cmp al, 0
    je .end

    jmp .while
.end:
    mov byte[rdi + r9], 0

    mov rax, rdi

    mov rsp, rbp
    pop rbp
ret

StrCon:
    push rbp
    mov rbp, rsp
    sub rsp, 8*2

    mov rsi, [rbp + 16]
    mov rdi, [rbp + 24]
    xor rdx, rdx

    mov r10,0

    push rsi
    call StrLen
    add rsp, 8
    add r10,rax
    push rdi
    call StrLen
    add rsp, 8
    add r10,rax

    inc r10
    invoke malloc, r10
    mov r11, rax

    mov rsi, [rbp + 16]
    mov rdi, [rbp + 24]
    xor rdx, rdx

    ;mov r10,0

    xor r12,r12

.while:
    mov al, [rsi + rdx]
    cmp al, 0
    je .end
    mov [r11+r12],al
    inc rdx
    inc r12
    jmp .while
.end:

    xor rdx,rdx

.while2:
    mov al, [rdi + rdx]
    mov [r11+r12],al
    cmp al, 0
    je .end2
    inc rdx
    inc r12
    jmp .while2
.end2:

    mov rax, r11

    mov rsp, rbp
    pop rbp
ret

StrComp:
    push rbp
    mov rbp, rsp
    sub rsp, 8*2

    mov rsi, [rbp + 16]
    mov rdi, [rbp + 24]
    xor rdx, rdx

.while:
    mov al, [rsi + rdx]
    mov bl, [rdi + rdx]
    cmp al, 0
    je .end
    inc rdx
    cmp al, bl
    je .while
    mov rax, -1
    jmp .endFalse
.end:
    cmp bl,0
    jne .endFalse
    mov rax, 1
.endFalse:

    mov rsp, rbp
    pop rbp
ret

StrRepl:
    push rbp
    mov rbp, rsp
    sub rsp, 8*3

    ;mov rsi, [rbp + 16]
    ;mov rdi, [rbp + 24]
    push 0
    push [rbp + 24]
    push [rbp + 16]
    call StrPos
    add rsp, 8*3
    ;invoke printf, '%i', rax
    mov r11, rax
    ;i = str_pos

    push [rbp + 24]
    call StrLen
    add rsp, 8
    ;invoke printf, '%i', rax
    mov r12, rax
    ;l = str_len_from

    ;l2 = str_len_dest

    ;//ll = str_len + (l2-l)
    ;//malloc ll

    push [rbp + 16]
    call StrLen
    add rsp, 8
    ;invoke printf, '%i', rax
    mov r13, rax
    ;original_str

    dec r11
    push r11
    push 0
    push [rbp + 16]
    call StrSub
    add rsp, 8*3
    ;invoke printf, '%s', rax
    mov r14, rax

    push 0
    push [rbp + 24]
    push [rbp + 16]
    call StrPos
    add rsp, 8*3
    ;invoke printf, '%i', rax
    mov r11, rax

    dec r11
    mov rax, r11
    add rax, r12
    ;invoke printf, '%i', r13
    push r13
    push rax
    push [rbp + 16]
    call StrSub
    add rsp, 8*3
    ;invoke printf, '%s', rax
    mov r15, rax

    ;from = subst 0, i
    ;rest = subst i+l, len original_str,
    ;con from, dest
    ;con rax,rest

    push [rbp + 32]
    push r14
    call StrCon
    add rsp, 8*2
    ;invoke printf, '%s', rax

    push r15
    push rax
    call StrCon
    add rsp, 8*2
    ;invoke printf, '%s', rax

    ;return rax

    mov rsp, rbp
    pop rbp
ret