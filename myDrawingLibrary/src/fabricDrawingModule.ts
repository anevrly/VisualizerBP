import { fabric } from "fabric";
import * as DataModelStructures from "./dataModelStructures";

interface Widget {
    canvas: CustomCanvas;
    dataModelObject:    DataModelStructures.Array
                    | DataModelStructures.DataType
                    | DataModelStructures.Memory
                    | DataModelStructures.ProgramStack 
                    | DataModelStructures.StackFrame 
                    | DataModelStructures.Struct 
                    | DataModelStructures.Variable;
    fabricObject: fabric.Group; //Maybe "| fabric.Object" can be added - depending on usage
    startPos: {x: number, y: number};
    children: Array<Widget>;
    get width(): number | undefined;
    get height(): number | undefined;

    draw(): void;
}

class StringWidget implements Widget {
    canvas: CustomCanvas;
    dataModelObject: DataModelStructures.Variable;
    fabricObject: fabric.Group;
    startPos: {x: number, y: number};
    children: Array<Widget>;

    constructor(variableToDraw: DataModelStructures.Variable, drawToCanvas: CustomCanvas, setStartPosX = 10, setStartPosY = 10) {
        this.canvas = drawToCanvas;
        this.dataModelObject = variableToDraw;
        this.fabricObject = new fabric.Group();
        this.startPos = {x: setStartPosX, y: setStartPosY};
        this.children = new Array<Widget>();
    }

    get width(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].x - coords[1].x;
    }

    get height(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].y - coords[3].y;
    }

    draw()
    {
        //Checking if the variable is really a string
        if (this.dataModelObject.dataTypeString != "string")
            return;

        //Default values
        let textFill = "black";

        //Drawing the slot's text
        let finalString = this.dataModelObject.variableName + " : \"" + this.dataModelObject.valueString + "\"";
        let fabricSlotText = new fabric.Text(finalString, {
            left: this.startPos.x,
            top: this.startPos.y,
            fill: textFill,
            fontSize: 20
        });

        //Creating the result
        this.fabricObject = new fabric.Group([fabricSlotText]);

        //Adding the result group to the canvas
        this.canvas.add(this.fabricObject);

        //Locking the movement of the items
        this.canvas.lockAllItems();
    }
}

class CharWidget implements Widget {
    canvas: CustomCanvas;
    dataModelObject: DataModelStructures.Variable;
    fabricObject: fabric.Group;
    startPos: {x: number, y: number};
    children: Array<Widget>;

    constructor(variableToDraw: DataModelStructures.Variable, drawToCanvas: CustomCanvas, setStartPosX = 10, setStartPosY = 10) {
        this.canvas = drawToCanvas;
        this.dataModelObject = variableToDraw;
        this.fabricObject = new fabric.Group();
        this.startPos = {x: setStartPosX, y: setStartPosY};
        this.children = new Array<Widget>();
    }

    get width(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].x - coords[1].x;
    }

    get height(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].y - coords[3].y;
    }

    draw() {
        //Checking if the variable is really a char
        if (this.dataModelObject.dataTypeString != "char")
            return;
    
        //Default values
        let textFill = "black";
    
        //Drawing the slot's text
        let finalString = this.dataModelObject.variableName + " : \'" + this.dataModelObject.valueString + "\'";
        let fabricSlotText = new fabric.Text(finalString, {
            left: this.startPos.x,
            top: this.startPos.y,
            fill: textFill,
            fontSize: 20
        });
    
        //Creating the result
        this.fabricObject = new fabric.Group([fabricSlotText]);
    
        //Adding the result group to the canvas
        this.canvas.add(this.fabricObject);
    
        //Locking the movement of the items
        this.canvas.lockAllItems();
    }
}

class NumberWidget implements Widget {
    canvas: CustomCanvas;
    dataModelObject: DataModelStructures.Variable;
    fabricObject: fabric.Group;
    startPos: {x: number, y: number};
    children: Array<Widget>;

    constructor(variableToDraw: DataModelStructures.Variable, drawToCanvas: CustomCanvas, setStartPosX = 10, setStartPosY = 10) {
        this.canvas = drawToCanvas;
        this.dataModelObject = variableToDraw;
        this.fabricObject = new fabric.Group();
        this.startPos = {x: setStartPosX, y: setStartPosY};
        this.children = new Array<Widget>();
    }

