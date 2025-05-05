
initGL:
     push rbp
    mov rbp, rsp
    sub rsp, 8*0

    
invoke wglGetProcAddress,"glUniform1i";

mov     [glUniform1i], rax

invoke wglGetProcAddress,"glUniform1f";

mov     [glUniform1f], rax

invoke wglGetProcAddress,"glBindVertexArray";

mov     [glBindVertexArray], rax

invoke wglGetProcAddress,"glGenBuffers";

mov     [glGenBuffers], rax

invoke wglGetProcAddress,"glBindBuffer";

mov     [glBindBuffer], rax

invoke wglGetProcAddress,"glCreateShader";

mov     [glCreateShader], rax

invoke wglGetProcAddress,"glShaderSource";

mov     [glShaderSource], rax

invoke wglGetProcAddress,"glCompileShader";

mov     [glCompileShader], rax

invoke wglGetProcAddress,"glCreateProgram";

mov     [glCreateProgram], rax

invoke wglGetProcAddress,"glAttachShader";

mov     [glAttachShader], rax

invoke wglGetProcAddress,"glLinkProgram";

mov     [glLinkProgram], rax

invoke wglGetProcAddress,"glUseProgram";

mov     [glUseProgram], rax

invoke wglGetProcAddress,"glDetachShader";

mov     [glDetachShader], rax

invoke wglGetProcAddress,"glDeleteShader";

mov     [glDeleteShader], rax

invoke wglGetProcAddress,"glGenVertexArrays";

mov     [glGenVertexArrays], rax

invoke wglGetProcAddress,"glBufferData";

mov     [glBufferData], rax

invoke wglGetProcAddress,"glEnableVertexAttribArray";

mov     [glEnableVertexAttribArray], rax

invoke wglGetProcAddress,"glVertexAttribPointer";

mov     [glVertexAttribPointer], rax

invoke wglGetProcAddress,"glGetUniformLocation";

mov     [glGetUniformLocation], rax

invoke wglGetProcAddress,"glUniform1d";

mov     [glUniform1d], rax

invoke wglGetProcAddress,"glUniform4dv";

mov     [glUniform4dv], rax

invoke wglGetProcAddress,"glUniformMatrix4dv";

mov     [glUniformMatrix4dv], rax
    
    mov rsp, rbp
    pop rbp
ret

