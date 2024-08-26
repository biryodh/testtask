type ScriptId = number;

interface Script {
    scriptId: ScriptId;
    dependencies: ScriptId[];
}

export function getCount(scripts: Script[]):Map<ScriptId,number>{
    const temp: Map<ScriptId,number> = new Map();
    return temp;
}

export function processOrder(scripts: Script[]):ScriptId[]{
    const graph: Map<ScriptId, ScriptId[]>= new Map();
    const exeCount: Map<ScriptId,number> = new Map();
    const queue:ScriptId[]=[];
    const results:ScriptId[]=[];


    for(const script of scripts ){
        if(!graph.has(script.scriptId)){
            graph.set(script.scriptId,[]);
        }
        exeCount.set(script.scriptId,0);
    }

    for (const script of scripts){
        for (const dep of script.dependencies){
            if(!graph.has(dep)){
                graph.set(dep,[]);
            }
            graph.get(dep)!.push(script.scriptId);
            exeCount.set(script.scriptId, (exeCount.get(script.scriptId)??0)+1)
        }
    }

    // console.log("graph",graph)
    // console.log("exeCount",exeCount)
    // console.log("queue:", queue)

    for(const [script, length] of exeCount){
        if(length == 0){
            queue.push(script);
        }
    }

    while(queue.length>0){
        const id = queue.shift()!;
        results.push(id);

        for (const neighbor of graph.get(id)!) {
            exeCount.set(neighbor, exeCount.get(neighbor)! - 1);
            if (exeCount.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }

    }

    return results;
}
