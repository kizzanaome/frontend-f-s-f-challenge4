
//show password when when u click checkbox
function show() {
    var input = document.getElementById("password");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
  }



// const ul = document.getElementById('users');
// const url = "http://127.0.0.1:5000/api/v1/auth/signup";

// function createNode(element){
//     document.createElement(element);
// }

// function append(parent, el){
//     return parent.appendChild(el);
// }


// fetch(url)
// .then((response)=> response.json())
// .then(function(data) {
//         console.log(data);
        
//         let users = data.results; // Get the results
//         return users.map(function(user) { // Map through the results and for each run the code below
//           let li = createNode('li'), //  Create the elements we need
//             //   img = createNode('img'),
//               span = createNode('span');
//         //   img.src = author.picture.medium;  // Add the source of the image to be the src of the img element
//           span.innerHTML = `${user.username} ${user.password}`; // Make the HTML of our span to be the first and last name of our author
//         //   append(li, img); // Append all our elements
//           append(li, span);
//           append(ul, li);
//       })
//     })

//       .catch(function(error) {
//         console.log(error);

// });
