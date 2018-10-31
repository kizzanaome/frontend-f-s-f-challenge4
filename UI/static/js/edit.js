var modal = document.getElementById('edit');
var btn = document.getElementById('edit-btn');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// fetching all orders from the database

// document.getElementById('content').addEventListener("load", getmenu());
var token = localStorage.getItem('token');
const url="https://noma-fast-food-fast-db.herokuapp.com/api/v1/orders";
console.log(token)
fetch(url,{
    method:'GET',
    headers:{
        Authorization:`Bearer ${token}`,
    }
}).then(res=>res.json()
).then(data=>{
console.log(123)
console.log(data)
let admin_orders = document.getElementById("content");
// let form = document.createElement("form");
let div = document.createElement("div");
div.setAttribute("class", "content-wrapper");

let order_table = document.createElement("table");
order_table.setAttribute("id", "list");
let thead = document.createElement("thead");
let theads = ["ID","Ordered Items", "Quantity", "Status", "Price", "Date ordered", "Accept|Decline", "Details"];
let count_head = 0
for (count_head; count_head<theads.length; count_head++) {
    let th = document.createElement("th");
    th.innerHTML = theads[count_head];
    thead.appendChild(th);
}
order_table.appendChild(thead);

let tbody = document.createElement("tbody");
let count_row = 0;
for (count_row; count_row<data.Available_orders.length; count_row++) {
let data_field = data.Available_orders[count_row];
let tr = order_table.insertRow(count_row);
let td1 = document.createElement("td");
let td2 = document.createElement("td");
let td3 = document.createElement("td");
let td4 = document.createElement("td");
let td5 = document.createElement("td");
let td6 = document.createElement("td");
let td7 = document.createElement("td");
let td8 = document.createElement("td")



td1 = tr.insertCell(0);
td2 = tr.insertCell(1);
td3 = tr.insertCell(2);
td4 = tr.insertCell(3);
td5 = tr.insertCell(4);
td6 = tr.insertCell(5);
td7 = tr.insertCell(6);
td8 = tr.insertCell(7);


td1.innerHTML = data_field["order_id"];
td2.innerHTML = data_field["food_name"];
td3.innerHTML = data_field["quantity"];
td4.innerHTML = data_field["status"];
td5.innerHTML = data_field["price"];
td6.innerHTML = data_field["created_at"];
let td7_a= document.createElement("a");
td7_a.setAttribute("href", "#");
td7_a.setAttribute("id",data_field["order_id"]);
td7_a.setAttribute("onclick", "Accept_order(this)");

td7_a.textContent="Accept";
td7.appendChild(td7_a);
let td7_a2= document.createElement("a");
td7_a2.setAttribute("href", "#");
td7_a2.setAttribute("onclick", "Decline_order(this)");
td7_a2.setAttribute("id",data_field["order_id"]);
td7_a2.textContent="Decline";
td7.appendChild(td7_a2);


let td8_view= document.createElement("a");
td8_view.setAttribute("onclick","View_modal(this)");
td8_view.setAttribute("id",data_field["order_id"]);
td8_view.textContent="View";
td8.appendChild(td8_view);

}
    order_table.appendChild(tbody);
    div.appendChild(order_table);
    admin_orders.appendChild(div);

})


function View_modal(module){
    console.log(module.id)
    my_id = module.id;

    fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/orders/"+my_id, {
        method: "GET",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
             Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("order-id").innerHTML = "Order ID&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;"+data.order.order_id
            document.getElementById("item-name").innerHTML = "Ordered Item &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;"+data.order.food_name
            document.getElementById("client-location").innerHTML = "Customer Location&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;"+data.order.location
            document.getElementById("time-stamp").innerHTML = "Order Time &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;"+data.order.created_at
            document.getElementById("Status").innerHTML = "Order Status &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;"+data.order.status
            document.getElementById("price").innerHTML = "Order Price &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;"+data.order.price
            document.getElementById("quantity").innerHTML = "Quantity &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;"+data.order.quantity
            document.getElementById("username").innerHTML = "Client_Name &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;"+data.order.username

            document.getElementById('detail').style.display = 'block';
        });
}



function Accept_order(module){
    console.log(module.id)
    my_id = module.id;

    fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/orders/"+my_id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
             Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({status:"Accepted"})
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
                if (data["message"]=="Order has been accepted"){
                    alert(data["message"])
                    window.location.href = '../templates/adminOrder.html'
                 }
                 else if(data["message"]=="order has been Rejected"){
                    alert(data["message"])
                    window.location.href = '../templates/adminOrder.html'}
        });

    }


    function Decline_order(module){
        console.log(module.id)
        my_id = module.id;
    
        fetch("https://noma-fast-food-fast-db.herokuapp.com/api/v1/orders/"+my_id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type':'application/json',
                 Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({status:"Rejected"})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data["message"]=="Order has been accepted"){
                    alert(data["message"])
                    window.location.href = '../templates/adminOrder.html'
                 }
                 else if(data["message"]=="order has been Rejected"){
                    alert(data["message"])
                    window.location.href = '../templates/adminOrder.html'}
            });
    
        }
    
    