    get width(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].x - coords[1].x;
    }

    get height(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].y - coords[3].y;
    }

    draw() {
        //Checking if the variable is really a number
        if (this.dataModelObject.dataTypeString != "number" &&
            this.dataModelObject.dataTypeString != "int" &&
            this.dataModelObject.dataTypeString != "float")
            return;

        //Default values
        let textFill = "black";

        //Drawing the slot's text
        let finalString = this.dataModelObject.variableName + " : " + this.dataModelObject.valueString;
        let fabricSlotText = new fabric.Text(finalString, {
            left: this.startPos.x,
            top: this.startPos.y,
            fill: textFill,
            fontSize: 20
        });

        //Creating the result
        this.fabricObject = new fabric.Group([fabricSlotText]);

        //Adding the result group to the canvas
        this.canvas.add(this.fabricObject);

        //Locking the movement of the items
        this.canvas.lockAllItems();
    }
}

class BooleanWidget implements Widget {
    canvas: CustomCanvas;
    dataModelObject: DataModelStructures.Variable;
    fabricObject: fabric.Group;
    startPos: {x: number, y: number};
    children: Array<Widget>;

    constructor(variableToDraw: DataModelStructures.Variable, drawToCanvas: CustomCanvas, setStartPosX = 10, setStartPosY = 10) {
        this.canvas = drawToCanvas;
        this.dataModelObject = variableToDraw;
        this.fabricObject = new fabric.Group();
        this.startPos = {x: setStartPosX, y: setStartPosY};
        this.children = new Array<Widget>();
    }

    get width(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].x - coords[1].x;
    }

    get height(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].y - coords[3].y;
    }

    draw() {
        //Checking if the variable is really a number
        if (this.dataModelObject.dataTypeString != "bool" &&
            this.dataModelObject.dataTypeString != "boolean")
            return;

        //Default values
        let textFill = "black";

        //Drawing the slot's text
        let tempValueString = this.dataModelObject.valueString = "1" ? "true" : "false";
        let finalString = this.dataModelObject.variableName + " : " + tempValueString;
        let fabricSlotText = new fabric.Text(finalString, {
            left: this.startPos.x,
            top: this.startPos.y,
            fill: textFill,
            fontSize: 20
        });

        //Creating the result
        this.fabricObject = new fabric.Group([fabricSlotText]);

        //Adding the result group to the canvas
        this.canvas.add(this.fabricObject);

        //Locking the movement of the items
        this.canvas.lockAllItems();
    }
}

//Class to limit number of variables needed for the StackframeSlotWidget constructor call
class StackframeSlotWidgetConfig {
    slotWidth: number;
    slotHeight: number;
    slotColor: string;
    textColor: string;
    textFontSize: number;
    textLeftOffset: number;
    textRightOffset: number;
    shortenText: boolean;
}

class StackframeSlotWidget implements Widget {
    canvas: CustomCanvas;
    dataModelObject: DataModelStructures.Variable | DataModelStructures.StackFrame;
    fabricObject: fabric.Group;
    startPos: {x: number, y: number};
    children: Array<Widget>;
    //Added variables specific for a stackframe slot widget
    slotConfig: StackframeSlotWidgetConfig;

    constructor(objectToDraw: DataModelStructures.Variable | DataModelStructures.StackFrame, drawToCanvas: CustomCanvas, setStartPosX = 10, setStartPosY = 10, setConfig: StackframeSlotWidgetConfig) {
        this.canvas = drawToCanvas;
        this.dataModelObject = objectToDraw;
        this.fabricObject = new fabric.Group();
        this.startPos = {x: setStartPosX, y: setStartPosY};
        this.children = new Array<Widget>();
        //Added variables specific for a stackframe slot widget
        this.slotConfig = setConfig;
    }

