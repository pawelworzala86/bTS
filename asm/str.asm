
; programming example

include 'win64a.inc'

format PE64 console
entry start

section '.data' data readable writeable
    textA db "example", 0
    textB db "aaaaaaa", 0

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
    sub rsp, 8*1

    mov rsi, [rbp + 16]           ; wskaźnik na string (argument 1)
    ;mov rdi, [rbp + 24]           ; wskaźnik na string (argument 2)

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

    invoke ExitProcess, 0  ; Zakończ program



section '.idata' import data readable writeable
    library kernel32, 'kernel32.dll', \
            msvcrt, 'msvcrt.dll'
    import kernel32, ExitProcess, 'ExitProcess'
    import msvcrt, printf, 'printf',\
        malloc, 'malloc'