import React, { useState } from 'react';
import {CompanyForm} from './CompanyForm'; 
import TableForm from './TableForm';
function AddCompany() {
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [editValue, setEditvalues] = useState({});
  const handleSaveCompany = (newCompany) => {
    if (newCompany.id !== -1) {
      let newData = [] 
      for (let i=0 ; i<data.length ; i++) {
        if (data[i].id === newCompany.id) {
          newData.push(newCompany)
        } else {
          newData.push(data[i])
        }
      }
      setData(newData);
      setEditvalues({});
    } else {
      newCompany.id = id 
      setData([...data, newCompany]);
      setId(id+1)
    }
    setShowForm(false);
  };
  const handleAddCompanyClick = () => {
    if (showForm) setShowForm(false)
    else setShowForm(true)
  };
  function deleteRecord(id){
    console.log(data)
    const updatedData = data.filter(item => item.id !== id);
    console.log(updatedData, id)
    setData(updatedData);
  }

  function editRecord(id) {
    setShowForm(true);
    let record = null 
    for (let i =0 ; i<data.length ; i++) {
      if (data[i].id === id) {
        record = data[i]
      }
    }
    setEditvalues(record)
  }

  return (
    <div className="AddCompany">
      <button className="add-company-btn" onClick={handleAddCompanyClick}>
        Add a company
      </button>
      {showForm &&  <CompanyForm onSave={handleSaveCompany} editData={editValue}/>}
      <TableForm  data={data} deleteRecord = {deleteRecord} editRecord={editRecord} showForm={showForm} />
    </div>
  );
}

export default AddCompany;
