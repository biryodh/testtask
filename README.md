1. executeNonDependentScripts() :
This method is used to check processes with 0 dependency. 

if No dependency is zero, it returns error other wise it returns array of process with no dependency.


2. executeProcess();
This method is used to sort the process starting with 0 dependency. It has additional paramater with takes pre executed processes. It assumes dependency of such process will never effect on other processes. 

Different test cases:
1. Process sorting order
2. Process sorting with missed script
3. Process with circular dependency


