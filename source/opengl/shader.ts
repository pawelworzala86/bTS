import * as fs from './../system/file.ts'
import * as utils from './../system/utils.ts'
import * as msvcrt from './../system/msvcrt.ts'

import * as gl from './gl.ts'



let vertexShader:number = 0
let fragmentShader:number = 0


let vertFileName:string = 'default.vert'
let fragFileName:string = 'default.frag'

let programID:number = 0

export class Shader{
    load(){
        msvcrt.printf('shader begin...')

        msvcrt.printf('vertName=',vertFileName)
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
    }
    use(){
        gl.useProgram(programID);
        return programID
    }
}

export default Shader