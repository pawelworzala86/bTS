
; programming example

include 'win64a.inc'

format PE64 console
entry start

section '.data' data readable writeable
    textA db "example", 0
    textB db "am", 0
    textC db "qq",0
    textD db "example", 0
    textE db "AM", 0

section '.text' code readable executable
    
    include 'include\string.inc'

start:
    sub rsp, 8

    push textA
    call StrLen
    add rsp, 8
    invoke printf, '%i', rax

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

    push textB
    push textA
    call StrComp
    add rsp, 8*2
    invoke printf, '%i', rax

    push textD
    push textA
    call StrComp
    add rsp, 8*2
    invoke printf, '%i', rax

    push textE
    push textB
    push textA
    call StrRepl
    add rsp, 8*3
    invoke printf, '%s', rax


    invoke ExitProcess, 0



section '.idata' import data readable writeable
    library kernel32, 'kernel32.dll', \
            msvcrt, 'msvcrt.dll'
    import kernel32, ExitProcess, 'ExitProcess'
    import msvcrt, printf, 'printf',\
        malloc, 'malloc'