// Get the modal
var modal = document.getElementById('login');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('loginform').addEventListener('submit', login);
function login(e){
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/auth/login",{
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
      if (data["message"]=="Invalid credentials"){
        
         window.location.href = '../templates/login.html'
      }
      else if(data["message"]=="You have succesfully logged in" && username == "admin"){
        var token= data['token']
        localStorage.setItem("token",token)
        window.location.href = '../templates/admin.html'}
        else{
            var token= data['token']
            localStorage.setItem("token",token)
            window.location.href = '../templates/home.html'
        }
       
    })
  }
