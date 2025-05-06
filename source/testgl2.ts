import * as msvcrt from './msvcrt.ts'
import * as fs from './file.ts'


let vertices:number[] = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
let coords:number[] = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]


let projection:number[] = [1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0]
let camera:number[] = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-2.100090086,1.0]
let model:number[] = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]


let VAO:number = 0
let bufferID:number = 0

let bufferID1:number = 0
let bufferID2:number = 0

let bytes:number = 8


let vertexShader:number = 0
let fragmentShader:number = 0

let programID:number = 0


let vertFileName:string = 'default.vert'
let fragFileName:string = 'default.frag'

let textureFileName:string = 'texture.jpg'
let textureID:number = 0




/*
function CreateBuffer(posID:number,ssizeA:number,ssizeE:number,lengthA:number,array:number){
	lea rbx, bufferID
	glGenBuffers(1, rbx)

	glBindBuffer(GL_ARRAY_BUFFER, bufferID)
	glBufferData(GL_ARRAY_BUFFER, lengthA, array, GL_STATIC_DRAW)

	glEnableVertexAttribArray(posID)
	glVertexAttribPointer(posID,ssizeA,GL_DOUBLE,GL_FALSE, ssizeE, 0)
}*/



let buffer:number = 0

function initSystem(){

	msvcrt.printf("initiated")
	
	//freeimage.FreeImage_Initialise()
	
	

	msvcrt.printf("OK1 ")



	
	fs.readFile(vertFileName)
	
	msvcrt.printf("OK1 ")
	
	
		vertexShader = glCreateShader(GL_VERTEX_SHADER);
		msvcrt.printf(" OKa")
	msvcrt.printf("%s",fs.buffor)
	lea rax, fs.buffor
	lea rbx, fs.fsize
		glShaderSource(vertexShader,1, rax, rbx);
		glCompileShader(vertexShader);
	
		
	msvcrt.printf("OKb")
	
	fs.readFile(fragFileName)
	
		//msvcrt.printf('OK2')
	
		fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
		lea rax, fs.buffor
	lea rbx, fs.fsize
		glShaderSource(fragmentShader,1, rax,rbx);
		//msvcrt.printf('OK3')
		glCompileShader(fragmentShader);
	
		
		
	
		msvcrt.printf('OK4')
	
	
		programID = glCreateProgram();
		glAttachShader(programID, vertexShader);
		glAttachShader(programID, fragmentShader);
		glLinkProgram(programID);
	
		glUseProgram(programID);

		glDetachShader(programID, vertexShader);
		glDetachShader(programID, fragmentShader);
	
		glDeleteShader(vertexShader);
		glDeleteShader(fragmentShader);





		msvcrt.printf('OK5')



		lea rbx, VAO
			glGenVertexArrays(1, rbx)
			//msvcrt.printf('VAO %i', VAO)
			glBindVertexArray(VAO)
		
		
		
		
			
			//CreateBuffer(0,3,24,144, vertices)
			//function CreateBuffer(posID:number,ssizeA:number,ssizeE:number,lengthA:number,array:number){
				lea rbx, bufferID1
				glGenBuffers(1, rbx)

				msvcrt.printf(' b=%i ', bufferID1)
			
				glBindBuffer(GL_ARRAY_BUFFER, bufferID1)
				lea rax, vertices
				glBufferData(GL_ARRAY_BUFFER, 144, rax, GL_STATIC_DRAW)
			
				glEnableVertexAttribArray(0)
				glVertexAttribPointer(0,3,GL_DOUBLE,GL_FALSE, 24, 0)
			//}
			//CreateBuffer(1,2,16,96, coords)
			//function CreateBuffer(posID:number,ssizeA:number,ssizeE:number,lengthA:number,array:number){
				lea rbx, bufferID2
				glGenBuffers(1, rbx)
			
				glBindBuffer(GL_ARRAY_BUFFER, bufferID2)
				lea rax, coords
				glBufferData(GL_ARRAY_BUFFER, 96, rax, GL_STATIC_DRAW)
			
				glEnableVertexAttribArray(1)
				glVertexAttribPointer(1,2,GL_DOUBLE,GL_FALSE, 16, 0)
			//}
		
		
			//CreateBuffer(posID,ssizeA,ssizeE,lengthA,array)
		
			/*lea rbx, bufferID
			gl.genBuffers(1, rbx)
		
			gl.bindBuffer(gl.ARRAY_BUFFER, bufferID)
			gl.bufferData(gl.ARRAY_BUFFER, 144, addr vertices, gl.STATIC_DRAW)
		
			gl.enableVertexAttribArray(0)
			gl.vertexAttribPointer(0,3,gl.DOUBLE,gl.FALSE, 24, 0)*/
		
		
		
			//;textureID = texture.loadTexture(textureFileName)
		
		
			//gl.enable(gl.DEPTH_TEST)
			//glDepthFunc(GL_LEQUAL)
			//glEnable(GL_TEXTURE_2D)
		
		
		
			glBindVertexArray(0)

			msvcrt.printf('OK6')

}


let uniformLocation:number = 0

function renderSystem(){
    /*invoke	glClear,GL_COLOR_BUFFER_BIT
	invoke	glBegin,GL_QUADS
	invoke	glColor3f,float dword 1.0,float dword 0.1,float dword 0.1
	invoke	glVertex3d,float -0.6,float -0.6,float 0.0
	invoke	glColor3f,float dword 0.1,float dword 0.1,float dword 0.1
	invoke	glVertex3d,float 0.6,float -0.6,float 0.0
	invoke	glColor3f,float dword 0.1,float dword 0.1,float dword 1.0
	invoke	glVertex3d,float 0.6,float 0.6,float 0.0
	invoke	glColor3f,float dword 1.0,float dword 0.1,float dword 1.0
	invoke	glVertex3d,float -0.6,float 0.6,float 0.0
	invoke	glEnd*/



	glClear(GL_COLOR_BUFFER_BIT)


	glUseProgram(programID);
	/*

	uniformLocation = glGetUniformLocation(programID, 'dprojection')
	//lea rax, projection
	glUniformMatrix4dv(uniformLocation, 1, 0, projection)

	uniformLocation = glGetUniformLocation(programID, 'dcamera')
	//lea rax, camera
	glUniformMatrix4dv(uniformLocation, 1, 0, camera)

	uniformLocation = glGetUniformLocation(programID, 'dmodel')
	//lea rax, model
	glUniformMatrix4dv(uniformLocation, 1, 0, model)

	//uniformLocation = glGetUniformLocation(programID, 'diffuseTexture')
	//glUniform1d(uniformLocation, textureID)
	*/
	glBindVertexArray(VAO)
	glDrawArrays(GL_TRIANGLES, 0, 6)




}
function destroySystem(){
}