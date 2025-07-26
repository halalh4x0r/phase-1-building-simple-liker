// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


// Add event listener once DOM content has loaded
document.addEventListener("DOMContentLoaded", () => {
  // 1. Get all heart elements with the class 'like-glyph'
  const hearts = document.querySelectorAll(".like-glyph");

  // 2. Loop through each heart and add a click event listener
  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      // 3. Make the "server" call
      mimicServerCall()
        .then(() => {
          // 4. Toggle heart based on current state
          if (heart.textContent === EMPTY_HEART) {
            heart.textContent = FULL_HEART;
            heart.classList.add("activated-heart");
          } else {
            heart.textContent = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // 5. Handle the error
          const modal = document.getElementById("modal");
          modal.classList.remove("hidden");
          modal.querySelector("#modal-message").textContent = error;

          // 6. Hide the modal after 3 seconds
          setTimeout(() => {
            modal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
