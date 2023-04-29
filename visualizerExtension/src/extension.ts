// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
//import * as path from 'path';
import * as fs from 'fs';
import { json } from 'stream/consumers';

//Global panel (to be accessible)
let currentPanel: vscode.WebviewPanel;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "visualizerbp" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('visualizerbp.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from VisualizerBP!');
	});

	//src: https://code.visualstudio.com/api/extension-guides/webview
	let previewCommand = vscode.commands.registerCommand('visualizerbp.showPreview', () => {
		// Create and show a new webview
		currentPanel = vscode.window.createWebviewPanel(
			'VisualizerBP', // Identifies the type of the webview. Used internally
			'VisualizerBP - preview', // Title of the panel displayed to the user
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
			createDebugAdapterTracker(session: vscode.DebugSession) {
				return {
					//TODO: Decide if we need messages recieved by the debugger
					//onWillReceiveMessage: m => console.log(`visualizerbp> ${JSON.stringify(m, undefined, 2)}`),
					onDidSendMessage: m => printAndTestForVariables(m),
				};
			}
		});

		// Handle messages from the webview
		currentPanel.webview.onDidReceiveMessage(
			message => {
			  switch (message.command) {
				case 'requestStackFrame':
					//TODO: Check if the current scope is of the requested stackFrame's (message.name == currentScopeName)
					//Getting the stack frame
					const session = vscode.debug.activeDebugSession;
					if (session != undefined)
					{
						let threadInfo = session.customRequest('threads');
						let frameId : number;
						//Request for thread info
						threadInfo.then(
							//(value) => session.customRequest('stackTrace', { threadId: value }).then(
							//	(value) => frameId = value.body.stackFrames[0].id
							//)
							(value) => {
								console.log("Value recieved (threads)");
								console.log(value);
								let myThreadId = value.threads[0].id;	//Getting the thread id

								//Request for stack info
								session.customRequest('variables', { threadId: myThreadId }).then(
									(value) => {
										console.log("Value recieved (variables)");
										console.log(value);
										currentPanel.webview.postMessage({ command: 'responseVariables', body: value });
									},
									(reason) => console.error(reason)
								)
							},
							(reason) => console.error(reason)
						);
					}
					
				  return;
			  }
			},
			undefined,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(previewCommand);
}


// This method is called when your extension is deactivated
export function deactivate() {
	currentPanel.dispose();
}

function getWebviewContent(webview: vscode.Webview, context: any) {
	let retHtml: string = ``;

	//Preparing the paths
	const myScript = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'lib', 'myDrawlib.js'));
	const rawHtml = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'lib', 'sourceHtmlFile.html'));

	//Loading the resources
	retHtml = fs.readFileSync(rawHtml.fsPath, 'utf8');

	//Replacing the key sequences
	retHtml = retHtml.replace("${myScript}", myScript.toString(true));

	return retHtml;
}

function printAndTestForVariables(message: any) {
	console.log(message);	//TODO: Delete - just temporary to check the message in full length

	//Catching the variable events
	if (message.type == "event" && message.event == "stopped") {
		currentPanel.webview.postMessage({ command: 'redrawCanvas', body: message.body});	//Redrawing the canvas (as the state of the program has changed)
	}
	else if (message.type == "response" && message.command == "variables") {
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
			currentPanel.webview.postMessage({ command: 'drawProgramStack', body: message.body.stackFrames });
		}
	}

}