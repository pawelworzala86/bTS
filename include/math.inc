









   macro Macro_Math_pomnoz aram11,aram22,aret33
    

    fld aram11

    fmul aram22

    fstp aret33


    end macro




    macro Macro_Math_dodaj aram11,aram22,aret33
    

    fld aram11

    fadd aram22

    fstp aret33


    end macro




    macro Macro_Math_podziel aram11,aram22,aret33
    

    fld aram11

    fdiv aram22

    fstp aret33


    end macro




    macro Macro_Math_odejmnij aram11,aram22,aret33
    

    fld aram11

    fsub aram22

    fstp aret33


    end macro








    macro Macro_iMath_pomnoz aram11,aram22,aret33
    

    mov rax, aram11

    imul rax, aram22

    mov aret33, rax


    end macro




    macro Macro_iMath_dodaj aram11,aram22,aret33
    

    mov rax, aram11

    add rax, aram22

    mov aret33, rax


    end macro




    macro Macro_iMath_podziel aram11,aram22,aret33
    

    mov rax, aram11

    idiv rax, aram22

    mov aret33, rax


    end macro




    macro Macro_iMath_odejmnij aram11,aram22,aret33
    

    mov rax, aram11

    isub rax, aram22

    mov aret33, rax


    end macro








    macro Macro_Math_sin aram11,aret33
    

    fld aram11

    fsin

    fstp aret33


    end macro




    macro Macro_Math_cos aram11,aret33
    

    fld aram11

    fcos

    fstp aret33


    end macro




    macro Macro_Math_sqrt aram11,aret33
    

    fld aram11

    fsqrt

    fstp aret33


    end macro






    macro Macro_Math_tan aram11,aret33
    

    Macro_Math_sin aram11,[stp1]

    Macro_Math_cos aram11,[stp2]

    fld [stp1]

    fdiv [stp2]

    fstp aret33


    end macro




    macro Macro_Math_Deg2Rad aram11,aret33
    

    fld aram11

    fmul qword [deg2rad]

    fstp aret33


    end macro