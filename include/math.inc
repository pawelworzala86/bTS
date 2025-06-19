macro Macro_Math_pomnoz paramA,paramB,retA
    fld paramA
    fmul paramB
    fstp retA
end macro

macro Macro_Math_dodaj paramA,paramB,retA
    fld paramA
    fadd paramB
    fstp retA
end macro

macro Macro_Math_podziel paramA,paramB,retA
    fld paramA
    fdiv paramB
    fstp retA
end macro

macro Macro_Math_odejmnij paramA,paramB,retA
    fld paramA
    fsub paramB
    fstp retA
end macro



macro Macro_iMath_pomnoz paramA,paramB,retA
    mov rax, paramA
    imul rax, paramB
    mov retA, rax
end macro

macro Macro_iMath_dodaj paramA,paramB,retA
    mov rax, paramA
    add rax, paramB
    mov retA, rax
end macro

macro Macro_iMath_podziel paramA,paramB,retA
    mov rax, paramA
    idiv rax, paramB
    mov retA, rax
end macro

macro Macro_iMath_odejmnij paramA,paramB,retA
    mov rax, paramA
    isub rax, paramB
    mov retA, rax
end macro




macro Macro_Math_sin paramA,retA
    fld paramA
    fsin
    fstp retA
end macro

macro Macro_Math_cos paramA,retA
    fld paramA
    fcos
    fstp retA
end macro

macro Macro_Math_sqrt paramA,retA
    fld paramA
    fsqrt
    fstp retA
end macro

macro Macro_Math_tan paramA,retA
    Macro_Math_sin paramA,[stp1]
    Macro_Math_cos paramA,[stp2]
    fld [stp1]
    fdiv [stp2]
    fstp retA
end macro

macro Macro_Math_Deg2Rad paramA,retA
    fld paramA
    fmul qword [deg2rad]
    fstp retA
end macro