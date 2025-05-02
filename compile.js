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


const REG = ['rax','rbx','rdx','rdi']
const INVOKERS = []


function Compile(source){
    const FILE = {
        FUNCTIONS: {},
    }

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
    r(/export .*/gm,'')




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
                line = line.replace(new RegExp('\\b'+param.name+'\\b','gm'),mmm=>{
                    prefix+='mov '+REG[idreg]+',[rsp + '+pidx+']'
                    return REG[idreg++]
                })
            }
            return prefix+'\n'+line
        })
        body = lines.join('\n')

        //process.exit(1)
        FILE.FUNCTIONS[name] = {params}

        return `${name}:
    ${body}
ret`
    })

    for(const FUNC of Object.keys(FILE.FUNCTIONS)){
        r(new RegExp('\\b('+FUNC+')\\(\\)','gm'),'call $1')
        r(new RegExp('\\b('+FUNC+')\\((.*)\\)','gm'),match=>{
            let params = match.split('(')[1].split(')')[0].trim().split(',')
            params = params.map(param=>{
                return 'push '+param
            })
            let count = params.length
            return `${params.join('\n')}
    call ${FUNC}
    add rsp, ${count*8}`
        })
        //r(new RegExp('\\b('+FUNC+')\\((.*)\\)',''),'call $1,$2')
    }


    for(const INVOKE of INVOKERS){
        r(new RegExp('\\b('+INVOKE+')\\(\\)','gm'),'invoke $1')
        r(new RegExp('\\b('+INVOKE+')\\((.*)\\)','gm'),'invoke $1,$2')
    }



    r(/\,\n/gm,'\n')

    return source
}





let code = fs.readFileSync('./source/test.ts').toString()

code = Compile(code)

let frame = fs.readFileSync('./frame/cmd.inc').toString()
frame = frame.replace('{{CODE}}',code)
frame = frame.replace('{{DATA}}','')

fs.writeFileSync('./cache/test.asm',frame)