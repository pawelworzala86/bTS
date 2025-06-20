
; programming example

include 'win64a.inc'

format PE64 console
entry start

section '.data' data readable writeable
    textA db "example.txt", 0

section '.text' code readable executable


StrLen:
    push rbp
    mov rbp, rsp
    sub rsp, 8*1

    invoke printf, '%s', [rbp + 16]

    ;mov rbx, qword [rbp - 16]

    ;movzx rax, byte [rbx + 0]

    ;invoke printf, '%s', rbx

    mov rsp, rbp
    pop rbp
ret


start:
    sub rsp, 8

    push textA
    call StrLen
    add rsp, 8

    invoke ExitProcess, 0  ; Zakończ program



section '.idata' import data readable writeable
    library kernel32, 'kernel32.dll', \
            msvcrt, 'msvcrt.dll'
    import kernel32, ExitProcess, 'ExitProcess'
    import msvcrt, printf, 'printf'