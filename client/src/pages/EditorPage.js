import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBasicBlocks from "grapesjs-blocks-basic";
import gjsForms from "grapesjs-plugin-forms";
import gjsNavbar from "grapesjs-navbar";
import { saveAs } from "file-saver";
import logoSvg from '../assets/logo-magneto.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../styles/main.css";

function EditorPage() {
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins: [gjsPresetWebpage, gjsBasicBlocks, gjsForms, gjsNavbar],
      pluginsOpts: {
        gjsPresetWebpage: {},
        gjsBasicBlocks: {},
        gjsForms: {},
        gjsNavbar: {},
      },
    });
    setEditor(editor);
  }, []);

  const {logout} = useAuth()

  const handleLogout = () => {
    logout()
  }
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

      const blob = new Blob([html], { type: "text/html;charset=utf-8" });

      saveAs(blob, "output.html");
    } else {
      console.log("Editor instance not available");
    }
  };

  return (
    <div className="App relative">
      <nav className="bg-gray-200 py-2 px-6 flex justify-between items-center">
      <div className="logo">
        <img src={logoSvg} alt="Logo" className="h-8" />
      </div>
      <div className="buttons">
        <button
          className="p-1 text-center text-white bg-green-500 hover:bg-green-600 border border-green-500 rounded-md active:text-green-500 hover:bg-transparent focus:outline-none focus:ring hover:scale-[1.02] transition-transform mr-4"
          onClick={getHtmlAndCss}
        >
          Descargar código
        </button>
        <Link
          to="/"
          className="p-1 text-center text-white bg-blue-500 hover:bg-blue-600 border border-blue-500 rounded-md active:text-blue-500 hover:bg-transparent focus:outline-none focus:ring hover:scale-[1.02] transition-transform mr-4"
        >
          Regresar al menú
        </Link>
        <Link
          to="/login" onClick={handleLogout} 
          className="p-1 text-center text-white bg-red-500 hover:bg-red-600 border border-red-500 rounded-md active:text-red-500 hover:bg-transparent focus:outline-none focus:ring hover:scale-[1.02] transition-transform"
        >
          Logout
        </Link>
      </div>
    </nav>
      <div id="editor"></div>
    </div>
  );
}

export default EditorPage;
