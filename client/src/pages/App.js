import React, { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsBasicBlocks from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';
import gjsNavbar from 'grapesjs-navbar';
// import Builder from "./components/Builder.js";

import "../styles/main.css";

function App() {
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
    
  
    return (
      
      <div className="App" >
        {/* <Builder/> */}
        <div id="editor"></div>
        
      </div>
    );
}

export default App;
