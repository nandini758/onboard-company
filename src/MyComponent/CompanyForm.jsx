import React, { useState, useEffect } from 'react';

export const CompanyForm = ({onSave, editData}) => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [domain, setDomain] = useState('');
  const [isValidCompanyName, setIsValidCompanyName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidContact, setIsValidContact] = useState(true);
  const [managers, setManagers] = useState([{ name: '', employees: [''] }])
  const [focusedInput, setFocusedInput] = useState(null);
  const [isSaveClicked, setIsSaveClicked] = useState(null);
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };
  
  const handleInputBlur = () => {
    setFocusedInput(null);
  };
  useEffect(() => {
    if (Object.keys(editData).length) { 
      setCompanyName(editData.companyName ?? '');
      setEmail(editData.email ?? '');
      setContact(editData.contact ?? '')
      setDomain(editData.domain ?? '');
      setManagers(editData.managers ?? [{ name: '', employees: [''] }]);
    }
  }, [editData]);

  const handleAddManager = () => {
    setManagers([...managers, { name: '', employees: [''] }]);
  };

  const handleAddEmployee = (managerIndex) => {
    const updatedManagers = [...managers];
    updatedManagers[managerIndex].employees.push('');
    setManagers(updatedManagers);
  };
 
  const handleInputChange = (e, index, managerIndex) => {
    const { name, value } = e.target;
    if (name === 'companyName'){
     const isValid = /^[A-Z][a-zA-Z]*$/.test(value);
     setCompanyName(value);
     setIsValidCompanyName(isValid);
     
    }
    else if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmail(value);
      setIsValidEmail(isValidEmail)
    }
    else if (name === 'contact') {
      const isValidContact = /^\d{0,10}$/.test(value);
      setContact(value);
      setIsValidContact(isValidContact);
    
    }
   else if(name === 'domain'){
     setDomain(value);
     
    }
    else {
      const updatedManagers = [...managers];
      if (name === 'managerName') updatedManagers[index].name = value;
      else if (name === 'employeeName')
        updatedManagers[managerIndex].employees[index] = value;
      setManagers(updatedManagers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSaveClicked === null) {
      setIsSaveClicked(true); 
    }
    if (isValidCompanyName) {
        let headCount= 0;
        let newId = -1
        managers.forEach(manager => {
            if(manager.name !== "")
            {
                headCount+=1;
                headCount+=manager.employees.length;
            }
        });
        if (Object.keys(editData).length) {
          newId = editData.id
        }
        const newCompany = {
            companyName: companyName,
            email: email,
            contact: contact,
            domain:domain, 
            headCount:headCount,
            managers: managers,
            id: newId,
          };
          onSave(newCompany);
          setCompanyName('');
          setEmail('');
          setContact('');
          setDomain('');
          setManagers([{ name: '', employees: [''] }])
      } 
  };

  return (
    <>
    
      
    <div className="form-container">
    <fieldset className='fieldset'>
      <legend className='legend'>Add Company</legend>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          
          <label>Name of company</label>
          <div className='input-container'>
          <input
           className={`input-boxs ${!isValidCompanyName ? 'invalid' : ''}`}
           type="text"
           name="companyName"
           value={companyName}
           onChange={(e) => handleInputChange(e)}
           required
          />
            {!isValidCompanyName && (
             <span className="error-message">Name of company should start with a capital letter and should not have any special characters, including spaces</span>
             )}
              </div>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <div className='input-container'>
          <input
            className={`input-boxs ${!isValidEmail ? 'invalid' : ''}`}
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            required
          />
          {!isValidEmail &&  (
          <span className="error-message">Email address should be in the general email format</span>
           )}
          </div>
        </div>
        <div className="form-group">
          <label>Contact details</label>
          <div className='input-container'>
          <input
          className={`input-boxs ${!isValidContact  ? 'invalid' : ''}`}
          type="text"
          name="contact"
          value={contact}
          onChange={(e) => handleInputChange(e)}
          required
          />
          {!isValidContact &&  (
         <span className="error-message">Contact details should be only allow number values and should be less than 10 digits</span>
          )}
           </div>
        </div>
        <div className="form-group">
          <label>Domain</label>
          <div className='input-container'>
          <select name="domain"
          className={`input-box ${(!domain || !['Gaming', 'Automobile', 'Car'].includes(domain)) ? 'invalid' : ''}`}
           value={domain} 
           onChange={(e) => handleInputChange(e)}
           onFocus={() => handleInputFocus('domain')} 
           onBlur={handleInputBlur}
            required>
             
            <option value="" onClick={domain}></option>
            <option value="Gaming">Gaming</option>
            <option value="Automobile">Automobile</option>
            <option value="Photography">Photography</option>
          </select>
          {(!domain || !['Gaming', 'Automobile', 'Car'].includes(domain)) && (
      <span className="error-message">Gaming, Automobile, Photography should be the options in this drop down</span>
    )}
          </div>
        </div>
        <button className='add-manager-btn' type="button" onClick={handleAddManager}>
          Add Manager
        </button>
       
        {managers.map((manager, managerIndex) => (
          <div key={managerIndex} className="manager-group">
            
            <div className="form-group2">
              <label>Manager Name</label>
              <input
              className='input-boxs'
                type="text"
                name="managerName"
                value={manager.name}
                onChange={(e) => handleInputChange(e, managerIndex)}
                required
              />
            </div>
            <div className="employee-group">
              {manager.employees.map((employee, index) => (
                <div key={index} className="form-group">
                  <label>Employee Name</label>
                  <input
                  className='input-boxs'
                    type="text"
                    name="employeeName"
                    value={employee}
                    onChange={(e) => handleInputChange(e, index, managerIndex)}
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddEmployee(managerIndex)}
              >
                Add Employee
              </button>
            </div>
          </div>
        ))}
        <button className='save' type="submit" onClick={() => setIsSaveClicked(true)}>Save company</button>
        {(isSaveClicked && (companyName || !email || !contact || !domain)) && (
       <span className="error-message-save">User should not be able to save the company if any of above or created field is missing </span>
        )}
      </form>
      </fieldset>
    </div>
    
    </>
  );
};

