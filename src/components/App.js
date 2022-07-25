// import React, { useState } from "react";
// import PoemsContainer from "./PoemsContainer";
// import NewPoemForm from "./NewPoemForm";

// function App() {

//   const [autoToggle, setAutoToggle] = useState(false);


//   const toggleForm = (e)=>{
//     setAutoToggle(!autoToggle);
//   }

//   return (
//     <div className="app">
//       <div className="sidebar">
//         <button onClick={toggleForm}>
//           Show/hide new poem form
//         </button>
//         {autoToggle ? <NewPoemForm /> : null}
//       </div>
//       <PoemsContainer />
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import PoemsContainer from "./PoemsContainer";
import NewPoemForm from "./NewPoemForm";

const poemAPI = "http://localhost:8004/poems";
// id, title, content, author

function App() {
  const [poems, setPoems] = useState([]);
  const [formVisible, setFormVisible] = useState(true);
  const [favoriteVisible, setFavoriteVisible] = useState(true);
  
  const poemsToDisplay = poems.filter((poem) => favoriteVisible || poem.isFavorite);

  useEffect(() => {
    fetch(poemAPI)
      .then(res => {
        console.log("******response**********");
        console.log(res);
        return res.json();
      })
      .then(data =>{ 
        console.log("********data*****");
        console.log(data);
        return setPoems(data);
      }).catch((err)=> console.error(err));
  }, []);

  function addPoem(newPoem) {
    setPoems([...poems, newPoem]);
  }

  function removePoem(poemToRemove) {
    setPoems(poems.filter(poem => poem.id !== poemToRemove.id))
  }

  function addToFavorites(favPoem) {
    setPoems(poems.map(poem => {
      return poem.id === favPoem.id ? {...favPoem, isFavorite: !favPoem.isFavorite} : poem
      }  
    ))
  }

  function renderPoemView() {
    if (poemsToDisplay.length === 0 && !favoriteVisible) {
      return (<h1>You have no favorites added</h1>)
    } else {
      return (
        <PoemsContainer 
          poems={poemsToDisplay} 
          removePoem={removePoem} 
          addToFavorites={addToFavorites}
        />
      )
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
        <button 
          onClick={() => setFormVisible(!formVisible)} >
          Show/hide new poem form
        </button>
        {formVisible ? <NewPoemForm addPoem={addPoem} /> : null}

        <button onClick={() => setFavoriteVisible(!favoriteVisible)} >
          Show/hide Favorite Poems
        </button>
      </div>
      {renderPoemView()}
    </div>
  );
}

export default App;