    get width(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].x - coords[1].x;
    }

    get height(): number | undefined {
        let coords = this.fabricObject.getCoords(true); //Getting the group's coordinates in absolute value

        return coords[0].y - coords[3].y;
    }

    draw() {
        //Drawing the slot's background
        let fabricSlotBackground = new fabric.Rect({
            left: this.startPos.x,
            top: this.startPos.y,
            width: this.slotConfig.slotWidth,
            height: this.slotConfig.slotHeight,
            fill: this.slotConfig.slotColor,

            //Default values
            padding: this.slotConfig.textFontSize / 2.5,
            stroke: "#000000",
            strokeWidth: this.slotConfig.textFontSize / 10
        });
        //Drawing the slot's text
        let slotText = "";
        if(this.dataModelObject instanceof DataModelStructures.StackFrame)
        {
            slotText = this.dataModelObject.functionName;
        }
        else
        {
            slotText = this.dataModelObject.variableName + ": " + this.dataModelObject.dataTypeString + " (" + this.dataModelObject.valueString + ")";
        }
        let fabricSlotText = new fabric.Text(slotText, {
            left: this.startPos.x + this.slotConfig.textLeftOffset,
            top: this.startPos.y - 2 + (this.slotConfig.slotHeight - this.slotConfig.textFontSize) / 2,
            fill: this.slotConfig.textColor,
            fontSize: this.slotConfig.textFontSize
        });

        if (this.slotConfig.shortenText) {
            //Checking if the text is longer than maximum
            let maxTextLength = this.slotConfig.slotWidth - this.slotConfig.textLeftOffset - this.slotConfig.textRightOffset;
            if(fabricSlotText.getScaledWidth() > maxTextLength) {
                //Calculating how much to shorten the text
                let averageCharLength = fabricSlotText.getScaledWidth() / slotText.length;
                let overflowInWidth = fabricSlotText.getScaledWidth() - maxTextLength;
                let overflowInChars = overflowInWidth / averageCharLength + 1;  //+1 to account for the space of "..."
                let newSlotText = slotText.substring(0, slotText.length - 1 - overflowInChars) + "...";

                //Making a shortened version of the text
                fabricSlotText = new fabric.Text(newSlotText, {
                    left: this.startPos.x + this.slotConfig.textLeftOffset,
                    top: this.startPos.y - 2 + (this.slotConfig.slotHeight - this.slotConfig.textFontSize) / 2,
                    fill: this.slotConfig.textColor,
                    fontSize: this.slotConfig.textFontSize
                });
            }
        }

        //Creating the result
        this.fabricObject = new fabric.Group([fabricSlotBackground, fabricSlotText]);

        //TODO: DELETE - will be handled by the stackframe widget
        //Moving the starting position for the next stackframe
        //startPosY += stackSlotHeight;

        //Adding the group to the canvas
        this.canvas.add(this.fabricObject);

        //Locking the movement of the items
        this.canvas.lockAllItems();
    }
}

class CustomCanvas extends fabric.Canvas {
    lockAllItems()
    {
        let allFabricItems = this.getObjects();

        allFabricItems.forEach(fabricObject => {
            fabricObject.selectable = false;
            fabricObject.hoverCursor = "default";
            fabricObject.evented = true;
        });
    }

    clearCanvas() {
        console.log("[DEBUG] Clearing the canvas");
        this.clear();
    }
}

export class FabricDrawingModule {
    canvas: CustomCanvas;
    cachedObjectColor: string;
    cachedPointeeObject: [fabric.Object, string];   //[backgroundRectangleObject, previousColor]
    cachedPointerArrowObject : fabric.Object | undefined;   //Fabric object representing the arrow between variables (presuming there is only one arrow object temporarily present)
    cachedPointers: Array<[any, any]>;              //in a [pointerVariable, pointingTo] format
    cachedDrawProgramStackArguments?: [DataModelStructures.ProgramStack, number, number, number?];

    constructor(canvasName: string) {
        this.canvas = new CustomCanvas(canvasName);
        //To have it a bit larger (not yet exact sizing)
        //TODO: Think the sizing through and adjust accordingly
        this.canvas.setWidth(screen.width);
        this.canvas.setHeight(screen.height);
        this.cachedObjectColor = "";
        this.cachedPointeeObject = [new fabric.Object, ""];
        this.cachedPointerArrowObject = undefined;
        this.cachedPointers = new Array<[any, any]>();
        this.cachedDrawProgramStackArguments = undefined;

        this.initPanning();
        this.initZooming();
        this.initHoverOver();
    }

