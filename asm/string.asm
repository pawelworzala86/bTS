
; programming example

include 'win64a.inc'

format PE64 console
entry start

section '.data' data readable writeable
    textA db "example", 0
    textB db "am", 0
    textC db "qq",0

section '.text' code readable executable


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

    mov r10,0

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

start:
    sub rsp, 8

    push textA
    call StrLen
    add rsp, 8
    invoke printf, '%i', rax

    ;push textB
    push textA
    call StrCopy
    add rsp, 8
    invoke printf, '%s', rax

    push 0
    push textB
    push textA
    call StrPos
    add rsp, 8*3
    invoke printf, '%i', rax

    push 0
    push textC
    push textA
    call StrPos
    add rsp, 8*3
    invoke printf, '%i', rax

    push 4
    push 3
    push textA
    call StrSub
    add rsp, 8*3
    invoke printf, '%s', rax

    push textB
    push textA
    call StrCon
    add rsp, 8*2
    invoke printf, '%s', rax


    invoke ExitProcess, 0



section '.idata' import data readable writeable
    library kernel32, 'kernel32.dll', \
            msvcrt, 'msvcrt.dll'
    import kernel32, ExitProcess, 'ExitProcess'
    import msvcrt, printf, 'printf',\
        malloc, 'malloc'