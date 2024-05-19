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
import swiperComponent from "../plugins/swiper";


function EditorPage() {
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins: [gjsPresetWebpage, gjsBasicBlocks, gjsForms, gjsNavbar, swiperComponent],
      pluginsOpts: {
        gjsPresetWebpage: {},
        gjsBasicBlocks: {},
        gjsForms: {},
        gjsNavbar: {},
        swiperComponent: {},
      },
      canvas: {
        styles: ['https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'],
        scripts: ['https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'],
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
    <div className="App">
      <nav className="bg-gray-200 py-2 px-6 flex justify-between items-center">
      <div className="logo">
        <img src={logoSvg} alt="Logo" className="h-8" />
      </div>
      <div className="buttons">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-4"
          onClick={getHtmlAndCss}
        >
          Descargar código
        </button>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-4"
        >
          Regresar al menú
        </Link>
        <Link
          to="/login" onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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
