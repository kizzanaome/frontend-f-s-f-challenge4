var modal = document.getElementById('addFood');
var btn = document.getElementById('add-food-btn');

var modal = document.getElementById('editFood');
var btn = document.getElementById('edit-food-btn');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Adding menu_items from the database

var token = localStorage.getItem('token')

document.getElementById('menu').addEventListener('submit', addfood);
function addfood(e){
    e.preventDefault();
    let food_name = document.getElementById('food_name').value;
    let price = document.getElementById('price').value;
    fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/menu",{
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({food_name:food_name, price:price})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.message)
    if (data.message === "you have succesfully placed a food_item"){
        alert(data["message"])
        window.location.href = '../templates/admin.html'
    }else if (data.message === "Food item has alreadly beeen placed"){
        alert(data["message"])  
    }else if (data.msg ==="Token has expired"){
        alert(data.msg) 
        window.location.href = '../templates/login.html'      
    }else if (data.message ==="foodname should be in characters"){
        alert(data.message) 
    }
    else if (data.message=="item deleted"){
        alert(data.message)
        window.location.href = '../templates/admin.html'
        }
      
    })
  }


// Fetching menu_items from the database
document.getElementById('foods')
var token = localStorage.getItem('token')
    fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/menu", {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let foods = document.getElementById("foods");
            let menu_items = data.Food_Menu;
            let count = 0
            for (count; count<menu_items.length; count++) {
                let menu_item = menu_items[count];
                item_id = menu_item["food_id"];
                item_name = menu_item["food_id"];
                item_name = menu_item["food_name"];
                item_price = menu_item["price"];
                let food_card = document.createElement("div");
                food_card.setAttribute("class", "food_card");
                // Creating image div
                let img_div = document.createElement("div");
                img_div.setAttribute("class", "img");
                let img = document.createElement("img");
                img.setAttribute("src","../static/images/menu5.jpg");
                img.setAttribute("alt", "food");
                img_div.appendChild(img);
                food_card.appendChild(img_div);

                // creating description div
                let desc_div = document.createElement("div");
                desc_div.setAttribute("class", "desc");
                let food_h3 = document.createElement("h3");
                food_h3.textContent="Food:  "
                let food_span = document.createElement("span");
                food_span.innerHTML = item_name;
                food_h3.appendChild(food_span);
                desc_div.appendChild(food_h3);

                let price_h3 = document.createElement("h3");
                price_h3.textContent= "Price:   ";
                let price_span = document.createElement("span");
                price_span.innerHTML = item_price;
                price_h3.appendChild(price_span);
                desc_div.appendChild(price_h3);
                food_card.appendChild(desc_div);

                // add the footer div here
                
                let add_div = document.createElement("div")
                add_div.setAttribute("class","add");
                let form = document.createElement("form");
                let input = document.createElement("input");
                input.setAttribute("type", "submit");

                input.setAttribute("id", menu_item["food_id"]);
                input.setAttribute("class", "view");
                input.setAttribute("value", "Delete");
                input.setAttribute("onclick", "Delete_order(this)");
                form.appendChild(input);
                add_div.appendChild(form);
                food_card.appendChild(add_div);

                foods.appendChild(food_card);
               
            }
        
        })



function edit_model(module){
    console.log(module)
    document.getElementById('editFood').style.display = 'block';
}

function Delete_order(module){
    console.log(module.id)
    my_id = module.id;

    fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/menu/"+my_id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
             Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert(data.message)
            if (data.message=="item deleted"){
                alert(data.message)
                window.location.href = '../templates/admin.html'
                }
        });

    }


