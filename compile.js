const fs = require('fs')
const path = require('path')


function Blocks(source){
    let newSource = ''
    var tab = 1
    for(let index=0;index<source.length;index++){
        if(source[index]=='{'){
            newSource += ':'+tab
            tab++
        }
        if(source[index]=='}'){
            newSource += ':'+(tab-1)
            tab--
        }
        newSource += source[index]
    }
    return newSource
}


const REG = ['rax','rbx','rdx','rdi', 'r9', 'r10', 'r11', 'r12']
const INVOKERS = []

const DATA = []

let FILE_INDEX = 1

const FILES = {}


/*let idataStr = fs.readFileSync('./include/idata.inc').toString()
idataStr.replace(/([a-zA-Z0-9\_]+)/gm,word=>{
    INVOKERS.push(word)
})*/



const idata = {}
function addDLL(name,dll){
    if(dll=='hard'){
        return
    }
    dll = dll.toUpperCase()
    name = name.replace('32','')
    if(idata[name]==undefined){
        idata[name] = {dll,functions:{}}
    }
}
function addImport(dll,aliasName,dllName){
    if(dll=='hard'){
        return
    }
    dll = dll.replace('32','')
    idata[dll].functions[aliasName]=dllName
    INVOKERS.push(aliasName)
}
function createIData(){
    let library = []
    let libraryFuncs = []
    for(const key of Object.keys(idata)){
        if(key=='hard'){
            continue
        }
        let lib = idata[key]
        library.push(`${key},'${lib.dll}'`)
        let funcs = []
        for(const fn of Object.keys(lib.functions)){
            funcs.push(`${fn},'${lib.functions[fn]}'`)
        }
        libraryFuncs.push('import '+key+',\\\n'+funcs.join(',\\\n'))
    }

    return `library ${library.join(',\\\n')}

${libraryFuncs.join('\n\n')}`
}

addDLL('kernel','kernel32.dll')
addImport('kernel', 'ExitProcess', 'ExitProcess')
addImport('kernel', 'GetModuleHandle', 'GetModuleHandleA')
addImport('kernel', 'GetTickCount', 'GetTickCount')

addDLL('user','user32.dll')
addImport('user', 'LoadIcon', 'LoadIconA')
addImport('user', 'LoadCursor', 'LoadCursorA')
addImport('user', 'RegisterClass', 'RegisterClassA')
addImport('user', 'CreateWindowEx', 'CreateWindowExA')
addImport('user', 'GetMessage', 'GetMessageA')
addImport('user', 'TranslateMessage', 'TranslateMessage')
addImport('user', 'DispatchMessage', 'DispatchMessageA')
addImport('user', 'DefWindowProc', 'DefWindowProcA')
addImport('user', 'GetDC', 'GetDC')
addImport('user', 'GetClientRect', 'GetClientRect')
addImport('user', 'ReleaseDC', 'ReleaseDC')
addImport('user', 'PostQuitMessage', 'PostQuitMessage')

addDLL('gdi','gdi32.dll')
addImport('gdi', 'ChoosePixelFormat', 'ChoosePixelFormat')
addImport('gdi', 'SetPixelFormat', 'SetPixelFormat')
addImport('gdi', 'SwapBuffers', 'SwapBuffers')

addDLL('opengl','opengl32.dll')
addImport('opengl', 'wglCreateContext', 'wglCreateContext')
addImport('opengl', 'wglMakeCurrent', 'wglMakeCurrent')
addImport('opengl', 'glViewport', 'glViewport')
addImport('opengl', 'wglDeleteContext', 'wglDeleteContext')





