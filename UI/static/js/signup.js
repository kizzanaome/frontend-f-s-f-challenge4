// Get the modal

var modal = document.getElementById('signup');

var btn = document.getElementById('btn')

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('signnup').addEventListener('submit', register);
function register(e){
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch("http://127.0.0.1:5000/api/v1/auth/signup",{
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({username:username, password:password})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data["message"])
      if (data["message"]=="Username already exists"){
        
        window.location.href = '../templates/signup.html'
      }
      else{
        window.location.href = '../templates/login.html'
      }
   
    })
  }