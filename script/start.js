document.getElementById("gameboard").style.display = "none"
document.getElementById("info").style.display = "none"

function inputValidate(event) {
  event.preventDefault(); // Prevents the default form submission

  const whitePlayerInput = document.getElementById("white-name");
  const blackPlayerInput = document.getElementById("black-name");
  
  const whitePlayer = whitePlayerInput.value.trim();
  const blackPlayer = blackPlayerInput.value.trim();

  const nameRegex = /^[a-zA-Z\s]+$/; // Regex to match only letters and whitespace

  if (!nameRegex.test(whitePlayer) || !nameRegex.test(blackPlayer)) {
    const errorSound = new Audio('sound/error.wav')
    errorSound.play()
    setTimeout(() => alert("Please enter valid player name, with only letters and spaces."), 500 )
    return;
  }
  document.body.style.backgroundImage = "none";
  document.getElementById("white-player").textContent = whitePlayer;
  document.getElementById("black-player").textContent = blackPlayer;
  document.getElementById("form-container").style.display = "none";
  document.getElementById("gameboard").style.display = "flex";
  document.getElementById("info").style.display = "block";
}

function clearInput() {
  document.getElementById("white-name").value = "";
  document.getElementById("black-name").value = "";
}
