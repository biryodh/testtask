export class VulnerabilityScript {

    private  scriptId: number;
    private  dependencies: number[];

    constructor(scriptId: number, dependencies: number[]) {
        this.scriptId = scriptId;
        this.dependencies = dependencies;
    }

    public getScriptId(): number {
        return this.scriptId;
    }

    public getDependencies(): number[] {
        return this.dependencies;
    }
}

function filterArray(vulnerabilityScripts:VulnerabilityScript[], Obj:VulnerabilityScript){
    let filteredArray:VulnerabilityScript[] = 
    vulnerabilityScripts.filter((script:VulnerabilityScript)=>script.getScriptId()!=Obj.getScriptId());
    return filteredArray;
}

export function executeNonDependentScripts(Scripts:VulnerabilityScript[]){
    let vScriptExecuted:number[]=[];
    for( let element of Scripts){
        if(element.getDependencies().length==0){
            vScriptExecuted.push(element.getScriptId());
            Scripts = filterArray(Scripts,element);
        }
    }
   
    if(vScriptExecuted.length === 0){
        throw 'error'
    }else{
        return vScriptExecuted;
    }

    
} 

export function executeProcess(vulnerabilityScripts:VulnerabilityScript[],vScriptExecuted:Number[]=[]){
    let processCount = vulnerabilityScripts.length;
    const vScripts :VulnerabilityScript[] = vulnerabilityScripts;
    const defaultExe:number = vScriptExecuted.length;
    const graph: Map<number, number[]>= new Map();


    while(processCount!=0){
        for(let script of vulnerabilityScripts){
            let executedCount:number = 0;

            if(!graph.has(script.getScriptId())){
                graph.set(script.getScriptId(),[]);
            }

            for(let item of script.getDependencies()){

                    if(!graph.has(item)){
                        graph.set(item,[]);
                    }

                    const index = vScriptExecuted.indexOf(item);

                    if(index !== -1 && item !== script.getScriptId()){
                        executedCount++
                        graph.get(item)!.push(script.getScriptId());
                    }else if(item === script.getScriptId()){
                        throw 'error: circular dependency '
                    }
            }

            if(executedCount===script.getDependencies().length){
                vScriptExecuted.push(script.getScriptId());

                if(graph.has(script.getScriptId())){
                   // console.log("here: deleted", script.getScriptId())
                    graph.delete(script.getScriptId());
                }

                vulnerabilityScripts = filterArray(vulnerabilityScripts,script);
            }
        }
    processCount--;
    }
    
    if((vScriptExecuted.length -defaultExe ) !== vScripts.length){
        throw 'error! script execution is missing'
    }

    return vScriptExecuted;
}