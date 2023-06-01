// <!DOCTYPE html>
// <html>
// <head>
//  <title>Chess Game</title>
//   <style>
//     /* CSS styles for the chess board */
//     /* ... */
    
//     /* CSS styles for the form */
//     #form-container {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       height: 100vh;
//     }
    
//     #name-input {
//       margin-bottom: 1rem;
//     }
    
//     #submit-button {
//       padding: 0.5rem 1rem;
//     }
//   </style>
// </head>
// <body>
//   <h1>Chess Game</h1  <div id="form-container">
//     <form id="name-form">
//       <label for="name-input">Enter your name:</label>
//       <input type="text" id="name-input" name="name">
//       < type="submit" id="submit-button">Start Game</button>
//     </form>
//   </div>
//   <div id="board" style="display: none;">
//     <!-- HTML code for the chess board -->
//     <!-- ... -->
//   </div>
//   <script>
    window.addEventListener("load", function() {
      const form = document.getElementById("name-form");
      const nameInput = document.getElementById("name-input");
      const board = document.getElementById("board");
      
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = nameInput.value.trim();
        
        if (name === "") {
          alert("Please enter a valid name.");
          return;
        }
        
        // Display board and hide form
        board.style.display = "block";
        form.style.display = "none";
        
        // Display player names on the HTML page
        document.getElementById("white-player").textContent = name;
        document.getElementById("black-player").textContent = "Computer";
      });
    });
