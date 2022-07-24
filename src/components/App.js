import React, { useState } from "react";
import PoemsContainer from "./PoemsContainer";
import NewPoemForm from "./NewPoemForm";

function App() {

  const [autoToggle, setAutoToggle] = useState(false);


  const toggleForm = (e)=>{
    setAutoToggle(!autoToggle);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <button onClick={toggleForm}>
          Show/hide new poem form
        </button>
        {autoToggle ? <NewPoemForm /> : null}
      </div>
      <PoemsContainer />
    </div>
  );
}

export default App;
