
import { executeProcess, VulnerabilityScript, executeNonDependentScripts } from "../src/sorting";

describe("Process function", () => {

 

  it("Check processes with 0 dependency: ", () => { 
    let vulnerabilityScripts:VulnerabilityScript[] = [
      new VulnerabilityScript(1,[2]),
      new VulnerabilityScript(2,[4,3]),
      new VulnerabilityScript(3,[5]),
      new VulnerabilityScript(4,[3]),
      new VulnerabilityScript(5,[]),
      new VulnerabilityScript(6,[]),
    ];

    expect(executeNonDependentScripts(vulnerabilityScripts)).toEqual([5,6])
    expect(executeNonDependentScripts(vulnerabilityScripts)).toContain(5)
    expect(executeNonDependentScripts(vulnerabilityScripts)).toContain(6)
  });

  it("Check processes with 0 dependency with error/missed script: ", () => { 
    let vulnerabilityScripts:VulnerabilityScript[] = [
      new VulnerabilityScript(1,[2]),
      new VulnerabilityScript(2,[4,3]),
      new VulnerabilityScript(3,[5]),
      new VulnerabilityScript(4,[3]),
      // new VulnerabilityScript(5,[]),
      // new VulnerabilityScript(6,[]),
    ];

    expect(()=>executeNonDependentScripts(vulnerabilityScripts)).toThrow("error")
  });

  // //---------------- Process execution method--------------
  it("Process sorting order: ", () => { 
    let vulnerabilityScripts:VulnerabilityScript[] = [
      new VulnerabilityScript(1,[2]),
      new VulnerabilityScript(2,[4,3]),
      new VulnerabilityScript(3,[5]),
      new VulnerabilityScript(4,[3]),
      new VulnerabilityScript(5,[]),
      new VulnerabilityScript(6,[]),
    ];

    expect(executeProcess(vulnerabilityScripts)).toEqual([5,6,3,4,2,1])
    
    
  });

  it("Process sorting with missed script", () => { 
    let vulnerabilityScripts:VulnerabilityScript[] = [
      new VulnerabilityScript(1,[2]),
      new VulnerabilityScript(2,[4,3]),
      new VulnerabilityScript(3,[5]),
      new VulnerabilityScript(4,[3]),
      // new VulnerabilityScript(5,[]),
      // new VulnerabilityScript(6,[]),
    ];

   //expect(executeProcess(vulnerabilityScripts)).toEqual([3,4,2,1])
   //script is missing 
   expect(()=>executeProcess(vulnerabilityScripts)).toThrow(/error/)
    
  });

  it("Process with circular dependency ", () => { 
    let vulnerabilityScripts:VulnerabilityScript[] = [
      new VulnerabilityScript(1,[2]),
      new VulnerabilityScript(2,[4,3,2]),
      new VulnerabilityScript(3,[5]),
      new VulnerabilityScript(4,[3]),
      new VulnerabilityScript(5,[]),
      new VulnerabilityScript(6,[]),
    ];

  //expect(executeProcess(vulnerabilityScripts)).toEqual([5,6,3,4,2,1])
   
  expect(()=>executeProcess(vulnerabilityScripts)).toThrow(/error/)
    
    
  });


  



});

