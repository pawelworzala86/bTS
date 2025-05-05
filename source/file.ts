import * as kernel from './kernel.ts'
import * as msvcrt from './msvcrt.ts'

export let handle:number = 0
export let fsize:number = 0
export let buffor:number = 0

//let fileName:string = 'test.txt'

export function readFile(fileName:string){

    //lea rax, [fileName]
    //msvcrt.printf(" %s ",fileName)
    
    handle = kernel.CreateFileA(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
    //mov handle, rax
    //msvcrt.printf(" h %i ",handle)

    fsize = kernel.GetFileSize(handle, 0)
    //mov fsize, rax
    //msvcrt.printf(" sz %i ",fsize)

    buffor = msvcrt.malloc(fsize)
    //mov buffor, rax
    kernel.ReadFile(handle, buffor, fsize, 0, 0)
    //printf('%s',buffor)
    kernel.CloseHandle(handle)

    //msvcrt.printf(" %s ", buffor)

    return buffor
}