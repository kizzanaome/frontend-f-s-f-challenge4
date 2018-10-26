// Get the modal
var modal = document.getElementById('history');

var btn = document.getElementById('history-btn');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// fetching  orders from the database
document.getElementById('right-hist').addEventListener("load", getmenu());
var token = localStorage.getItem('token')
function getmenu() {
    fetch("http://127.0.0.1:5000/api/v1/users/orders", {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let order_history = document.getElementById("right-hist");
            let form = document.createElement("form");
            form.setAttribute("class", "modal-content animate");
            let div1 = document.createElement("div");
            div1.setAttribute("class", "container");
            let h6 = document.createElement("h6");
            h6.innerHTML = "Order History";
            div1.appendChild(h6);
            form.appendChild(div1);

            let history_table = document.createElement("table");
            let thead = document.createElement("thead");
            let theads = ["ID","Ordered Items", "Quantity", "Status", "Price", "Date ordered"];
            let count_head = 0
            for (count_head; count_head<theads.length; count_head++) {
                let th = document.createElement("th");
                th.innerHTML = theads[count_head];
                thead.appendChild(th);
            }
            history_table.appendChild(thead);

            let tbody = document.createElement("tbody");
            let count_row = 0;
            for (count_row; count_row<data.Your_order_History.length; count_row++) {
                let data_field = data.Your_order_History[count_row];
                let tr = history_table.insertRow(count_row);
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                let td6 = document.createElement("td");
                let td7 = document.createElement("td");

                td1 = tr.insertCell(0);
                td2 = tr.insertCell(1);
                td3 = tr.insertCell(2);
                td4 = tr.insertCell(3);
                td5 = tr.insertCell(4);
                td6 = tr.insertCell(5);
                td7 = tr.insertCell(6);

                td1.innerHTML = data_field["order_id"];
                td2.innerHTML = data_field["food_name"];
                td3.innerHTML = data_field["quantity"];
                td4.innerHTML = data_field["status"];
                td5.innerHTML = data_field["price"];
                td6.innerHTML = data_field["created_at"];
               
           }
           history_table.appendChild(tbody);
           div1.appendChild(history_table);
           order_history.appendChild(div1);
        }
        )}
    

function history_model(module){
    console.log(module)
    document.getElementById('history').style.display='none';
}