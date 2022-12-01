import { myFabricDrawingModule } from "./fabricDrawingModule";
import * as myDataModelStructures from "./dataModelStructures";

console.log("[DEBUG] Initialzing Fabric");
var myDrawingModule = new myFabricDrawingModule('myCanvas');

//Example stackframe
let testStackFrame = new myDataModelStructures.myStackFrame();
//Function name
testStackFrame.functionName = "TestFunction";
//Function variables
let testVar1 = new myDataModelStructures.myVariable();
testVar1.variableName = "testVar1";
testVar1.dataTypeString = "bool";
let testVar2 = new myDataModelStructures.myVariable();
testVar2.variableName = "testVar2";
testVar2.dataTypeString = "int";
let testVar3 = new myDataModelStructures.myVariable();
testVar3.variableName = "testVar3";
testVar3.dataTypeString = "float";
testStackFrame.functionVariables = new Array<myDataModelStructures.myVariable>();
testStackFrame.functionVariables.push(testVar1);
testStackFrame.functionVariables.push(testVar2);
testStackFrame.functionVariables.push(testVar3);
//Function return address
testStackFrame.returnAddress = "testReturnAddress";
//Function parameters
let testParam1 = new myDataModelStructures.myVariable();
testParam1.variableName = "testParam1";
testParam1.dataTypeString = "int";
let testParam2 = new myDataModelStructures.myVariable();
testParam2.dataTypeString = "double";
testStackFrame.functionParameters = new Array<myDataModelStructures.myVariable>();
testStackFrame.functionParameters.push(testParam1);
testStackFrame.functionParameters.push(testParam2);

console.log("[DEBUG] Drawing the testing stackframe");
myDrawingModule.drawStackFrame(testStackFrame);