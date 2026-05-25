import * as fs from './../system/file.ts'
import * as utils from './../system/utils.ts'
import * as msvcrt from './../system/msvcrt.ts'

import * as gl from './gl.ts'





let vertFileExt:string = '.vert'
let fragFileExt:string = '.frag'
let vertFileName:string = ''
let fragFileName:string = ''



export class Shader{
    vertexShader:number = 0
    fragmentShader:number = 0
    program:number = 0
    load(fileName:string){
        msvcrt.printf('shader begin... %s ...',fileName)

        vertFileName = fileName + vertFileExt

        msvcrt.printf('vertName=%s',vertFileName)
        fs.readFile(vertFileName)
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(this.vertexShader,1, utils.lea(fs.buffor), utils.lea(fs.fsize));
        gl.compileShader(this.vertexShader);
        
        fragFileName = fileName + fragFileExt

        fs.readFile(fragFileName)
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this.fragmentShader,1, utils.lea(fs.buffor), utils.lea(fs.fsize));
        gl.compileShader(this.fragmentShader);
    
        
        
    
        msvcrt.printf('OK4')
    
    
        this.program = gl.createProgram();
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);
        gl.linkProgram(this.program);
    
        gl.useProgram(this.program);
    
        gl.detachShader(this.program, this.vertexShader);
        gl.detachShader(this.program, this.fragmentShader);
    
        gl.deleteShader(this.vertexShader);
        gl.deleteShader(this.fragmentShader);
    }
    use(){
        gl.useProgram(this.program);
    }
}

export default Shader