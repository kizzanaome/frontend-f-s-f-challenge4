// Get the modal
var modal = document.getElementById('order');

var btn = document.getElementById('add-btn');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
var id=localStorage.getItem('order_id')

var token = localStorage.getItem('token')
document.getElementById('placeorder').addEventListener('submit', postorder);
function postorder(e){
    e.preventDefault();
    let food_name = document.getElementById('food_name').value;
    let quantity = document.getElementById('quantity').value;
    let location = document.getElementById('location').value;
    fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/users/orders",{
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json',
         Authorization: `Bearer ${token}`
      },

      body:JSON.stringify({food_name:food_name, quantity:quantity, location:location})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.message)
        console.log(data)
    if (data.message == "you have succesfully placed order"){
        alert(data["message"])
        window.location.href = '../templates/home.html'
    }else if (data.message === "Order has already been placed"){
        alert(data["message"])        
    }else if (data.msg ==="Token has expired"){
        alert(data.msg) 
        window.location.href = '../templates/login.html'      
    }else if (data.msg ==="food_item doesnt exist on the food menu"){
        alert(data.msg) 
      }else if(data.message === "Please avoid adding spaces"){
          alert(data.message)
      }
    })
  }


// fetching  menu_items from the database
document.getElementById('foods').addEventListener("load", getmenu());
var token = localStorage.getItem('token')
function getmenu() {
    fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/menu", {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .then((data) => {
            let foods = document.getElementById("foods");
            let menu_items = data.Food_Menu;
            let count = 0
            for (count; count<menu_items.length; count++) {
                let menu_item = menu_items[count];
                item_name = menu_item["food_name"];
                item_price = menu_item["price"];
                let food_card = document.createElement("div");
                food_card.setAttribute("class", "food_card");
                // Creating image div
                let img_div = document.createElement("div");
                img_div.setAttribute("class", "img");
                img_div.setAttribute("id", menu_item["food_name"]);
                img_div.setAttribute("onclick", "order_model(this)");
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
                add_div.setAttribute("id", "add-btn")
                let input = document.createElement("p");
                input.textContent= "Place Order"
                input.setAttribute("id", menu_item["food_name"]);
                input.setAttribute("onclick", "order_model(this)");
                // form.appendChild(input);
                // add_div.appendChild(form);
                // food_card.appendChild(add_div);
                
            
                // let a_tag = document.createElement("a");
                // a_tag.setAttribute("href","#");
                // a_tag.setAttribute("class", "view");
                // a_tag.setAttribute("id", "view");
                // a_tag.setAttribute("onclick", view_model);
                // a_tag.textContent="View more"
                // form.appendChild(a_tag);
                add_div.appendChild(input);
                food_card.appendChild(add_div);


                // <a href = "#" class = "view" id ="view" 
                // onclick = "document.getElementById('food').style.display = 'block'">view more</a>


                foods.appendChild(food_card);
                // console.log(menu_items[count]);
            }
        
        })
        .catch((err) => console.log(err))

}

function order_model(module){
    console.log(module.id)
    document.getElementById("food_name").value = module.id;
    document.getElementById('order').style.display = 'block';
}

function view_model(view){
    console.log(view)
    document.getElementById('food').style.display = 'block';
}