function Compile(file,remdir=''){
    let activeDir = file.replace(remdir,'').split('\\')
    if(activeDir.length>1){
        activeDir.splice(activeDir.length-1, 1)
        activeDir = activeDir.join('\\')
        //console.log('activeDir',activeDir)
    }else{
        activeDir = ''
    }

    let source = fs.readFileSync(file).toString()

    if(FILES[file]!=undefined){
        return
    }

    const FILE = {
        FUNCTIONS: {},
        CLASSES: {},
        EXPORTS: [],
        INDEX: FILE_INDEX++,
    }

    FILES[file] = FILE

    function r(regexp,callback){
        source = source.replace(regexp,callback)
    }

    source = Blocks(source)


    r(/export declare function .*/gm,match=>{
        let name = match.split('(')[0].replace('export declare function','').trim()
        if(match.indexOf('//')>-1){
            let dll = match.split('//')[1].trim()
            if(dll=='hard'){
                DATA.push({name,kind:'dq',value:'?'})
            }
            addDLL(dll,dll+'.dll')
            addImport(dll,name,name)
        }
        return match
    })


    r(/\/\/int/gm,'@@int')

    r(/\/\/.*/gm,'')
    r(/\/\*[\s\S]+?\*\//gm,'')

    r(/\@\@int/gm,'//int')


    r(/var /gm,'let ')


    let slines = source.split('\n')
    slines = slines.map(line=>{
        let idx = 0
        let prefix = ''
        for(let i=0;i<8;i++){
            line=line.replace(/^(.*)utils\.lea\(([\s\S]+?)\)(.*)$/gm,match=>{
                let params = /^(.*)utils\.lea\(([\s\S]+?)\)(.*)$/gm.exec(match)
                let reg = REG[idx++]
                prefix+=`lea ${reg},${params[2]}\n`
                return `${params[1]}${reg}${params[3]}`
            })
        }
        return prefix+line
    })
    source = slines.join('\n')
    



    r(/export const .*\:/gm,match=>{
        let name = match.split(' ')[2].trim().split(':')[0].trim()
        FILE.EXPORTS.push({name,kind:'data'})
        return match.replace('export ','')
    })
    r(/export declare function .*/gm,match=>{
        let name = match.split('(')[0].replace('export declare function','').trim()
        INVOKERS.push(name)
        FILE.EXPORTS.push({name,kind:'invoke'})
        return ''
    })
    r(/export function .*\(/gm,match=>{
        let name = match.split(' ')[2].trim().split('(')[0].trim()
        FILE.EXPORTS.push({name,kind:'function'})
        return match.replace('export ','')
    })
    r(/export let .*\:/gm,match=>{
        let name = match.split(' ')[2].trim().split(':')[0].trim()
        FILE.EXPORTS.push({name,kind:'data'})
        return match.replace('export ','')
    })
    r(/export class .*\:/gm,match=>{
        let name = match.split(' ')[2].trim().split(':')[0].trim()
        FILE.EXPORTS.push({name,kind:'class'})
        return match.replace('export ','')
    })
    //r(/export .*/gm,'')

    r(/const (.*)\:.* = (.*)/gm,'F'+FILE.INDEX+'_$1@@=@@$2')


    let FFF = []
    r(/import .*/gm,match=>{
        let as = match.split(' ')[3]
        let fi = match.split(' ')[5].replace(/\'/gm,'').replace('./','')
        //console.log('GGG',as,fi)
        //if(activeDir.length){
            fi = 'source/'+activeDir+'/'+fi
        //}

        //console.log('fi',fi,file)
        //process.exit(1)
        let pat = path.resolve(fi)
        //console.log('path',pat)
        fi = pat

        let res = true
        if(FILES[fi]){
            res = false
        }

        Compile(fi,remdir)

        FFF.push([as, fi])

        if(!res){
            return ''
        }
        return 'include \''+fi.replace('source','cache').replace('.ts','.asm')+'\''
    })
    for(let FF of FFF){
        if(FILES[FF[1]].EXPORTS){
            for(let EXP of FILES[FF[1]].EXPORTS){
                //console.log('EXP',EXP)

                let name = 'F'+FILES[FF[1]].INDEX+'_'+EXP.name

                if(EXP.kind=='function'){
                    FILE.FUNCTIONS[name]=FILES[FF[1]].FUNCTIONS[name]
                    r(new RegExp('\\b'+FF[0]+'\\.('+EXP.name+')','gm'), name)
                }else if(EXP.kind=='class'){
                    FILE.CLASSES[name]=FILES[FF[1]].CLASSES[name]
                    r(new RegExp('\\b'+FF[0]+'\\.('+EXP.name+')','gm'), name)
                }else if(EXP.kind=='invoke'){
                    //FILE.CLASSES[name]=FILES[FF[1]].CLASSES[name]
                    r(new RegExp('\\b'+FF[0]+'\\.('+EXP.name+')','gm'), EXP.name)
                }else{
                    r(new RegExp('\\b'+FF[0]+'\\.('+EXP.name+')','gm'), name)
                }
            }
        }
    }



















    let names = []
    r(/let .*\:/gm,match=>{
        let name = match.split(':')[0].replace('let','').trim()
        names.push(name)
        return match
    })
    r(/function .*\(/gm,match=>{
        let name = match.split('(')[0].replace('function','').trim()
        names.push(name)
        return match
    })
    r(/class .*\:/gm,match=>{
        let name = match.split(':')[0].replace('class','').trim()
        names.push(name)
        return match
    })
    for(const name of names){
        r(new RegExp('\\b('+name+')\\b','gm'),'F'+FILE.INDEX+'_$1')
    }
    //FILE.EXPORT = names


    //r(/\'/gm,'"')



    //r(/(.*) \= (wglGetProcAddress\(\".*\"\);)/gm,'invoke $2\nmov $1,rax')

    //r(/(.*) = (gl[a-zA-Z0-9\_]+)\(\)/gm,'invoke $2\nmov $1, rax')
    //r(/(.*) = (gl[a-zA-Z0-9\_]+)\((.*)\)/gm,'invoke $2, $3\nmov $1, rax')

    //r(/(gl[a-zA-Z0-9\_]+)\(\)/gm,'invoke $1')
    //r(/(gl[a-zA-Z0-9\_]+)\((.*)\)/gm,'invoke $1, $2')
    //r(/(gl[a-zA-Z0-9\_]+)\(\)/gm,'invoke $1')
    //r(/(gl[a-zA-Z0-9\_]+)\((.*)\)/gm,'invoke $1, $2')

    //r(/invoke winvoke /gm,'invoke w')




    var index = 0
    let indexInn = 0
    var parseMaths=(line,op,name,isInt=false)=>{
        let idx=0
        while(idx<16){
            const regex = new RegExp('^(.*\=.*\\ )([a-zA-Z\\_0-9\\.\\]\\]]+)[\\ ]+'+op+'[\\ ]+([a-zA-Z\\_0-9\\[\\]\\.]+)\\b(.*)','gm')
            //console.log('LINE',line)
            line=line.replace( regex, 
                match=>{
                    console.log('MATH', match)
                    var matched = regex.exec(match)
                    console.log('matched', matched)
                    indexInn++
                    if(!isInt){
                        return 'Macro_Math_'+name+' qword '+matched[2]+',qword '+matched[3]+',qword mth'+indexInn+'\n'+matched[1]+'mth'+indexInn+''+matched[4]
                    }else{
                        return 'Macro_iMath_'+name+' qword '+matched[2]+',qword '+matched[3]+',qword mth'+indexInn+'\n'+matched[1]+'mth'+indexInn+''+matched[4]
                    }
            })
            idx++
        }
        /*idx=0
        while(idx<16){
            const regex = new RegExp('(.*)= ([a-zA-Z\\_0-9\\[\\]\\.]+)[\\ ]+'+op+'[\\ ]+([a-zA-Z\\_0-9\\[\\]\\.]+)(.*)','gm')
            line=line.replace( regex, 
                match=>{
                    console.log('MATH', match)
                    var matched = regex.exec(match)
                    indexInn++
                    if(!isInt){
                        return 'Macro_Math_'+name+' qword '+matched[2]+',qword '+matched[4]+',qword [mth'+indexInn+']\n'+matched[1]+'[mth'+indexInn+']'+matched[5]
                    }else{
                        return 'Macro_iMath_'+name+' qword '+matched[2]+',qword '+matched[4]+',qword [mth'+indexInn+']\n'+matched[1]+'[mth'+indexInn+']'+matched[5]
                    }
            })
            idx++
        }*/
        return line

    }
    var lines=source.split('\n')
    lines=lines.map(line=>{
        let Int = line.indexOf('//int')>-1
        line=line.replace(/\/\/int/gm,'')

        indexInn = 0

        index = 0
        while(index<16){
            line=parseMaths(line,'\\*','pomnoz',Int)
            index++
        }
        index = 0
        while(index<16){
            line=parseMaths(line,'\\/','podziel',Int)
            index++
        }
        index = 0
        while(index<16){
            line=parseMaths(line,'\\+','dodaj',Int)
            index++
        }
        index = 0
        while(index<16){
            line=parseMaths(line,'\\-','odejmnij',Int)
            index++
        }
        return line
    })
    source=lines.join('\n')

    r(/(mth[0-9]+)/gm,'[$1]')




    r(/^(.*)\b([a-zA-Z0-9\_]+)\[([0-9]+)\]/gm,'mov rsi,$2\n$1 qword[rsi + $3*8]')

    r(/^(.*)\b([a-zA-Z0-9\_]+)\[([a-zA-Z0-9\_]+)\]/gm,'mov rsi,$2\nmov rdi,[$3]\n$1 qword[rsi + rdi*8]')

    


    
    r(/function(.*)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
        let locals = []
        match = match.replace(/let (.*)/gm,mmm=>{
            let name = mmm.split('=')[0].replace('let ','').trim().split(':')[0].trim()
            let value = mmm.split('=')[1].trim()
            locals.push({name,value})
            return ''
        })
        let pidx = 0
        console.log('locals',locals)
        for(let local of locals){
            pidx += 8
            match = match.replace(new RegExp('\\b'+local.name+'\\b','gm'),mmm=>{
                return 'qword [rbp - '+pidx+']'
            })
        }
        let name = match.split('(')[0].replace('function','').trim()
        FILE.FUNCTIONS[name] = {locals:Object.keys(locals).length}
        return match
    })

    





    r(/class(.*)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
        let name = match.split(':')[0].replace('class','').trim()
        let lines = match.split('\n')
        lines.splice(0,1)
        lines.splice(lines.length-1,1)
        let body = lines.join('\n')

        //console.log('body',body)

        let FUNCS = []
        const fnames = []
        body = body.replace(/(.*)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
            let fname = match.split('(')[0].trim()
            fnames.push(fname)
            match = 'function '+name+'_'+match.trim()
            match = match.replace(/\(/,'(this:'+name+',')
            match = match.replace(/\,\)/gm,')')
            //console.log('FUNC',match)
            FUNCS.push(match)
            return ``
        })

        //process.exit(1)

        let inOBJS = []

        let props2 = body.split('\n')
        let props = []
        props2.map(prop=>{
            if(prop.trim().length){
                let name = prop.split(':')[0].trim()
                let value = prop.split('=')[1].trim()
                let kind = prop.split(':')[1].split('=')[0].trim()
                if(['number','string'].includes(kind)){
                    props.push(`${name} dq ${value}`)
                }else{
                    props.push(`${name} ${kind}`)
                    inOBJS.push({name,obj:FILE.CLASSES[kind]})
                }
            }
        })

        FILE.CLASSES[name] = {name,props,objs:[],inOBJS,fnames}

        FUNCS = FUNCS.join('\n')

        for(const inOBJ of inOBJS){
            console.log('inOBJ',inOBJ)
            for(const FN of inOBJ.obj.fnames){
                FUNCS=FUNCS.replace(new RegExp('this\\.'+inOBJ.name+'\\.'+FN+'\\(','gm'),
                    'mov r12,[rsp + 8]\n'+
                    'lea r13,[r12 + '+name+'.'+inOBJ.name+']\n'+
                    inOBJ.obj.name+'_'+FN+'(r13,')
            }
            //process.exit(1)
        }

        return `struct ${name}
        ${props.join('\n')}
    ends
    ${FUNCS}`
    })

    r(/let .* \= new .*\(\)/gm,match=>{
        let name = match.split(' ')[1].trim().split(':')[0]
        let kind = match.split(' ')[4].split('(')[0].trim()
        let value = null
        console.log({name,kind,value,isObj:true})
        DATA.push({name,kind,value,isObj:true})
        FILE.CLASSES[kind].objs.push(name)
        return ''
    })

    r(/let .* \= \'.*\'/gm,match=>{
        let name = match.split('=')[0].replace('let','').trim().split(':')[0]
        let value = match.split('=')[1].trim().replace(/\'|\"/gm,'')
        DATA.push({name,kind:'db',value})
        return ''
    })
    r(/let .* \= .*/gm,match=>{
        let name = match.split('=')[0].replace('let','').trim().split(':')[0]
        let value = match.split('=')[1].replace(/\[|\]/gm,'').trim()
        DATA.push({name,kind:'dq',value})
        return ''
    })



    //todo: CLASS.objs - funkcje starty
    for(const CLASSname of Object.keys(FILE.CLASSES)){
        let CLASS = FILE.CLASSES[CLASSname]
        for(const OBJ of CLASS.objs){
            r(new RegExp('\\b'+OBJ+'\\.(.*)\\(','gm'),CLASSname+'_$1('+OBJ+',')
        }
    }
    r(/\,\)/gm,')')


    r(/(.*) = (.*)\((.*)/gm,'$2($3\nmov $1, rax')





    //function inner replacements
    let whileIndex = 0
    let _IFidx = 0
    let blockIndex = 6675
    let forIdx = 0
    r(/function(.*)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{

        var LOCAL = ''

        //FOR
        match = match.replace(/\bfor([\s\S]+?)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
            var head=match.split('(')[1].split(')')[0].trim().split(';')
            var body=match.split('{')[1]
            body=body.substring(0,body.length-6)
            blockIndex++
            //let prefix = ''
            if((head[0].indexOf('let')>-1)||(head[0].indexOf('var')>-1)){
                let name = head[0].split('=')[0].replace('var','').replace('let','').trim()
                let value = head[0].split('=')[1].trim()
                forIdx++
                LOCAL+='LOCAL '+name+forIdx+' :qword\n'
                head[0] = ''+name+forIdx+' = '+value
                head[1]=head[1].replace(new RegExp(name,'gm'),name+forIdx)
                head[2]=head[2].replace(new RegExp(name,'gm'),name+forIdx)
                body=body.replace(new RegExp(name,'gm'),name+forIdx)
            }
            return `${head[0]}
            while(${head[1]}):${blockIndex}{
                ${head[2]}
                ${body}
            :${blockIndex}}`
        })

        //while
        match = match.replace(/while([\s\S]+?)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
            var head=match.split('(')[1].split(')')[0].trim()
            var body2=match.split('{')[1]
            body2=body2.substring(0,body2.length-6)
            whileIndex++
            blockIndex++
            return `.while${whileIndex}:
            ${body2}
            if(${head}):${blockIndex}{
                jmp .while${whileIndex}
            :${blockIndex}}`
        })

        //if
        var __IF=(oper,var1,var2)=>{
            var regexpr=new RegExp('if\\(([\\w]+)['+oper+']+([\\w]+)\\)(?<num>\\:[0-9]+)\\{([\\s\\S]+?)(\\k<num>)\\}else(?<num2>\\:[0-9]+)\\{([\\s\\S]+?)(\\k<num2>)\\}','gm')
            match=match.replace( regexpr, mmm=>{
                let parts = regexpr.exec(mmm)
                //console.log('parts',parts)
                var head = mmm.split('(')[1].split(')')[0]
                //console.log('oper',oper.replace(/\\/gm,''))
                var left = head.split(oper.replace(/\\/gm,''))[0]
                var right = head.split(oper.replace(/\\/gm,''))[1]
                //console.log('left,right',left,right)
                var body1 = parts[4]
                var body2 = parts[7]
                _IFidx++
                return 'mov rax, '+left+'\nmov rbx, '+right+'\ncmp rax, rbx\n'+var1+' .if'+_IFidx
                +'\n'+var2+' .else'+_IFidx+'\njmp .endif'+_IFidx+'\n.if'
                +_IFidx+':\n'+body1+'jmp .endif'+_IFidx+'\n.else'+_IFidx+':\n'+body2+'\n.endif'+_IFidx+':'
            })
            var regexpr=new RegExp('if\\(([\\w]+)'+oper+'([\\w]+)\\)(?<num>\\:[0-9]+)\\{([\\s\\S]+?)(\\k<num>)\\}','gm')
            match=match.replace( regexpr, mmm=>{
                _IFidx++
                var head = mmm.split('(')[1].split(')')[0]
                //console.log('oper',oper.replace(/\\/gm,''))
                var left = head.split(oper.replace(/\\/gm,''))[0]
                var right = head.split(oper.replace(/\\/gm,''))[1]
                //console.log('left,right',left,right)
                var body = mmm.split('{')[1]
                body=body.substring(0,body.length-6)
                _IFidx++
                return 'mov rax, '+left+'\nmov rbx, '+right+'\ncmp rax, rbx\n'+var1
                +' .if'+_IFidx+'\njmp .endif'+_IFidx+'\n.if'
                +_IFidx+':\n'+body+'\n.endif'+_IFidx+':'
            })
        }
        //__IF('\\=\\=\\=','je','jne')
        __IF('\\=\\=','je','jne')
        __IF('\\<','jl','jnl')
        __IF('\\!\\=','jne','je')
        __IF('\\>','jg','jng')

        //var
        match=match.replace( /(var|let|const) (.*)/gm, mmm=>{
            //console.log('mmm',mmm)
            var name = mmm.split('=')[0].replace('var','').replace('let','').replace('const','').split(':')[0].trim()
            var value = mmm.split('=')[1].trim()
            var type = 'QWORD'
            if((value.indexOf('\'')>-1)||(value.indexOf('"')>-1)){
                type = 'db'
                value += ',0'
            }
            LOCAL+='LOCAL '+name+' :'+type+'\n'
            return ''+name+' = '+value
        })


        /*var first = match.split('{')[0]
        var rest = match.split('{')
        rest[0]=first
        rest[1]='\n'+LOCAL+'\n'+rest[1]

        return rest.join('{')*/
        return match

    })

    r(/([a-zA-Z0-9\_\.]+)\+\+/gm,'inc $1')
    r(/([a-zA-Z0-9\_\.]+)\-\-/gm,'dec $1')







    r(/function([\s\S]+?)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
        let lines = match.split('\n')
        let header = lines[0]
        lines.splice(0,1)
        lines.splice(lines.length-1,1)
        let body = lines.join('\n')
        //console.log('hedaer',header)
        //console.log('body',body)
        let name = header.split('(')[0].replace('function','').trim()
        //console.log('name',name)
        let params = header.split('(')[1].split(')')[0].trim().split(',')
        if((params.length==1)&&(params[0]=='')){
            params = []
        }
        params=params.map(param=>{
            param = param.split(':')
            return {
                name: param[0],
                kind: param[1],
            }
        })
        //console.log('params',params)
        
        lines = body.split('\n')

            lines = lines.map(line=>{
                let pidx = 8
                let prefix = ''
                let idreg = 0

                for(const param of params){
                    pidx += 8
                    if(['number','string'].includes(param.kind)){
                        line = line.replace(new RegExp('\\b'+param.name+'\\b','gm'),mmm=>{
                            //prefix+='mov '+REG[idreg]+',[rbp + '+pidx+']\n'
                            //return REG[idreg++]
                            return '[rbp + '+pidx+']'
                        })
                    }else{
                        line = line.replace(new RegExp('\\b'+param.name+'\\.([a-zA-Z0-9\_]+)\\b','gm'),mmm=>{
                            let field = mmm.split('.')[1]
                            prefix+='mov '+REG[idreg++]+',[rbp + '+pidx+']\n'
                            //'mov '+REG[++idreg]+', ['+REG[idreg-1]+' + '+param.kind+'.'+field+']'
                            return '['+REG[idreg-1]+' + '+param.kind+'.'+field+']'//REG[idreg]
                        })
                    }
                }

                for(const CLASSname of Object.keys(FILE.CLASSES)){
                    let CLASS = FILE.CLASSES[CLASSname]
                for(const OBJ of CLASS.objs){
                    line = line.replace(new RegExp('\\b'+OBJ+'\\..*\\b','gm'),mmm=>{
                        let field = mmm.split('.')[1].trim()
                        prefix+=`   lea ${REG[idreg++]}, ${OBJ}
    mov ${REG[idreg]}, [${REG[idreg-1]} + ${CLASS.name}.${field}]`
                        return REG[idreg]
                    })
                }}


                return prefix+'\n'+line
            })

        body = lines.join('\n')

        //process.exit(1)

        if(FILE.FUNCTIONS[name]==undefined){
            FILE.FUNCTIONS[name] = {locals:0}
        }

        FILE.FUNCTIONS[name].params = params

        const locals = FILE.FUNCTIONS[name].locals

        console.log('LOCALS COUNT', locals)

        const offset = params.length + locals 

        return `${name}:
     push rbp
    mov rbp, rsp
    sub rsp, 8*${offset}

    ${body}
    
    mov rsp, rbp
    pop rbp
ret`
    })


    for(const INVOKE of INVOKERS){
        r(new RegExp('\\b('+INVOKE+')\\(\\)','gm'),'invoke $1')
        r(new RegExp('\\b('+INVOKE+')\\((.*)\\)','gm'),'invoke $1,$2')
    }

    for(const FUNC of Object.keys(FILE.FUNCTIONS)){
        r(new RegExp('\\b(.*)\\(\\)','gm'),'call $1')
        r(new RegExp('\\b(.*)\\((.*)\\)','gm'),match=>{
            let name = match.split('\(')[0].trim()
            let params = match.split('(')[1].split(')')[0].trim().split(',')
            params = params.map(param=>{
                return 'push '+param
            })
            let prms = []
            for(let idx=params.length-1;idx>=0;idx--){
                prms.push(params[idx])
            }
            let count = params.length

            //const locals = FILE.FUNCTIONS[name].locals
            //count += locals

            return `${prms.join('\n')}
    call ${name}
    add rsp, ${count*8}`
        })
        //r(new RegExp('\\b('+FUNC+')\\((.*)\\)',''),'call $1,$2')
    }


    for(const DTA of DATA){
        if(DTA.kind!='db'){
            r(new RegExp('\\b('+DTA.name+')\\b','gm'),'[$1]')
        }
    }
    for(const CLASSname of Object.keys(FILE.CLASSES)){
        let CLASS = FILE.CLASSES[CLASSname]
        for(const OBJ of CLASS.objs){
            r(new RegExp('push \\[('+OBJ+')\\]','gm'),'push $1')
        }
    }

    r(/\,\n/gm,'\n')


    r(/(.*) \= ([0-9\.\-]+)/gm,'mov $1, $2')
    r(/(.*) \= (.*)/gm,'mov r15, $2\nmov $1, r15')


    r(/\[\[([a-zA-Z0-9\_]+)\]/gm,'[$1')
    r(/\[([a-zA-Z0-9\_]+)\]\]/gm,'$1]')

    r(/\]\.([a-zA-Z0-9\_\.]+)/gm,'.$1]')

    r(/return (.*)/gm,'mov rax, $1')


    /*r(/invoke gl(.*)/gm,match=>{
        return match.replace(/\[|\]/gm,'')
    })*/

    r(/\@\@\=\@\@/gm, ' = ')


    r(/invoke \[([a-zA-Z0-9\_]+)\]/gm, 'invoke $1')

    r(/mov[\ ]*(qword\[.*\])\, ((\-?)[0-9]+\.[0-9]+)/gm,'mov rax,$2\nmov $1, rax')

    r(/qword[\ ]*qword/gm, 'qword')

    r(/\[qword \[([\S\s]+?)]\]/gm,'qword[$1]')




    let parts = file.split('/')
    if(parts.length>1){
        parts.splice(parts.length-1, 1)
        parts = './cache/'+parts.join('/')+'/'
        //console.log(parts)
        fs.mkdirSync(parts, { recursive: true })
    }


    fs.writeFileSync(file.replace('source','cache').replace('.ts','.asm'),source)

    return source
}





let file = process.argv[2]+'.ts'

let pat = path.resolve('source/'+file)
//console.log('path',pat)
file = pat

let code = Compile(file,'C:\\bTS\\source\\')

let data = []
for(const DTA of DATA){
    if(DTA.isObj){
        data.push(`${DTA.name} ${DTA.kind}`)
    }else{
        if(DTA.kind=='dq'){
            data.push(`${DTA.name} dq ${DTA.value}`)
        }else if(DTA.kind=='db'){
            data.push(`${DTA.name} db "${DTA.value}",0`)
        }
    }
}

let form = 'cmd.inc'
if(code.indexOf('renderSystem:')>-1){
    form = 'opengl.inc'
}

let frame = fs.readFileSync('./frame/'+form).toString()
frame = frame.replace('{{CODE}}',code)
frame = frame.replace('{{DATA}}',data.join('\n'))

fs.writeFileSync(file.replace('source','cache').replace('.ts','.asm'),frame)



const idataString = createIData()
fs.writeFileSync('./cache/idata.inc', idataString)