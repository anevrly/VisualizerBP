"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
//import * as path from 'path';
const fs = require("fs");
//Global panel (to be accessible)
let currentPanel;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "bakalarkatestextension" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('bakalarkatestextension.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from BakalarkaTestExtension!');
    });
    //src: https://code.visualstudio.com/api/extension-guides/webview
    let testPreviewCommand = vscode.commands.registerCommand('bakalarkatestextension.showPreview', () => {
        // Create and show a new webview
        currentPanel = vscode.window.createWebviewPanel('bakalarkaTestExtension', // Identifies the type of the webview. Used internally
        'Bakalarka Test Extension - dog preview', // Title of the panel displayed to the user
        vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
        {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, '..')] //Allowing including only files from the root directory and the one above*/
        } // Webview options
        );
        //Getting the WebView HTML
        currentPanel.webview.html = getWebviewContent(currentPanel.webview, context);
        //Registering the debug adapter
        vscode.debug.registerDebugAdapterTrackerFactory('*', {
            createDebugAdapterTracker(session) {
                return {
                    //TODO: Decide if we need messages recieved by the debugger
                    //onWillReceiveMessage: m => console.log(`bakalarkaTestExtension> ${JSON.stringify(m, undefined, 2)}`),
                    onDidSendMessage: m => printAndTestForVariables(m),
                };
            }
        });
        // Handle messages from the webview
        currentPanel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'requestStackFrame':
                    //TODO: Check if the current scope is of the requested stackFrame's (message.name == currentScopeName)
                    //Getting the stack frame
                    const session = vscode.debug.activeDebugSession;
                    if (session != undefined) {
                        let threadInfo = session.customRequest('threads');
                        let frameId;
                        //Request for thread info
                        threadInfo.then(
                        //(value) => session.customRequest('stackTrace', { threadId: value }).then(
                        //	(value) => frameId = value.body.stackFrames[0].id
                        //)
                        (value) => {
                            console.log("Value recieved (threads)");
                            console.log(value);
                            let myThreadId = value.threads[0].id; //Getting the thread id
                            //Request for stack info
                            session.customRequest('variables', { threadId: myThreadId }).then((value) => {
                                console.log("Value recieved (variables)");
                                console.log(value);
                                currentPanel.webview.postMessage({ command: 'responseVariables', body: value });
                            }, (reason) => console.error(reason));
                        }, (reason) => console.error(reason));
                    }
                    return;
            }
        }, undefined, context.subscriptions);
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(testPreviewCommand);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {
    currentPanel.dispose();
}
exports.deactivate = deactivate;
function getWebviewContent(webview, context) {
    let retHtml = ``;
    //Preparing the paths
    const myScript = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, '../myBuildableCodeParcel/dist', 'myDrawlib.js'));
    //const myScript = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'src', 'testHtmlFileScript.js'));   // <--- 'src' is the folder where the .js file is stored
    const rawHtml = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'src/testHtmlFile.html'));
    //Loading the resources
    retHtml = fs.readFileSync(rawHtml.fsPath, 'utf8');
    //Replacing the key sequences
    retHtml = retHtml.replace("${myScript}", myScript.toString(true));
    return retHtml;
}
function printAndTestForVariables(message) {
    console.log(message); //TODO: Delete - just temporary to check the message in full length
    //Catching the variable events
    if (message.type == "response" && message.command == "variables") {
        //console.log(JSON.stringify(message.body.variables, undefined, 2));	//Printing the variables to the debug console
        //Passing the message to the extension window
        for (let i = 0; i < Object.keys(message.body.variables).length; i++) {
            currentPanel.webview.postMessage({ command: 'drawVariables', body: message.body.variables });
        }
    }
    else if (message.type == "response" && message.command == "stackTrace") {
        //console.log(JSON.stringify(message.body.stackFrames, undefined, 2));	//Printing the stack frame to the debug console
        //Passing the message to the extension window
        for (let i = 0; i < Object.keys(message.body.stackFrames).length; i++) {
            currentPanel.webview.postMessage({ command: 'drawStackFrames', body: message.body.stackFrames });
        }
    }
}
//# sourceMappingURL=extension.js.map