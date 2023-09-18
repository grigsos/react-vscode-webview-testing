import * as vscode from "vscode";
import { MessageHandlerData,WebviewHelper } from '@estruyf/vscode';



export class SampleWebview implements vscode.WebviewViewProvider {

    public static readonly viewType = 'conveyorCommands.conveyorWebView';

    private _view?: vscode.WebviewView;
    private extensionMode: vscode.ExtensionMode;

    constructor(
		private readonly _extensionUri: vscode.Uri,
		extensionMode: vscode.ExtensionMode 
		
	) {this.extensionMode = extensionMode;}

    public async resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	): Promise<void> {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

        console.log("1")

        webviewView.webview.onDidReceiveMessage(message => {
			const { command, requestId, payload } = message;
		
			if (command === "GET_DATA") {
				// Do something with the payload
		
				// Send a response back to the webview
				webviewView.webview.postMessage({
					command,
					requestId, // The requestId is used to identify the response
					payload: `Hello from the extension!`
				} as MessageHandlerData<string>);
			} else if (command === "GET_DATA_ERROR" ) {
				webviewView.webview.postMessage({
					command,
					requestId, // The requestId is used to identify the response
					error: `Oops, something went wrong!`
				} as MessageHandlerData<string>);
			} else if (command === "POST_DATA") {
				vscode.window.showInformationMessage(`Received data from the webview: ${payload.msg}`);
			}
		});
        console.log("2")

        webviewView.webview.html = this._getWebviewContent();
        console.log("3")
	}

    private _getWebviewContent = () => {
        console.log("a")
        const jsFile = "webview.js";
        const localServerUrl = "http://localhost:9000";
    
        let scriptUrl = null;
        let cssUrl = null;
    
        const isProduction = this.extensionMode === vscode.ExtensionMode.Production;
        if (isProduction) {
            scriptUrl = this._view!.webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'dist', jsFile)).toString();
        } else {
            scriptUrl = `${localServerUrl}/${jsFile}`; 
        }
        console.log("b")

        console.log(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${isProduction ? `<link href="${cssUrl}" rel="stylesheet">` : ''}
        </head>
        <body>
            <div id="root"></div>
    
            <script nonce="${WebviewHelper.getNonce()} src="${scriptUrl}"></script>
        </body>
        </html>`)
    
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${isProduction ? `<link href="${cssUrl}" rel="stylesheet">` : ''}
        </head>
        <body>
            <div id="root"></div>
    
            <script nonce="${WebviewHelper.getNonce()}" src="${scriptUrl}"></script>
        </body>
        </html>`;
    }

}


