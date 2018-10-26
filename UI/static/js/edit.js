var modal = document.getElementById('edit');
var btn = document.getElementById('edit-btn');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// fetching all orders from the database

document.getElementById('content').addEventListener("load", getmenu());
var token = localStorage.getItem('token');
function getmenu() {
    fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/orders", {
        method: "GET",
        headers: {
             Authorization: `Bearer ${token}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        }

    })
        .then((response) => response.json())
        .then((data) =>  {
            console.log(data);
            
        })
        .catch((err) => console.log(err))
    }
