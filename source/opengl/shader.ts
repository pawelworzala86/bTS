import * as fs from './../system/file.ts'
import * as utils from './../system/utils.ts'
import * as msvcrt from './../system/msvcrt.ts'

import * as gl from './gl.ts'



let vertexShader:number = 0
let fragmentShader:number = 0

let vertFileExt:string = '.vert'
let fragFileExt:string = '.frag'
let vertFileName:string = ''
let fragFileName:string = ''

let programID:number = 0

export class Shader{
    load(fileName:string){
        msvcrt.printf('shader begin... %s ...',fileName)

        vertFileName = fileName + vertFileExt

        msvcrt.printf('vertName=%s',vertFileName)
        fs.readFile(vertFileName)
        vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader,1, utils.lea(fs.buffor), utils.lea(fs.fsize));
        gl.compileShader(vertexShader);
        
        fragFileName = fileName + fragFileExt

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