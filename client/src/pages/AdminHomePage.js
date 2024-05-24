import NavbarAdmin from '../components/NavbarAdmin'
import TableAdmin from '../components/TableAdmin'
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
  return (
    <div>
      <NavbarAdmin />
      <TableAdmin data={data} />
    </div>
  );
}

export default AdminHomePage;