import * as msvcrt from './msvcrt.ts'

let hDib:number = 0
let hDib32:number = 0
let wFormat:number = 0
let dwWidth:number = 0
let dwHeight:number = 0
let lpBits:number = 0

let textureID:number = 0

export function LoadTexture(name:string){

    msvcrt.printf(' %s ', name)

    wFormat = FreeImage_GetFileType(name, 0)
   
    hDib = FreeImage_Load(wFormat, name, 0)

    hDib32 = FreeImage_ConvertTo32Bits(hDib)

    msvcrt.printf(' aaa ')

    lpBits = FreeImage_GetBits(hDib32, NULL, 0)
  

    dwWidth = FreeImage_GetWidth(hDib32)
    
    dwHeight = FreeImage_GetHeight(hDib32)
    

    FreeImage_Unload(hDib)

    msvcrt.printf(' bbb ')

    lea rax, textureID
    glGenTextures(1, rax, 0)
    glBindTexture(GL_TEXTURE_2D, textureID)

    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);


    glTexImage2D(GL_TEXTURE_2D, 0, GL_BGRA_EXT, dwWidth, dwHeight, 0, GL_BGRA_EXT, GL_UNSIGNED_BYTE, lpBits)


    msvcrt.printf(' %i ', textureID)

    return textureID
}