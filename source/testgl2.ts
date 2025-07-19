import * as msvcrt from './system/msvcrt.ts'
import * as fs from './system/file.ts'
import * as utils from './system/utils.ts'

import * as gl from './opengl/gl.ts'
import * as texture from './opengl/texture.ts'
import * as mat4 from './opengl/mat4.ts'

import * as freeimage from './system/freeimage.ts'


let vertices:number[] = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
let coords:number[] = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]


let perspective:number = 0
let camera:number = 0
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


	perspective = mat4.create()
	mat4.perspective(perspective,fovy,aspect,near,far)



	
	fs.readFile(vertFileName)
	vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader,1, utils.lea(fs.buffor), utils.lea(fs.fsize));
	gl.compileShader(vertexShader);
	

	fs.readFile(fragFileName)
	fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader,1, utils.lea(fs.buffor), utils.lea(fs.fsize));
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



	gl.genVertexArrays(1, utils.lea(VAO))
	gl.bindVertexArray(VAO)





	CreateBuffer(0,3,24,144,utils.lea(vertices))
	CreateBuffer(1,2,16,96,utils.lea(coords))
	


	//gl.enable(gl.DEPTH_TEST)
	gl.depthFunc(gl.LEQUAL)
	gl.enable(gl.TEXTURE_2D)



	gl.bindVertexArray(0)

	msvcrt.printf('OK6')


	textureID = texture.LoadTexture(textureFileName)
}


let uniformLocation:number = 0

function renderSystem(){
	gl.clear(gl.COLOR_BUFFER_BIT)


	gl.useProgram(programID);
	

	uniformLocation = gl.getUniformLocation(programID, 'dprojection')
	gl.uniformMatrix4dv(uniformLocation, 1, 0, perspective)

	uniformLocation = gl.getUniformLocation(programID, 'dcamera')
	gl.uniformMatrix4dv(uniformLocation, 1, 0, camera)

	uniformLocation = gl.getUniformLocation(programID, 'dmodel')
	gl.uniformMatrix4dv(uniformLocation, 1, 0, model)

	
	uniformLocation = gl.getUniformLocation(programID, 'diffuseTexture')
	gl.uniform1d(uniformLocation, textureID)


	gl.bindVertexArray(VAO)
	gl.drawArrays(gl.TRIANGLES, 0, 6)
}
function destroySystem(){
}