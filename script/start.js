document.getElementById("gameboard").style.display = "none"
document.getElementById("info").style.display = "none"

const form = document.getElementById("name-form")
form.addEventListener("submit", e => {
    e.preventDefault();
    const whitePlayer = document.getElementById("white-name").value;   
    const blackPlayer = document.getElementById("black-name").value;
  
    if (whitePlayer === "" || blackPlayer === "") {
      alert("Please enter both player names");
      return;
    } else{
        this.document.getElementById("white-player").textContent = whitePlayer;
        this.document.getElementById("black-player").textContent = blackPlayer;
        document.getElementById("form-container").style.display = "none";
        document.getElementById("gameboard").style.display = "flex";
        document.getElementById("info").style.display = "block";
    }
  });
