let sum = 0
function displayCart(){
    let currUser = JSON.parse(localStorage.getItem("currUser"))
    let userCart = currUser.cart

    let displayCartPage = document.getElementById("displayCartPage")
    let totalDisplay = document.getElementById("totalDisplay")

    let section = document.createElement("section")
    section.innerHTML = `<title>My Cart</title>`

    displayCartPage.innerHTML = ""
    totalDisplay.innerHTML =""

    let div1 = document.createElement("div")
    let div2 = document.createElement("div")

    div1.classList.add("items");
    div2.classList.add("details-container")


    userCart.map((item)=>{
      div1.innerHTML +=`
                    <div class="item">
                  <img src="${item.image}" alt="Item" />
                  <div class="info">
                    <div class="title-price">
                      <div class="title">${item.title}</div>
                      <div class="price">$${item.price}</div>
                    </div>
                  </div>
                  <button id="addBtn" onclick="RemovefromCart(${item.id})">Remove from Cart</button>
                </div>
      `
      div2.innerHTML += `<p>${item.title} : <span>$${item.price}</span></p>`
      sum += parseInt(parseFloat(item.price))
    })
    section.appendChild(div1)
    displayCartPage.appendChild(section)

    div2.innerHTML +=`        <hr>
        <p>Total : <span>$${sum}</span></p>
        <hr>`
    totalDisplay.appendChild(div2)
    totalDisplay.innerHTML +=`<button onclick="checkout(event)" >Pay</button>`


}
function RemovefromCart(id){
    let users = JSON.parse(localStorage.getItem("users"))
    let currUser = JSON.parse(localStorage.getItem("currUser"))
    let userCart = currUser.cart
    userCart = userCart.filter((item)=>item.id !==id)
    currUser.cart = userCart
    localStorage.setItem("currUser",JSON.stringify(currUser))
    users = users.map((user)=>{
        if(user.email == currUser.email){
            user.cart = userCart
        }
        return user
    })
    localStorage.setItem("users",JSON.stringify(users))
    displayCart()

}

function checkout(event){
  var options = {
    key: "<API_KEY>", // Enter the Key ID generated from the Dashboard
    amount: 300 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();

  event.preventDefault();
}


let currUser = localStorage.getItem("currUser")
if(currUser){
    displayCart()
}
else{
    window.location.href="../login/index.html"
}