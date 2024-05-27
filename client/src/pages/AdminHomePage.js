import NavbarAdmin from '../components/NavbarAdmin'
import TableAdmin from '../components/TableAdmin'
import {downloadCode,approvePage,rejectPage} from "../components/actions";
import React, { useEffect, useState } from 'react';

function AdminHomePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/admin')
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.pages);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  const handleDownload = (page_id) => {
    try {
      downloadCode(page_id)
      const newData = data.map(item => {
        if (item._id === page_id) {
          return { ...item, checked: true };
        } else {
          return item;
        }
      });
      setData(newData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleApproval = (page_id) => {
    try {
      approvePage(page_id)
      const newData = data.map(item => {
        if (item._id === page_id) {
          return { ...item, approval_status: "Aprobado" };
        } else {
          return item;
        }
      });
      setData(newData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleRejection = (page_id) => {
    try {
      rejectPage(page_id)
      const newData = data.map(item => {
        if (item._id === page_id) {
          return { ...item, approval_status: "Rechazado" };
        } else {
          return item;
        }
      });
      setData(newData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <TableAdmin data={data} onDownload={handleDownload} onApproval={handleApproval} onRejection={handleRejection} />
    </div>
  );
  
}

export default AdminHomePage;