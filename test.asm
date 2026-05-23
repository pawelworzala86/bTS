include 'C:\bTS\cache\system\msvcrt.asm'



F1_strSetVals:
     push rbp
    mov rbp, rsp
    sub rsp, 8*0

    
        
    
    mov rsp, rbp
    pop rbp
ret
F1_defConstructors:
     push rbp
    mov rbp, rsp
    sub rsp, 8*0

    
        
    
    mov rsp, rbp
    pop rbp
ret


F1_main:
     push rbp
    mov rbp, rsp
    sub rsp, 8*0

    
call F1_defConstructors



call F1_strSetVals



    invoke printf,"ok"
    
    mov rsp, rbp
    pop rbp
ret