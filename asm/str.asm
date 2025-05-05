
; programming example

include 'win64a.inc'

format PE64 console
entry start

section '.data' data readable writeable
    F1_fileName db "example.txt", 0

section '.text' code readable executable
start:
    lea rax, [F1_fileName] ; Załaduj adres ciągu znaków do RAX
    push rax               ; Umieść wskaźnik na stosie
    call F2_readFile       ; Wywołaj funkcję
    add rsp, 8             ; Oczyść stos (zwróć stos do poprzedniego stanu)

    invoke ExitProcess, 0  ; Zakończ program

F2_readFile:
    push rbp               ; Zachowaj poprzednią wartość RBP
    mov rbp, rsp           ; Ustaw nową bazę stosu
    sub rsp, 8             ; Przygotuj miejsce na lokalne zmienne (jeśli potrzebne)

    mov rax, [rbp + 16]    ; Pobierz pierwszy argument (wskaźnik do ciągu znaków)
    invoke printf, "%s", rax ; Wywołaj printf, aby wyświetlić ciąg znaków

    mov rsp, rbp           ; Przywróć poprzedni stos
    pop rbp                ; Przywróć poprzedni RBP
    ret                    ; Powrót z funkcji

section '.idata' import data readable writeable
    library kernel32, 'kernel32.dll', \
            msvcrt, 'msvcrt.dll'
    import kernel32, ExitProcess, 'ExitProcess'
    import msvcrt, printf, 'printf'