
; programming example

include 'win64a.inc'

format PE64 console
entry start

section '.data' data readable writeable
    textA db "example", 0
    textB db "am", 0

section '.text' code readable executable


StrLen:
    push rbp
    mov rbp, rsp
    sub rsp, 8*1

    mov rsi, [rbp + 16]           ; wskaźnik na string (argument 1)
    xor rdx, rdx           ; licznik długości = 0

.while:
    mov al, [rsi + rdx]
    cmp al, 0
    je .end
    inc rdx
    jmp .while
.end:
    ; wynik długości jest w rdx

    mov rax, rdx

    mov rsp, rbp
    pop rbp
ret


StrCopy:
    push rbp
    mov rbp, rsp
    sub rsp, 8*2

    mov rsi, [rbp + 16]           ; wskaźnik na string (argument 1)

    push rsi
    call StrLen
    add rsp, 8
    invoke malloc, rax
    mov rdi, rax                ; wskaźnik na string (argument 2)

    xor rdx, rdx           ; licznik długości = 0

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

    mov rsi, [rbp + 16]           ; wskaźnik na string (argument 1)
    mov rdi, [rbp + 24]           ; wskaźnik na string (argument 2)

    ;invoke printf, '%s', rdi

    xor rdx, rdx           ; licznik długości = 0
    xor r9, r9           ; licznik długości = 0

.while:
    xor r9, r9
    mov al, [rsi + rdx]
    .secStr:
    inc r9
    mov bl, [rdi + r9]
    ;invoke printf, '%c', bl
    cmp bl, 0
    je .end
    cmp bl, al
    je .secStr
    ;xor r9, r9
    cmp al, 0
    je .end
    inc rdx
    jmp .while
.end:
    ; wynik długości jest w rdx

    mov rax, rdx

    mov rsp, rbp
    pop rbp
ret

StrSub:
    push rbp
    mov rbp, rsp
    sub rsp, 8*3

    mov rsi, [rbp + 16]           ; wskaźnik na string (argument 1)

    mov rdi, 3                

    mov rdx, 3           ; licznik długości = 3

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

    push 3
    push 3
    push textA
    call StrSub
    add rsp, 8*3
    invoke printf, '%i', rax


    invoke ExitProcess, 0  ; Zakończ program



section '.idata' import data readable writeable
    library kernel32, 'kernel32.dll', \
            msvcrt, 'msvcrt.dll'
    import kernel32, ExitProcess, 'ExitProcess'
    import msvcrt, printf, 'printf',\
        malloc, 'malloc'