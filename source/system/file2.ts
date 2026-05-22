import * as kernel from './kernel.ts'
import * as msvcrt from './msvcrt.ts'
import * as utils from './utils.ts'

export class FS{
    handle:number = 0
    fsize:number = 0
    buffor:number = 0
    readFile(fileName:string){
        this.handle = kernel.CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        
        this.fsize = kernel.GetFileSize(this.handle, 0)
        //msvcrt.printf(" sz %i ",this.fsize)

        this.buffor = msvcrt.malloc(this.fsize)

        kernel.ReadFile(this.handle, this.buffor, this.fsize, 0, 0)

        kernel.CloseHandle(this.handle)

        return this.buffor
    }
}

export let fs:FS = new FS()

export default fs