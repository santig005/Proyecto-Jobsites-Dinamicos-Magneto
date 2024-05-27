
import { saveAs } from "file-saver";
const downloadCode = async (id) => {
    try {
    console.log(id)
      const response = await fetch('http://localhost:5000/api/getcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        const {page} = await response.json();
        console.log('Descargado exitosamente:', page);
        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GrapesJS Output</title>
            </head>
            ${page.htmlCode}
            <style>${page.cssCode}</style>
          </html>
        `;
        const blob = new Blob([html], { type: "text/html;charset=utf-8" });

        saveAs(blob, page.username+".html");
      } else {
        console.error('Error al descargar:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };
  const approvePage = async (id) => {
    try {
    console.log(id)
      const response = await fetch('http://localhost:5000/api/approvepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        console.log('Aprobada exitosamente:');
      } else {
        console.error('Error al aprobar:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };
  const rejectPage = async (id) => {
    try {
    console.log(id)
      const response = await fetch('http://localhost:5000/api/rejectpage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        console.log('Rechazada exitosamente:');
      } else {
        console.error('Error al rechazar:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

export {downloadCode,approvePage,rejectPage};