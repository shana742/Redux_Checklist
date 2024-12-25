import React, { useState, useContext, createContext } from "react";
import './App.css';

// Context Creation
const ChecklistContext = createContext();

// ChecklistProvider Component
const ChecklistProvider = ({ children }) => {
  const [checkedOptions, setCheckedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedOptions([...checkedOptions, name]);
    } else {
      setCheckedOptions(checkedOptions.filter((item) => item !== name));
    }
  };

  return (
    <ChecklistContext.Provider value={{ checkedOptions, handleCheckboxChange }}>
      {children}
    </ChecklistContext.Provider>
  );
};

// Checklist Component
const Checklist = () => {
  const { checkedOptions, handleCheckboxChange } = useContext(ChecklistContext);

  return (
    <div>
      <h2>Checklist</h2>
      <label>
        <input
          type="checkbox"
          name="Are you a Citizen?"
          onChange={handleCheckboxChange}
        />
        Are you a Citizen?
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="Are you over 21?"
          onChange={handleCheckboxChange}
        />
        Are you over 21?
      </label>
      <br />
      <h3>Selected Options:</h3>
      <ul>
        {checkedOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

// Main App Component
const App = () => (
  <ChecklistProvider>
    <Checklist />
  </ChecklistProvider>
);

export default App;
