include 'C:\bTS\cache\system\kernel.asm'








F3_readFile:
     push rbp
    mov rbp, rsp
    sub rsp, 8*1

    


    

    

    

invoke CreateFileA,[rbp + 16], GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0

mov     [F3_handle], rax

    

    



invoke GetFileSize,[F3_handle], 0

mov     [F3_fsize], rax

    

    



invoke malloc,[F3_fsize]

mov     [F3_buffor], rax

    

    invoke ReadFile,[F3_handle], [F3_buffor], [F3_fsize], 0, 0

    

    invoke CloseHandle,[F3_handle]



    



    mov rax, [F3_buffor]
    
    mov rsp, rbp
    pop rbp
ret