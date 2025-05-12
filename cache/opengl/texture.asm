











F6_LoadTexture:
     push rbp
    mov rbp, rsp
    sub rsp, 8*1

    


    invoke printf,' %s ', [rbp + 16]



invoke FreeImage_GetFileType,[rbp + 16], 0

mov     [F6_wFormat], rax

   

invoke FreeImage_Load,[F6_wFormat], [rbp + 16], 0

mov     [F6_hDib], rax



invoke FreeImage_ConvertTo32Bits,[F6_hDib]

mov     [F6_hDib32], rax



    invoke printf,' aaa '



invoke FreeImage_GetBits,[F6_hDib32], NULL, 0

mov     [F6_lpBits], rax

  



invoke FreeImage_GetWidth,[F6_hDib32]

mov     [F6_dwWidth], rax

    

invoke FreeImage_GetHeight,[F6_hDib32]

mov     [F6_dwHeight], rax

    



    invoke FreeImage_Unload,[F6_hDib]



    invoke printf,' bbb '



    lea rax, [F6_textureID]

    invoke glGenTextures,1, rax, 0

    invoke glBindTexture,F5_TEXTURE_2D, [F6_textureID]



    invoke glTexParameteri,F5_TEXTURE_2D, F5_TEXTURE_MIN_FILTER, F5_LINEAR;

    invoke glTexParameteri,F5_TEXTURE_2D, F5_TEXTURE_MAG_FILTER, F5_LINEAR;





    invoke glTexImage2D,F5_TEXTURE_2D, 0, F5_BGRA_EXT, [F6_dwWidth], [F6_dwHeight], 0, F5_BGRA_EXT, F5_UNSIGNED_BYTE, [F6_lpBits]





    invoke printf,' %i ', [F6_textureID]



    mov rax, [F6_textureID]
    
    mov rsp, rbp
    pop rbp
ret