    initPanning() {
        let drawingModuleThis = this;

        this.canvas.on('mouse:down', function (opt) {
            //Checking if the desired action was just to click (and not drag)
            if(opt.target !== undefined && opt.target !== null)
            {
                //If we clicked on an object (stackframe slot)
                if(opt.target instanceof fabric.Group)
                {
                    let hoveredOverObjectText;
                    if(opt.target._objects[1] instanceof fabric.Text)
                        hoveredOverObjectText = opt.target._objects[1].text;
                    //If the clicked on object is a stackFrame header (function name without ":")
                    if (!hoveredOverObjectText.includes(":")) {
                        //Set the corresponding stackframe as collapsed / uncollapsed
                        if (drawingModuleThis.cachedDrawProgramStackArguments != undefined && drawingModuleThis.cachedDrawProgramStackArguments != null)
                        {
                            for (let key in drawingModuleThis.cachedDrawProgramStackArguments[0].stackFrames) {
                                let value = drawingModuleThis.cachedDrawProgramStackArguments[0].stackFrames[key];
                                
                                if (value != null)
                                {
                                    if (value.functionName == hoveredOverObjectText)
                                    {
                                        value.isCollapsed = !value.isCollapsed;
                                    }
                                }
                            }
                            //Redraw the canvas
                            drawingModuleThis.canvas.clearCanvas();
                            drawingModuleThis.drawProgramStack(...drawingModuleThis.cachedDrawProgramStackArguments);
                        }
                    }
                    //Preventing the mouse going to selection mode and returning (to skip the dragging logic)
                    this.selection = false;
                    return;
                }
            }

            //Author: Unknown (Fabric.js)
            //Date: 15.10.2022
            //Availability: http://fabricjs.com/fabric-intro-part-5
            //Citation start
            //Handling the dragging behavior
            var evt = opt.e;

            this.isDragging = true;
            this.selection = false;
            this.lastPosX = evt.clientX;
            this.lastPosY = evt.clientY;
        });
        this.canvas.on('mouse:move', function (opt) {
            if (this.isDragging) {
                var e = opt.e;
                var vpt = this.viewportTransform;
                vpt[4] += e.clientX - this.lastPosX;
                vpt[5] += e.clientY - this.lastPosY;
                this.requestRenderAll();
                this.lastPosX = e.clientX;
                this.lastPosY = e.clientY;
            }
        });
        this.canvas.on('mouse:up', function (opt) {
            // on mouse up we want to recalculate new interaction
            // for all objects, so we call setViewportTransform
            this.setViewportTransform(this.viewportTransform);
            this.isDragging = false;
        });
        //Citation end
    }

