import React, { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsBasicBlocks from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';
import gjsNavbar from 'grapesjs-navbar';
import {saveAs} from 'file-saver'

import "../styles/main.css";

function EditorPage() {
  const [editor, setEditor] = useState(null);
    useEffect(() => {
      const editor = grapesjs.init({
        container: '#editor',
        plugins: [gjsPresetWebpage, gjsBasicBlocks, gjsForms, gjsNavbar,],
        pluginsOpts: {
          gjsPresetWebpage: {},
          gjsBasicBlocks: {},
          gjsForms: {},
          gjsNavbar: {},
        },
        
      });
      setEditor(editor);
    },[]);
    


    const getHtmlAndCss = () => {
      if (editor) {
        const htmlCode = editor.getHtml();
        const cssCode = editor.getCss();
  
        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GrapesJS Output</title>
            </head>
            ${htmlCode}
            <style>${cssCode}</style>
          </html>
        `;
  
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        
        saveAs(blob, 'output.html');
      } else {
        console.log('Editor instance not available');
      }
    };

    return (
      <div className="App" >
        <div id="editor"></div>
        <button className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"  onClick={getHtmlAndCss}>Get HTML and CSS</button>
      </div>
    );
}

export default EditorPage;
