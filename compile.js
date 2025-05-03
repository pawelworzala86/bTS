const fs = require('fs')


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


function Compile(file){
    let source = fs.readFileSync('./source/'+file).toString()

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

    r(/\/\/.*/gm,'')
    r(/\/\*[\s\S]+?\*\//gm,'')


    



    r(/export declare function .*/,match=>{
        let name = match.split('(')[0].replace('export declare function','').trim()
        INVOKERS.push(name)
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


    let FFF = []
    r(/import .*/gm,match=>{
        let as = match.split(' ')[3]
        let fi = match.split(' ')[5].replace(/\'/gm,'').replace('./','')
        console.log('GGG',as,fi)

        Compile(fi)

        FFF.push([as, fi])

        return 'include \''+fi.replace('.ts','.asm')+'\''
    })
    for(let FF of FFF){
        if(FILES[FF[1]].EXPORTS){
            for(let EXP of FILES[FF[1]].EXPORTS){
                console.log('EXP',EXP)

                let name = 'F'+FILES['imp1.ts'].INDEX+'_'+EXP.name

                if(EXP.kind=='function'){
                    FILE.FUNCTIONS[name]=FILES[FF[1]].FUNCTIONS[name]
                    r(new RegExp('\\b'+FF[0]+'\\.('+EXP.name+')','gm'), name)
                }else if(EXP.kind=='class'){
                    FILE.CLASSES[name]=FILES[FF[1]].CLASSES[name]
                    r(new RegExp('\\b'+FF[0]+'\\.('+EXP.name+')','gm'), name)
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





    r(/class(.*)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
        let name = match.split(':')[0].replace('class','').trim()
        let lines = match.split('\n')
        lines.splice(0,1)
        lines.splice(lines.length-1,1)
        let body = lines.join('\n')

        //console.log('body',body)

        const FUNCS = []
        body = body.replace(/(.*)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
            match = 'function '+name+'_'+match.trim()
            match = match.replace(/\(/,'(this:'+name+',')
            match = match.replace(/\,\)/gm,')')
            //console.log('FUNC',match)
            FUNCS.push(match)
            return ``
        })

        //process.exit(1)

        let props2 = body.split('\n')
        let props = []
        props2.map(prop=>{
            if(prop.trim().length){
                let name = prop.split(':')[0].trim()
                let value = prop.split('=')[1].trim()
                props.push(`${name} dq ${value}`)
            }
        })

        FILE.CLASSES[name] = {name,props,objs:[]}

        return `struct ${name}
        ${props.join('\n')}
    ends
    ${FUNCS.join('\n')}`
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
        let value = match.split('=')[1].trim()
        DATA.push({name,kind:'db',value})
        return ''
    })
    r(/let .* \= .*/gm,match=>{
        let name = match.split('=')[0].replace('let','').trim().split(':')[0]
        let value = match.split('=')[1].trim()
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
                let pidx = 0
                let prefix = ''
                let idreg = 0

                for(const param of params){
                    pidx += 8
                    if(['number','string'].includes(param.kind)){
                        line = line.replace(new RegExp('\\b'+param.name+'\\b','gm'),mmm=>{
                            prefix+='mov '+REG[idreg]+',[rsp + '+pidx+']'
                            return REG[idreg++]
                        })
                    }else{
                        line = line.replace(new RegExp('\\b'+param.name+'\\.([a-zA-Z0-9\_]+)\\b','gm'),mmm=>{
                            let field = mmm.split('.')[1]
                            prefix+='mov '+REG[idreg++]+',[rsp + '+pidx+']\n'
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
        FILE.FUNCTIONS[name] = {params}

        return `${name}:
    ${body}
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
            let count = params.length
            return `${params.join('\n')}
    call ${name}
    add rsp, ${count*8}`
        })
        //r(new RegExp('\\b('+FUNC+')\\((.*)\\)',''),'call $1,$2')
    }


    for(const DTA of DATA){
        r(new RegExp('\\b('+DTA.name+')\\b','gm'),'[$1]')
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



    fs.writeFileSync('./cache/'+file.replace('.ts','.asm'),source)

    return source
}







let code = Compile('test.ts')

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

let frame = fs.readFileSync('./frame/cmd.inc').toString()
frame = frame.replace('{{CODE}}',code)
frame = frame.replace('{{DATA}}',data.join('\n'))

fs.writeFileSync('./cache/test.asm',frame)