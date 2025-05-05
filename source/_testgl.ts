import * as msvcrt from './system/msvcrt.ts'
import * as fs from './system/fs.ts'
import * as utils from './system/utils.ts'

import * as gl from './system/gl/gl.ts'
import * as texture from './system/gl/texture.ts'
import * as freeimage from './system/gl/freeimage.ts'


let vertices:number[] = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
let coords:number[] = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]


let projection:number[] = [1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0]
let camera:number[] = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-2.100090086,1.0]
let model:number[] = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]


let VAO:number = 0
let bufferID:number = 0

let bytes:number = 8


let vertexShader:number = 0
let fragmentShader:number = 0

let programID:number = 0


let vertFileName:string = 'default.vert'
let fragFileName:string = 'default.frag'

let textureFileName:string = 'texture.jpg'
let textureID:number = 0



function CreateBuffer(posID,ssizeA,ssizeE,lengthA,array){
    //lea rbx, bufferID
	gl.genBuffers(1, utils.ptr(bufferID))

	gl.bindBuffer(gl.ARRAY_BUFFER, bufferID)
    gl.bufferData(gl.ARRAY_BUFFER, lengthA, array, gl.STATIC_DRAW)

    gl.enableVertexAttribArray(posID)
	gl.vertexAttribPointer(posID,ssizeA,gl.DOUBLE,gl.FALSE, ssizeE, 0)
}


function initSystem(){
    msvcrt.printf("initiated")

    freeimage.FreeImage_Initialise()

    gl.initGL()


    
	fs.readFileSync(vertFileName)

    msvcrt.printf('OK1')


	vertexShader = gl.createShader(gl.VERTEX_SHADER);
    msvcrt.printf(' OKa')
    //msvcrt.printf('%s',fs.buffor)
    gl.shaderSource(vertexShader,1, utils.addr(fs.buffor), utils.addr(fs.fsize));
    gl.compileShader(vertexShader);

	
    msvcrt.printf('OKb')

	fs.readFileSync(fragFileName)

    //msvcrt.printf('OK2')

	fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,1, utils.addr(fs.buffor), utils.addr(fs.fsize));
    //msvcrt.printf('OK3')
    gl.compileShader(fragmentShader);

	
    

    //msvcrt.printf('OK4')


	programID = gl.createProgram();
    gl.attachShader(programID, vertexShader);
    gl.attachShader(programID, fragmentShader);
    gl.linkProgram(programID);

	gl.useProgram(programID);

    gl.detachShader(programID, vertexShader);
	gl.detachShader(programID, fragmentShader);

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);


    //msvcrt.printf('OK5')


    //lea rbx, VAO
    gl.genVertexArrays(1, utils.ptr(VAO))
	//msvcrt.printf('VAO %i', VAO)
    gl.bindVertexArray(VAO)




    
    CreateBuffer(0,3,24,144, utils.addr(vertices))
    CreateBuffer(1,2,16,96, utils.addr(coords))


    //CreateBuffer(posID,ssizeA,ssizeE,lengthA,array)

    /*lea rbx, bufferID
	gl.genBuffers(1, rbx)

	gl.bindBuffer(gl.ARRAY_BUFFER, bufferID)
    gl.bufferData(gl.ARRAY_BUFFER, 144, addr vertices, gl.STATIC_DRAW)

    gl.enableVertexAttribArray(0)
	gl.vertexAttribPointer(0,3,gl.DOUBLE,gl.FALSE, 24, 0)*/



    textureID = texture.loadTexture(textureFileName)


    //gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.enable(gl.TEXTURE_2D)



    gl.bindVertexArray(0)

}

let uniformLocation:number = 0

function renderSystem(){

    gl.clear(gl.COLOR_BUFFER_BIT)




    gl.useProgram(programID);
    

    uniformLocation = gl.getUniformLocation(programID, 'dprojection')
    //lea rax, projection
    gl.uniformMatrix4dv(uniformLocation, 1, 0, utils.ptr(projection))

    uniformLocation = gl.getUniformLocation(programID, 'dcamera')
    //lea rax, camera
    gl.uniformMatrix4dv(uniformLocation, 1, 0, utils.ptr(camera))

    uniformLocation = gl.getUniformLocation(programID, 'dmodel')
    //lea rax, model
    gl.uniformMatrix4dv(uniformLocation, 1, 0, utils.ptr(model))

    uniformLocation = gl.getUniformLocation(programID, 'diffuseTexture')
    gl.uniform1d(uniformLocation, textureID)
	
	gl.bindVertexArray(VAO)
	gl.drawArrays(gl.TRIANGLES, 0, 6)

}

function destroySystem(){
    
}