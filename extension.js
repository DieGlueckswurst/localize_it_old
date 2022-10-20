
const vscode = require('vscode');
const fs = require('fs');
const { resolve } = require('path');
const { inspect } = require('util');
const path = require('node:path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "flutter-localization-generator" is now active!');

	// Add '...args' to get access to the clicked file/directory 
	let disposable = vscode.commands.registerCommand('flutter-localization-generator.create', function (...args) {


		// Display a message box to the user
		vscode.window.showInformationMessage('Created!');


		var parentDirectory = args[0].path;

		const clickedOnDirectory = fs.lstatSync(parentDirectory).isDirectory();

		if(!clickedOnDirectory) {
			// Clicked on File so get the Parent Directory name
			parentDirectory = path.dirname(args[0].path);
		}

		const folderName = 'l10n';

		const directoryToCreate = path.join(parentDirectory, folderName);

		// Create Directory inside Parent Directory
		fs.mkdir(directoryToCreate, { recursive: true });


		const content = 'exampleContent';
		const dirPath = path.join(vscode.workspace.rootPath, 'localize_it/');
		fs.mkdirSync(dirPath, { recursive: true });

		// const filePath = path.join(dirPath, 'localization_config.dart');
		fs.writeFileSync(filePath, content, 'utf8');
		
		const openPath = vscode.Uri.file(filePath);
		vscode.workspace.openTextDocument(openPath).then(doc => {
			vscode.window.showTextDocument(doc);
		});

		
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
