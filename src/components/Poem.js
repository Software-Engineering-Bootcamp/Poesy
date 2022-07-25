import React, { useState } from 'react';

const poemAPI = "http://localhost:8004/poems";

function Poem({poem, removePoem, addToFavorites}) {
  const {title, content, author} = poem;
  const [isRead, setIsRead] = useState(false)

  function onDeleteClick(e) {
    e.preventDefault();
    fetch(`${poemAPI}/${poem.id}`, {
      method: "DELETE",
    });
    removePoem(poem);
  }

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>
        <strong>- By {author}</strong>
      </p>
      <button onClick={() => setIsRead(!isRead)} >
        Mark as {isRead ? "unread" : "read" }
      </button>

      <button onClick={onDeleteClick} >
        Delete
      </button>

      <button onClick={() => addToFavorites(poem)}>
        {poem.isFavorite ? "Unfavorite" : "♥ Favorite" }
      </button>
    </div>
  );
}

export default Poem;
