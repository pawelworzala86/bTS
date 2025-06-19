

include 'C:\bTS\cache\system\freeimage.asm'










F7_LoadTexture:
     push rbp
    mov rbp, rsp
    sub rsp, 8*1

    


    invoke printf,' %s ', [rbp + 16]



invoke FreeImage_GetFileType,[rbp + 16], 0

mov     [F7_wFormat], rax

   

invoke FreeImage_Load,[F7_wFormat], [rbp + 16], 0

mov     [F7_hDib], rax



invoke FreeImage_ConvertTo32Bits,[F7_hDib]

mov     [F7_hDib32], rax



    invoke printf,' aaa '



invoke FreeImage_GetBits,[F7_hDib32], NULL, 0

mov     [F7_lpBits], rax

  



invoke FreeImage_GetWidth,[F7_hDib32]

mov     [F7_dwWidth], rax

    

invoke FreeImage_GetHeight,[F7_hDib32]

mov     [F7_dwHeight], rax

    



    invoke FreeImage_Unload,[F7_hDib]



    invoke printf,' bbb '



    lea rax, [F7_textureID]

    invoke glGenTextures,1, rax, 0

    invoke glBindTexture,F6_TEXTURE_2D, [F7_textureID]



    invoke glTexParameteri,F6_TEXTURE_2D, F6_TEXTURE_MIN_FILTER, F6_LINEAR;

    invoke glTexParameteri,F6_TEXTURE_2D, F6_TEXTURE_MAG_FILTER, F6_LINEAR;





    invoke glTexImage2D,F6_TEXTURE_2D, 0, F6_BGRA_EXT, [F7_dwWidth], [F7_dwHeight], 0, F6_BGRA_EXT, F6_UNSIGNED_BYTE, [F7_lpBits]





    invoke printf,' %i ', [F7_textureID]



    mov rax, [F7_textureID]
    
    mov rsp, rbp
    pop rbp
ret