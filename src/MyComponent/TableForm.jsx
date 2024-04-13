import React, { useEffect, useState } from 'react';
const TableForm = ({data, deleteRecord, editRecord, showForm}) => {
  const [tableStyle, setTableStyle] = useState({});

  useEffect(() => {
    setTableStyle({
      width: showForm ? '60%' : '80%',
    });
  }, [showForm]);

 
  return (
    <table className="table" style={tableStyle}>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Email address</th>
          <th>Contact details</th>
          <th>Domain</th>
          <th>Head Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.companyName}</td>
            <td>{item.email}</td>
            <td>{item.contact}</td>
            <td>{item.domain}</td>
            <td>{item.headCount}</td>
            <td>
            <div className="action-buttons">
              <button className='edit-btn' onClick={() => {
                editRecord(item.id)
              }}>Edit</button>
              <button className='delete-btn' onClick={()=>{
                deleteRecord(item.id)
              }}>delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableForm;