    initZooming() {
        //Author: Unknown (Fabric.js)
        //Date: 15.10.2022
        //Availability: http://fabricjs.com/fabric-intro-part-5
        //Citation start
        this.canvas.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var zoom = this.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            this.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
        });
        //Citation end
    }

    initHoverOver() {
        const requestRenderAll = this.canvas.requestRenderAll.bind(this.canvas);
        const calculateNewHex = this.calculateLighterDarkerHex;
        const markPointee = this.markPointee.bind(this);
        let drawingModuleThis = this;

        this.canvas.on('mouse:over', function(opt) {
            console.log("[DEBUG] mouse:over event - target: " + opt.target);
            if(!this.isDragging)
            {
                if(opt.target !== undefined && opt.target !== null)
                {
                    if(opt.target instanceof fabric.Group)
                    {
                        //Changing the color of the variable (over which we're hovering)
                        let previousObjectColor = opt.target._objects[0].get('fill')?.toString();
                        if (previousObjectColor != undefined)
                            drawingModuleThis.setObjectColor(opt.target, calculateNewHex(previousObjectColor, -20), true, false);
                        else
                            console.log("[DEBUG] Error - previousObjectColor was undefined");
    
                        //Checking if the hovered over variable is a pointer
                        if(drawingModuleThis.cachedPointers != undefined)
                        {
                            for (let i = 0; i < drawingModuleThis.cachedPointers.length; i++)
                            {
                                if("text" in opt.target._objects[1])
                                {
                                    let hoveredOverVariableText;
                                    if(opt.target._objects[1] instanceof fabric.Text)
                                        hoveredOverVariableText = opt.target._objects[1].text;
                                    let searchedForText = drawingModuleThis.cachedPointers[i][0] + ":";
        
                                    console.log("[DEBUG] Hovering over: \"" + hoveredOverVariableText + "\", searching for: \"" + searchedForText + "\"");
                                    //If the hovered over variable is of pointer type
                                    if (hoveredOverVariableText.includes(searchedForText)) {
                                        markPointee(drawingModuleThis.cachedPointers[i][1]);
                                        
                                        let fromVariableObject = drawingModuleThis.findObjectByText(hoveredOverVariableText);
                                        let toVariableObject = drawingModuleThis.findObjectByText(drawingModuleThis.cachedPointers[i][1]);
                                        if (fromVariableObject == undefined || toVariableObject == undefined)
                                            console.log("[DEBUG] Error - FROM variable or TO variable are undefined");
                                        else
                                            drawingModuleThis.drawArrowBetweenVariables(fromVariableObject, toVariableObject);
                                    }
                                }
                            }
                        }
                        requestRenderAll();
                    }
                }
            }
        });
        
        this.canvas.on('mouse:out', function(opt) {
            console.log("[DEBUG] mouse:out event - target: " + opt.target);
            if(!this.isDragging)
            {
                if(opt.target !== undefined && opt.target !== null)
                {
                    if(opt.target instanceof fabric.Group)
                    {
                        drawingModuleThis.setObjectColor(opt.target, drawingModuleThis.cachedObjectColor, false, true);
    
                        //Resetting the state of the pointee variable (if changed)
                        if (drawingModuleThis.cachedPointeeObject[1] !== "")
                        {
                            //Resetting the pointee's previous color
                            drawingModuleThis.cachedPointeeObject[0].set("fill", drawingModuleThis.cachedPointeeObject[1]);
                            //Clearing the cached pointee
                            drawingModuleThis.cachedPointeeObject[0] = new fabric.Object();
                            drawingModuleThis.cachedPointeeObject[1] = "";

                            //Deleting the arrow object from canvas (if present)
                            if(drawingModuleThis.cachedPointerArrowObject != undefined)
                            {
                                drawingModuleThis.canvas.remove(drawingModuleThis.cachedPointerArrowObject);
                                drawingModuleThis.cachedPointerArrowObject = undefined;
                            }
                        }
                        requestRenderAll();
                    }
                }
            }
        });
    }

    //Helper function to return the object with the searched for text
    findObjectByText(searchedForText : string) : fabric.Object | undefined {
        let allCanvasObjects = this.canvas.getObjects();
        for (let i = 0; i < allCanvasObjects.length; i++)
        {
            let currentObject = allCanvasObjects[i];
            //If the canvas object is a group
            if(currentObject instanceof fabric.Group)
            {
                if(currentObject._objects[1] instanceof fabric.Text)
                {
                    console.log("[DEBUG] Testing if \"" + currentObject._objects[1].text + "\" matches \"" + searchedForText + "\"");
                    //If the text object's text matches the searched for value
                    if (currentObject._objects[1].text != undefined && currentObject._objects[1].text.includes(searchedForText))
                    {
                        console.log("[DEBUG] Text match found!");
                        return currentObject;
                    }
                    else
                    {
                        console.log("[DEBUG] Error - currentObject._objects[1].text was undefined");
                    }
                }
                else
                {
                    console.log("[DEBUG] Error - currentObject doesn't contain text (not at the [1] position)");
                }
            }
        }
        console.log("[DEBUG] Text match not found!");
        return undefined;
    }

    //Helper function to change a color of an object (stack slot) - after the change, there must be a call to "requestRenderAll()" afterwards
    setObjectColor(affectedObject : fabric.Object, newObjectColor : string, savePreviousColor : boolean, clearColorCache : boolean) {
        if(affectedObject !== undefined && affectedObject !== null)
        {
            if(affectedObject instanceof fabric.Group)
            {
                if(newObjectColor != "")
                {
                    if(savePreviousColor && clearColorCache)
                    {
                        console.log("[DEBUG] Error - tried to save previous color and clear cache at the same time");
                    }
                    else if(savePreviousColor)
                    {
                        let previousObjectColor = affectedObject._objects[0].get("fill")?.toString(); 
                        if(previousObjectColor != undefined)
                            this.cachedObjectColor = previousObjectColor;
                    }
                    else if(clearColorCache)
                    {
                        this.cachedObjectColor = "";
                    }

                    if(affectedObject._objects[1] instanceof fabric.Text)
                        console.log("[DEBUG] Setting \"" + affectedObject._objects[1].text + "\" to color \"" + newObjectColor + "\"");
                    else
                        console.log("[DEBUG] Error - affectedObject doesn't contain text (not at the [1] position)");
                    
                    affectedObject._objects[0].set('fill', newObjectColor);
                }
                else
                {
                    if(affectedObject._objects[1] instanceof fabric.Text)
                        console.log("[DEBUG] Error - tried to set \"" + affectedObject._objects[1].text + "to empty color");
                    else
                        console.log("[DEBUG] Error - affectedObject doesn't contain text (not at the [1] position)");
                }
            }
        }
    }

    //Helper function (for mouse:over events, etc.)
    calculateLighterDarkerHex(inputHex : string, percentage : number) : string {
        //Parsing the rbg values
        const r = parseInt(inputHex.substring(1, 3), 16);
        const g = parseInt(inputHex.substring(3, 5), 16);
        const b = parseInt(inputHex.substring(5, 7), 16);

        //Helper function to keep values between bounds
        function clamp(value: number, min: number, max: number): number {
            return Math.min(Math.max(value, min), max);
        }
        
        const clampedPercentage = clamp(percentage, -100, 100);         //Percentage by which to lighten / darken the color
        const offset = Math.round((clampedPercentage / 100) * 255);     //Calculated offset which will be added

        const newR = clamp(r + offset, 0, 255);
        const newG = clamp(g + offset, 0, 255);
        const newB = clamp(b + offset, 0, 255);
        
        //Helper function to convert decimal values back to a two-digit hex
        function toTwoDigitHex(value: number): string {
            const hex = value.toString(16);
            return hex.length === 1 ? `0${hex}` : hex;
        }

        return "#" + toTwoDigitHex(newR) + toTwoDigitHex(newG) + toTwoDigitHex(newB);
    }

    //Helper function used to calculate max text width in a provided program stack (used to determine neccessary slot width)
    calculateMaxTextWidth(programStackToDraw: DataModelStructures.ProgramStack, textFontSize : number) : number {
        let maxTotalTextWidth = 0;
        let allVariableTexts = new Array<string>();
        
        //Going through all stackframes present (and noting their parameter's and variable's text)
        for (let stackFrameKey in programStackToDraw.stackFrames) {
            let currentStackFrame = programStackToDraw.stackFrames[stackFrameKey];
            
            if (currentStackFrame != null) {
                //Going through function parameters
                for (let functionParameterKey in currentStackFrame.functionParameters) {
                    let currentFunctionParameter = currentStackFrame.functionParameters[functionParameterKey];
                    if (currentFunctionParameter != null) {
                        let variableText = currentFunctionParameter.variableName + ": " + currentFunctionParameter.dataTypeString + " (" + currentFunctionParameter.valueString + ")";
                        allVariableTexts.push(variableText);
                    }
                }

                //Going through function variables
                for (let functionVariableKey in currentStackFrame.functionVariables) {
                    let currentFunctionVariable = currentStackFrame.functionVariables[functionVariableKey];
                    if (currentFunctionVariable != null) {
                        let variableText = currentFunctionVariable.variableName + ": " + currentFunctionVariable.dataTypeString + " (" + currentFunctionVariable.valueString + ")";
                        allVariableTexts.push(variableText);
                    }
                }
            }
        }

        //For all variables found
        for (let i = 0; i < allVariableTexts.length; i++) {
            //"Mock" creating Fabric text (to calculate total width properly)
            let tempFabricSlotText = new fabric.Text(allVariableTexts[i], {
                left: 0,
                top: 0,
                fill: "black",
                fontSize: textFontSize
            });

            //Comparing the current variable text's length to the maximum 
            maxTotalTextWidth = tempFabricSlotText.getScaledWidth() > maxTotalTextWidth ? tempFabricSlotText.getScaledWidth() : maxTotalTextWidth;
        }
        
        return maxTotalTextWidth;
    }

    //Helper function checking for pointer variables in a provided program stack (assigns values to the this.cachedPointers in a [pointerVariable, pointingTo] format)
    checkForPointers(programStackToDraw: DataModelStructures.ProgramStack) {
        this.cachedPointers.splice(0, this.cachedPointers.length);  //Emptying the array

        //Going through all stackframes present (and noting their parameter's and variable's text)
        for (let stackFrameKey in programStackToDraw.stackFrames) {
            let currentStackFrame = programStackToDraw.stackFrames[stackFrameKey];
            
            if (currentStackFrame != null) {
                //Going through function parameters
                for (let functionParameterKey in currentStackFrame.functionParameters) {
                    let currentFunctionParameter = currentStackFrame.functionParameters[functionParameterKey];
                    if (currentFunctionParameter != null) {
                        if (currentFunctionParameter.isPointer == true) {
                            //Check the value pointed to
                            let valuePointedTo;
                            if(currentFunctionParameter.value != null) {
                                valuePointedTo = currentFunctionParameter.value;
                            }
                            else {
                                valuePointedTo = currentFunctionParameter.valueString;
                            }

                            this.cachedPointers.push([currentFunctionParameter.variableName, valuePointedTo]);
                        }
                    }
                }

                //Going through function variables
                for (let functionVariableKey in currentStackFrame.functionVariables) {
                    let currentFunctionVariable = currentStackFrame.functionVariables[functionVariableKey];
                    if (currentFunctionVariable != null) {
                        if (currentFunctionVariable.isPointer == true) {
                            //Check the value pointed to
                            let valuePointedTo;
                            if(currentFunctionVariable.value != null) {
                                valuePointedTo = currentFunctionVariable.value;
                            }
                            else {
                                valuePointedTo = currentFunctionVariable.valueString;
                            }

                            this.cachedPointers.push([currentFunctionVariable.variableName, valuePointedTo]);
                        }
                    }
                }
            }
        }
    }

    //Helper function to mark the pointee variable (with a different color)
    markPointee(variableId : string) {
        let searchedForText = variableId + ":";
        let searchedForVariableObject = this.findObjectByText(searchedForText);
                
        if (searchedForVariableObject instanceof fabric.Group)
        {
            console.log("[DEBUG] Pointee found!")

            //Saving the previous state of the pointee
            this.cachedPointeeObject[0] = searchedForVariableObject._objects[0];
            let previousColor = searchedForVariableObject._objects[0].get("fill")?.toString();
            if (previousColor != undefined)
                this.cachedPointeeObject[1] = previousColor;  
            else
                console.log("[DEBUG] Error - previous pointee color is undefined");
            //Changing the pointee's color
            searchedForVariableObject._objects[0].set("fill", "red");
        }
    }

    //Helper function to draw an arrow between two slots (used for pointers) - arrowOffset changes how far the arrow stretches sideways
    drawArrowBetweenVariables(fromVariableObject : fabric.Object, toVariableObject : fabric.Object, arrowOffset = 1) {
        let arrowColor = "black";
        let arrowEndTriangleWidth = 10;
        let arrowEndTriangleHeight = 15;

        if(fromVariableObject instanceof fabric.Group && toVariableObject instanceof fabric.Group)
        {
            if (fromVariableObject._objects[1] instanceof fabric.Text && toVariableObject._objects[1] instanceof fabric.Text)
                console.log("[DEBUG] Drawing an arrow between \"" + fromVariableObject._objects[1].text + "\" and \"" + toVariableObject._objects[1].text);
            else
                console.log("[DEBUG] Error - fromVariableObject or toVariableObject doesn't contain text (not at the [1] position)");
            let fromVariableObjectPosition = fromVariableObject.getCoords(true);    //Neccessary to get the absolute coordinates
            let toVariableObjectPosition = toVariableObject.getCoords(true);        //Neccessary to get the absolute coordinates
            let fromVarRightMiddlePoint =   [fromVariableObjectPosition[1].x,   fromVariableObjectPosition[1].y + (fromVariableObjectPosition[2].y  - fromVariableObjectPosition[1].y)  / 2];
            let toVarRightMiddlePoint =     [toVariableObjectPosition[1].x,     toVariableObjectPosition[1].y   + (toVariableObjectPosition[2].y    - toVariableObjectPosition[1].y)    / 2];

            //Drawing an arrow from the variable objects right X and middle points (Y)
            let lineStart = new fabric.Line([fromVarRightMiddlePoint[0] + arrowOffset * 50 + 1, fromVarRightMiddlePoint[1], fromVarRightMiddlePoint[0], fromVarRightMiddlePoint[1]], {
                stroke: arrowColor
            });

            let lineMiddle = new fabric.Line([fromVarRightMiddlePoint[0] + arrowOffset * 50, fromVarRightMiddlePoint[1], toVarRightMiddlePoint[0] + arrowOffset * 50, toVarRightMiddlePoint[1]], {
                stroke: arrowColor
            });
            
            let lineEnd = new fabric.Line([toVarRightMiddlePoint[0] + arrowOffset * 50, toVarRightMiddlePoint[1], toVarRightMiddlePoint[0] + arrowEndTriangleWidth, toVarRightMiddlePoint[1]], {
                stroke: arrowColor
            });


            let endTriangle = new fabric.Triangle({
                width: arrowEndTriangleWidth, 
                height: arrowEndTriangleHeight, 
                fill: arrowColor, 
                left: toVarRightMiddlePoint[0], 
                top: toVarRightMiddlePoint[1] + arrowEndTriangleHeight / 2 - 1,
                angle: 270
            });

            let arrowObjectGroup = new fabric.Group([lineStart, lineMiddle, lineEnd, endTriangle]);
            this.cachedPointerArrowObject = arrowObjectGroup;   //Saving the reference (for later deletion - presuming the arrow object is just one)
            this.canvas.add(arrowObjectGroup);
        }
        else
        {
            console.log("[DEBUG] FROM or TO variable object doesn't have an \"_objects\" property");
        }

        //Locking the movement of the items
        this.canvas.lockAllItems();
    }

    drawProgramStack(programStackToDraw: DataModelStructures.ProgramStack, startPosX = 10, startPosY = 10, maxStackSlotWidth? : number) {
        let shortenText = false;
        let stackSlotHeight = 30;
        let textFontSize = stackSlotHeight - stackSlotHeight / 3;
        let textLeftOffset = textFontSize / 5;
        let textRightOffset = textLeftOffset * 2;
        let calculatedMaxTextWidth = this.calculateMaxTextWidth(programStackToDraw, textFontSize);

        //Saving the now drawn program stack state (and the arguments of the last call)
        this.cachedDrawProgramStackArguments = [programStackToDraw, startPosX, startPosY, maxStackSlotWidth];

        //Caching the pointers in the program stack
        this.checkForPointers(programStackToDraw);

        //If maximum stack slot width is set
        if (typeof maxStackSlotWidth !== "undefined") {
            //Checking if we'll need to shorten the variable text (if all variable texts are shorter than the desired stackSlotWidth)
            shortenText = maxStackSlotWidth < calculatedMaxTextWidth;
        }
        
        //Drawing all the stackframes present
        for (let key in programStackToDraw.stackFrames) {
            let value = programStackToDraw.stackFrames[key];
            
            if (value != null) {
                //Chaging the starting position with each drawn stackframe
                if(shortenText) {
                    startPosY = this.drawStackFrame(value, startPosX, startPosY, stackSlotHeight, maxStackSlotWidth, shortenText);
                }
                else {
                    startPosY = this.drawStackFrame(value, startPosX, startPosY, stackSlotHeight, calculatedMaxTextWidth + textRightOffset, shortenText);
                }
            }
        }
    }

    drawStackFrame(stackFrameToDraw: DataModelStructures.StackFrame, startPosX = 10, startPosY = 10, stackSlotHeight = 30, stackSlotWidth = 300, shortenText = false): number {
        //Default values
        let backgroundColorBlue = '#33ccff';
        let backgroundColorGrey = '#8f8f8f';
        let backgroundColorGreen = '#00ff04';
        let textFill = "black";
        //Note: Text and frame rectangle variables are dynamically adjusted by the stackSlotHeight variable
        let textFontSize = stackSlotHeight - stackSlotHeight / 3;
        let textLeftOffset = textFontSize / 5;
        let textRightOffset = textLeftOffset * 2;

        //Creating the slots
        function createSlotConfig(setSlotColor: string) : StackframeSlotWidgetConfig{
            let retSlotConfig = new StackframeSlotWidgetConfig();
            retSlotConfig.slotWidth = stackSlotWidth;
            retSlotConfig.slotHeight = stackSlotHeight;
            retSlotConfig.slotColor = setSlotColor;
            retSlotConfig.textColor = textFill;
            retSlotConfig.textFontSize = textFontSize;
            retSlotConfig.textLeftOffset = textLeftOffset;
            retSlotConfig.textRightOffset = textRightOffset;
            retSlotConfig.shortenText = shortenText;
            return retSlotConfig;
        }

        //Function name
        let headerStackSlotConfig = createSlotConfig(backgroundColorBlue);
        new StackframeSlotWidget(stackFrameToDraw, this.canvas, startPosX, startPosY, headerStackSlotConfig).draw();
        startPosY += headerStackSlotConfig.slotHeight;
        //Function variables
        if (stackFrameToDraw.functionVariables != null && !stackFrameToDraw.isCollapsed)
        {
            for (let key in stackFrameToDraw.functionVariables) {
                let value = stackFrameToDraw.functionVariables[key];
                
                if (value != null) {
                    let stackSlotConfig = createSlotConfig(backgroundColorGrey);
                    new StackframeSlotWidget(value, this.canvas, startPosX, startPosY, stackSlotConfig).draw();
                    startPosY += stackSlotConfig.slotHeight;
                }
            }
        }
        //Function parameters
        if (stackFrameToDraw.functionParameters != null && !stackFrameToDraw.isCollapsed)
        {
            for (let key in stackFrameToDraw.functionParameters) {
                let value = stackFrameToDraw.functionParameters[key];
                
                if (value != null) {
                    let stackSlotConfig = createSlotConfig(backgroundColorGreen);
                    new StackframeSlotWidget(value, this.canvas, startPosX, startPosY, stackSlotConfig).draw();
                    startPosY += stackSlotConfig.slotHeight;
                }
            }
        }

        //Returning the future start position (for easy drawing of other stackframes under this one)
        return startPosY;
    }

    //More general method that prevents the user from misusing the drawing methods
    drawVariable(variableToDraw: DataModelStructures.Variable, startPosX?: number, startPosY?: number) {
        if (variableToDraw.dataTypeString == "string")
            new StringWidget(variableToDraw, this.canvas, startPosX, startPosY).draw();
        else if (variableToDraw.dataTypeString == "char")
            new CharWidget(variableToDraw, this.canvas, startPosX, startPosY).draw();
        else if (variableToDraw.dataTypeString == "number" ||
            variableToDraw.dataTypeString == "int" ||
            variableToDraw.dataTypeString == "float")
            new NumberWidget(variableToDraw, this.canvas, startPosX, startPosY).draw();
        else if (variableToDraw.dataTypeString == "bool" ||
            variableToDraw.dataTypeString == "boolean")
            new BooleanWidget(variableToDraw, this.canvas, startPosX, startPosY).draw();
        else
            return;
    }
}
