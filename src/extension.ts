import * as vscode from 'vscode';
import { SampleWebview} from './sample_webview'

export function activate(context: vscode.ExtensionContext) {

	console.log("I")
	const provider = new SampleWebview(context.extensionUri, context.extensionMode);
	console.log("II")
	context.subscriptions.push(vscode.window.registerWebviewViewProvider(SampleWebview.viewType,provider));
	console.log("III")
}