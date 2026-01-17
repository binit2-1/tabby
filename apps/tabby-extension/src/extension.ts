import * as vscode from 'vscode';
import axios from 'axios';

interface Snippet {
    id: string;
    title: string;       
    code: string;        
    description: string; 
    language: string;    
}

// Base Url(production)
const BASE_URL = 'https://tabby-backend.vercel.app';
//development
// const BASE_URL = 'http://localhost:4000';

// Offline Cache
let cachedSnippets: Snippet[] = [];
let userBundleId: string | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Tabby is ready to work!');

    //Check if we already have a Bundle ID saved from last time
    userBundleId = context.globalState.get('tabby-bundle-id');
    if (userBundleId) {
        fetchSnippets(userBundleId); // Load cache immediately on startup
    }

    // --- COMMAND 1: CONNECT (Cmd+Shift+P -> Tabby: Connect) ---
    let connectCmd = vscode.commands.registerCommand('tabby.connect', async () => {
        // Ask user for the Bundle ID
        const input = await vscode.window.showInputBox({
            placeHolder: 'Paste your Bundle ID (e.g., snippet:1234-abcd)',
            prompt: 'Enter the Session ID from your Web App'
        });

        if (input) {
            userBundleId = input;
            // Persist it so they remain logged in after restart
            await context.globalState.update('tabby-bundle-id', input);
            fetchSnippets(input);
        }
    });

    // --- COMMAND 2: REFRESH (Manually update cache) ---
    let refreshCmd = vscode.commands.registerCommand('tabby.refresh', () => {
        if (!userBundleId) return vscode.window.showErrorMessage('Tabby: No Bundle ID found. Run "Connect" first.');
        fetchSnippets(userBundleId);
    });
    //Autocomplete Provider
    let provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file' }, // Trigger in any file
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                
                // Get the current file's language
                const currentLang = document.languageId;

                // If you want to show ALL snippets regardless of file, remove the .filter()
                const relevantSnippets = cachedSnippets
                // Convert JSON data into VS Code "Suggestions"
                return relevantSnippets.map(snippet => {
                    const item = new vscode.CompletionItem(snippet.title, vscode.CompletionItemKind.Snippet);
                    
                    item.detail = `(Tabby) ${snippet.description}`;
                    
                    // The code to insert
                    item.insertText = new vscode.SnippetString(snippet.code);
                    
                    // Documentation (The preview window on the side)
                    const docs = new vscode.MarkdownString();
                    docs.appendCodeblock(snippet.code, snippet.language);
                    item.documentation = docs;

                    return item;
                });
            }
        }
    );

    context.subscriptions.push(connectCmd, refreshCmd, provider);
}

// --- HELPER: Fetch Data ---
async function fetchSnippets(bundleId: string) {
    try {
        // Show a little spinner in the bottom bar
        const status = vscode.window.setStatusBarMessage('$(sync~spin) Tabby: Syncing snippets...');
        
        // Fetch from your local API
        const response = await axios.get(`${BASE_URL}/api/bundle/${bundleId}`);
        
        if (response.data && Array.isArray(response.data)) {
            cachedSnippets = response.data; 
            vscode.window.setStatusBarMessage(`$(check) Tabby: Loaded ${cachedSnippets.length} snippets`, 4000);
        } else {
             vscode.window.showWarningMessage('Tabby: Bundle ID found, but it is empty.');
        }
        status.dispose();
    } catch (error) {
        console.error("Tabby Network Error:", error);
        vscode.window.showErrorMessage('Tabby: Could not connect to API');
    }
}

export function deactivate() {}