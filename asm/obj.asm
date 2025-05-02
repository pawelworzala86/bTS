
; programming example

include 'win64a.inc'

format PE64 CONSOLE 5.0
entry start

;include 'include\\opengl.inc'


section '.text' code readable executable

    struct OBJ
        propA dq 1212
        funcA dq ?
    ends

funcA:
    invoke printf, "end"
ret

start:
    sub	rsp,8		; Make stack dqword aligned



    lea rax, [funcA]
    mov [objA.funcA], rax
    
    call [objA.funcA]


    invoke printf, "OK"

    invoke	ExitProcess,0

section '.data' data readable writeable
    lf db 13,10,0

    objA OBJ


section '.idata' import data readable writeable
    include 'include\\idata.inc'