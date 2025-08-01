import * as msvcrt from './system/msvcrt.ts'
import * as fs from './system/file.ts'
import * as utils from './system/utils.ts'

import * as gl from './opengl/gl.ts'
import * as texture from './opengl/texture.ts'
import * as mat4 from './opengl/mat4.ts'

import * as freeimage from './system/freeimage.ts'


let vertices:number[] = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
let coords:number[] = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]


//let projection:number[] = [1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0]
let perspective:number = 0
//let camera:number[] = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-2.100090086,1.0]
let camera:number = 0
//let model:number[] = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]
let model:number = 0

let fovy:number = 45.0
let aspect:number = 1.0
let near:number = 0.01
let far:number = 1000.0

let cameraPos:number = -2.1



let VAO:number = 0
let bufferID:number = 0


let vertexShader:number = 0
let fragmentShader:number = 0

let programID:number = 0


let vertFileName:string = 'default.vert'
let fragFileName:string = 'default.frag'

let textureFileName:string = 'texture.jpg'
let textureID:number = 0





function CreateBuffer(posID:number,ssizeA:number,ssizeE:number,lengthA:number,array:number){
	gl.genBuffers(1, utils.lea(bufferID))

	msvcrt.printf(' l=%i ', posID)

	gl.bindBuffer(gl.ARRAY_BUFFER, bufferID)
	//lea r10, vertices
	gl.bufferData(gl.ARRAY_BUFFER, lengthA, array, gl.STATIC_DRAW)

	gl.enableVertexAttribArray(posID)
	gl.vertexAttribPointer(posID,ssizeA,gl.DOUBLE,gl.FALSE, ssizeE, 0)
}



let buffer:number = 0

function initSystem(){

	msvcrt.printf("initiated")

	freeimage.FreeImage_Initialise()

	//msvcrt.printf("initiated 2")

	gl.initializeGL()
	
	

	msvcrt.printf("OK1 ")



	model = mat4.create()

	camera = mat4.create()
	camera[14] = cameraPos

	//Macro_Math_Deg2Rad qword fovy, qword fovy

	perspective = mat4.create()
	mat4.perspective(perspective,fovy,aspect,near,far)






	
	fs.readFile(vertFileName)
	
	msvcrt.printf("OK1 ")
	
	
		vertexShader = gl.createShader(gl.VERTEX_SHADER);
		msvcrt.printf(" OKa")
	//msvcrt.printf("%s",fs.buffor)
	//lea rax, fs.buffor
	//lea rbx, fs.fsize
		gl.shaderSource(vertexShader,1, utils.lea(fs.buffor), utils.lea(fs.fsize));
		gl.compileShader(vertexShader);
	
		
	msvcrt.printf("OKb")
	
	fs.readFile(fragFileName)
	
		//msvcrt.printf('OK2')
	
		fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		//lea rax, fs.buffor
	//lea rbx, fs.fsize
		gl.shaderSource(fragmentShader,1, utils.lea(fs.buffor), utils.lea(fs.fsize));
		//msvcrt.printf('OK3')
		gl.compileShader(fragmentShader);
	
		
		
	
		msvcrt.printf('OK4')
	
	
		programID = gl.createProgram();
		gl.attachShader(programID, vertexShader);
		gl.attachShader(programID, fragmentShader);
		gl.linkProgram(programID);
	
		gl.useProgram(programID);

		gl.detachShader(programID, vertexShader);
		gl.detachShader(programID, fragmentShader);
	
		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);





		msvcrt.printf('OK5')



		//lea rbx, VAO
			gl.genVertexArrays(1, utils.lea(VAO))
			//msvcrt.printf('VAO %i', VAO)
			gl.bindVertexArray(VAO)
		
		
		
		
			//lea rax, vertices
			CreateBuffer(0,3,24,144,utils.lea(vertices))
			//function CreateBuffer(posID:number,ssizeA:number,ssizeE:number,lengthA:number,array:number){
				/*lea rbx, bufferID1
				glGenBuffers(1, rbx)

				msvcrt.printf(' b=%i ', bufferID1)
			
				glBindBuffer(gl.ARRAY_BUFFER, bufferID1)
				lea rax, vertices
				glBufferData(gl.ARRAY_BUFFER, 144, rax, gl.STATIC_DRAW)
			
				glEnableVertexAttribArray(0)
				glVertexAttribPointer(0,3,gl.DOUBLE,gl.FALSE, 24, 0)*/
			//}
			//lea rax, coords
			CreateBuffer(1,2,16,96,utils.lea(coords))
			//function CreateBuffer(posID:number,ssizeA:number,ssizeE:number,lengthA:number,array:number){
				/*lea rbx, bufferID2
				glGenBuffers(1, rbx)
			
				glBindBuffer(gl.ARRAY_BUFFER, bufferID2)
				lea rax, coords
				glBufferData(gl.ARRAY_BUFFER, 96, rax, gl.STATIC_DRAW)
			
				glEnableVertexAttribArray(1)
				glVertexAttribPointer(1,2,gl.DOUBLE,gl.FALSE, 16, 0)*/
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
			gl.depthFunc(gl.LEQUAL)
			gl.enable(gl.TEXTURE_2D)
		
		
		
			gl.bindVertexArray(0)

			msvcrt.printf('OK6')


	textureID = texture.LoadTexture(textureFileName)

}


let uniformLocation:number = 0

function renderSystem(){
    /*invoke	glClear,gl.COLOR_BUFFER_BIT
	invoke	glBegin,gl.QUADS
	invoke	glColor3f,float dword 1.0,float dword 0.1,float dword 0.1
	invoke	glVertex3d,float -0.6,float -0.6,float 0.0
	invoke	glColor3f,float dword 0.1,float dword 0.1,float dword 0.1
	invoke	glVertex3d,float 0.6,float -0.6,float 0.0
	invoke	glColor3f,float dword 0.1,float dword 0.1,float dword 1.0
	invoke	glVertex3d,float 0.6,float 0.6,float 0.0
	invoke	glColor3f,float dword 1.0,float dword 0.1,float dword 1.0
	invoke	glVertex3d,float -0.6,float 0.6,float 0.0
	invoke	glEnd*/



	gl.clear(gl.COLOR_BUFFER_BIT)


	gl.useProgram(programID);
	

	uniformLocation = gl.getUniformLocation(programID, 'dprojection')
	//lea rax, projection
	gl.uniformMatrix4dv(uniformLocation, 1, 0, perspective)

	uniformLocation = gl.getUniformLocation(programID, 'dcamera')
	//lea rax, camera
	gl.uniformMatrix4dv(uniformLocation, 1, 0, camera)

	uniformLocation = gl.getUniformLocation(programID, 'dmodel')
	//lea rax, model
	gl.uniformMatrix4dv(uniformLocation, 1, 0, model)

	
	uniformLocation = gl.getUniformLocation(programID, 'diffuseTexture')
	gl.uniform1d(uniformLocation, textureID)
	



	gl.bindVertexArray(VAO)
	gl.drawArrays(gl.TRIANGLES, 0, 6)




}
function destroySystem(){
}