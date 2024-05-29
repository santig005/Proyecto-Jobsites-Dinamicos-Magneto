import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBasicBlocks from "grapesjs-blocks-basic";
import gjsForms from "grapesjs-plugin-forms";
import gjsNavbar from "grapesjs-navbar";
import { saveAs } from "file-saver";
import logoSvg from "../assets/logo-magneto.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/main.css";
import swiperComponent from "../plugins/swiper";

function EditorPage() {
  const [editor, setEditor] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isApproved, setIsApproved] = useState("Pendiente");
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins: [
        gjsPresetWebpage,
        gjsBasicBlocks,
        gjsForms,
        gjsNavbar,
        swiperComponent,
      ],
      pluginsOpts: {
        gjsPresetWebpage: {},
        gjsBasicBlocks: {},
        gjsForms: {},
        gjsNavbar: {},
        swiperComponent: {},
      },
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
        ],
        scripts: [
          "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
        ],
      },
    });
    setEditor(editor);
    fetchData();
  }, []);

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
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

  const saveHtmlAndCss = async () => {
    const { username, email, id } = user;
    if (editor) {
      const htmlCode = editor.getHtml();
      const cssCode = editor.getCss();
      const currentTime = new Date();
      const edition_date = currentTime.toLocaleDateString();
      const edition_time = currentTime.toLocaleTimeString();

      const dataToSend = {
        htmlCode,
        cssCode,
        username,
        email,
        id_user: id,
        edition_date,
        edition_time,
      };

      try {
        const response = await fetch("http://localhost:5000/api/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("File saved successfully:", data);
        } else {
          const errorData = await response.json();
          console.log("Failed to save file:", errorData);
        }
      } catch (error) {
        console.log("Error saving file:", error);
      }
    } else {
      console.log("Editor instance not available");
    }
  };

  // Obtener datos de la base de datos
  async function fetchData() {
    const { id } = user;
    try {
      const response = await fetch("http://localhost:5000/api/admin");
      if (response.ok) {
        const data = await response.json();
        console.log("ID del usuario logueado:", id);
        console.log("Datos obtenidos:", data);
        const pageData = data.pages;
        const userPages = pageData.filter((page) => page.id_user === id);
        console.log("Páginas del usuario logueado:", userPages[0]);
        if (userPages.length === 0) {
          console.log("No se encontraron datos para el usuario logueado");
          setIsApproved(null)
          setIsChecked(null);
        }
        // Actualiza los estados
        setIsChecked(userPages[0].checked);
        setIsApproved(userPages[0].approval_status);
        
        console.log("Estado de checked:", userPages[0].checked);
        console.log("Estado de approved:", userPages[0].approval_status);
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  const getApprovalStatusClass = (status) => {
    let bgColor, textColor;
    switch (status) {
      case "Aprobado":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        break;
      case "Rechazado":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        break;
      case "Pendiente":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-800";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
    }
    return `${bgColor} ${textColor}`;
  };

  return (
    <div className="App">
      <nav className="bg-gray-200 py-2 px-6 flex justify-between items-center">
        <div className="logo">
          <img src={logoSvg} alt="Logo" className="h-8" />
        </div>
        <div className="buttons flex">
        {isChecked !== null && isApproved !== null ? (
            <>
              <span className="mr-2 flex justify-center items-center text-sm">
                Revisión:
              </span>
              <span
                className={`flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold mr-4 ${
                  isChecked
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                
                {isChecked ? "Revisado" : "Pendiente"}
              </span>
              <span className="mr-2 flex justify-center items-center text-sm">
                Estado de aprobación:
              </span>
              <span
                className={`flex items-center justify-center estado px-2 py-1 rounded-full text-xs font-semibold mr-4 ${getApprovalStatusClass(isApproved)}`}
              >
                {isApproved}
              </span>
            </>
          ) : (
            <span className="flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold mr-4 bg-red-100 text-red-800">
              Aún te falta enviar la solicitud
            </span>
          )}


          <Link
            to="/save"
            onClick={saveHtmlAndCss}
            className="bg-green-500 hover:bg-green-700 text-white font-bold text-sm py-1 px-2 rounded mr-4"
          >
            Enviar solicitud
          </Link>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold text-sm py-1 px-2 rounded mr-4"
            onClick={getHtmlAndCss}
          >
            Descargar código
          </button>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-2 rounded mr-4"
          >
            Regresar al menú
          </Link>
          <Link
            to="/login"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-1 px-2 rounded"
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
