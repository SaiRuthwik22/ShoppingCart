// const product = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

let colorChecks=[]
let sizeChecks = []
let currUser = localStorage.getItem("currUser")
if(currUser){
  let products = JSON.parse(localStorage.getItem("products")??"[]")
  if(products.length>0){
    renderAll(products)
  }
  else{
    fetch("https://fakestoreapi.com/products")
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
        let colors = ["red","blue","green","black","yellow"]
        let sizes = ["s","m","l","xl"]
        let newData = res.map((item) => {
          shuffle(colors);
          item.colors = colors.slice(0, 3);
          
          shuffle(sizes);
          item.sizes = sizes.slice(0, 3);
          
          return item;
        });
        localStorage.setItem("products",JSON.stringify(newData))
        renderAll(newData)
      })
  }

}
else{
  window.location.href = "../login/index.html"
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderElements(arr,str){
  let displayClothing = document.getElementById("displayClothing")
  let section = document.createElement("section")
  section.innerHTML = `<title>${str}</title>`
  displayClothing.innerHTML = ""
  let div1 = document.createElement("div")
  div1.classList.add("items");
  arr.map((item)=>{
    div1.innerHTML +=`
                  <div class="item">
                <img src="${item.image}" alt="Item" />
                <div class="info">
                  <div class="row">
                    <div class="price">$${item.price}</div>
                    <div class="sized">${item.sizes[0]},${item.sizes[1]},${item.sizes[2]}</div>
                  </div>
                  <div class="colors">
                    Colors:
                    <div class="row">
                      <div class="circle" style="background-color: ${item.colors[0]}"></div>
                      <div class="circle" style="background-color: ${item.colors[1]}"></div>
                      <div class="circle" style="background-color: ${item.colors[2]}"></div>
                    </div>
                  </div>
                  <div class="row">Rating:${item.rating.rate}</div>
                </div>
                <button id="addBtn" onclick="AddToCart(${item.id})">Add to Cart</button>
              </div>
    `
  })
  section.appendChild(div1)
  displayClothing.appendChild(section)
  
}
function renderAll(array){
  let displayClothing = document.getElementById("displayClothing")
  displayClothing.innerHTML = ""
  let section1 = document.createElement("section")
  section1.innerHTML = `<title>Men's Clothing</title>`
  let div1 = document.createElement("div")
  div1.classList.add("items");
  let arr1 = array.filter((item)=>item.category=="men's clothing")
  arr1.map((item)=>{
    div1.innerHTML +=`
                  <div class="item">
                <img src="${item.image}" alt="Item" />
                <div class="info">
                  <div class="row">
                    <div class="price">$${item.price}</div>
                    <div class="sized">${item.sizes[0]},${item.sizes[1]},${item.sizes[2]}</div>
                  </div>
                  <div class="colors">
                    Colors:
                    <div class="row">
                      <div class="circle" style="background-color: ${item.colors[0]}"></div>
                      <div class="circle" style="background-color: ${item.colors[1]}"></div>
                      <div class="circle" style="background-color: ${item.colors[2]}"></div>
                    </div>
                  </div>
                  <div class="row">Rating:${item.rating.rate}</div>
                </div>
                <button id="addBtn" onclick="AddToCart(${item.id})">Add to Cart</button>
              </div>
    `
  })
  section1.appendChild(div1)
  let section2 = document.createElement("section")
  section2.innerHTML =`<title>Women's Clothing</title>`
  let div2 = document.createElement("div")
  div2.classList.add("items");
  let arr2 = array.filter((item)=>item.category=="women's clothing")
  arr2.map((item)=>{
    div2.innerHTML +=`
                  <div class="item">
                <img src="${item.image}" alt="Item" />
                <div class="info">
                  <div class="row">
                    <div class="price">$${item.price}</div>
                    <div class="sized">${item.sizes[0]},${item.sizes[1]},${item.sizes[2]}</div>
                  </div>
                  <div class="colors">
                    Colors:
                    <div class="row">
                      <div class="circle" style="background-color: ${item.colors[0]}"></div>
                      <div class="circle" style="background-color: ${item.colors[1]}"></div>
                      <div class="circle" style="background-color: ${item.colors[2]}"></div>
                    </div>
                  </div>
                  <div class="row">Rating:${item.rating.rate}</div>
                </div>
                <button id="addBtn" onclick="AddToCart(${item.id})">Add to Cart</button>
              </div>
    `
  })
  section2.appendChild(div2)
  displayClothing.appendChild(section1)
  displayClothing.appendChild(section2)
}
function AddToCart(id){
  let user = JSON.parse(localStorage.getItem("currUser"))
  let userCart = user.cart ? user.cart : []
  let products = JSON.parse(localStorage.getItem("products")??"[]")
  let cartitem = products.filter((item)=>item.id == id)
  userCart.push(cartitem[0])
  let users = JSON.parse(localStorage.getItem("users"))
  users = users.map((ele)=>{
    if(ele.email == user.email){
      ele.cart = userCart
    }
    return ele
  })
  user.cart = userCart
  localStorage.setItem("currUser",JSON.stringify(user))
  localStorage.setItem("users",JSON.stringify(users))


}
function All(){
  let products = JSON.parse(localStorage.getItem("products"))
  renderAll(products)
  const buttons = document.querySelectorAll('.filter');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
      });
  });

}
function mens(){
  let products = JSON.parse(localStorage.getItem("products"))
  const buttons = document.querySelectorAll('.filter');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
      });
  });
  let arr1 = products.filter((item)=>item.category == "men's clothing")
  renderElements(arr1,"Men Clothing")
}
function womens(){
  let products = JSON.parse(localStorage.getItem("products"))
  const buttons = document.querySelectorAll('.filter');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
      });
  });
  let arr1 = products.filter((item)=>item.category == "women's clothing")
  renderElements(arr1,"Women Clothing")
}
function jewellary(){
  let products = JSON.parse(localStorage.getItem("products"))
  const buttons = document.querySelectorAll('.filter');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
      });
  });
  let arr1 = products.filter((item)=>item.category == "jewelery")
  renderElements(arr1,"Jewelary")
}
function electronics(){
  let products = JSON.parse(localStorage.getItem("products"))
  const buttons = document.querySelectorAll('.filter');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
      });
  });
  let arr1 = products.filter((item)=>item.category == "electronics")
  renderElements(arr1,"Electronics")
}
function filterCheck(event){
  console.log(event.target.checked)
  let products = JSON.parse(localStorage.getItem("products"))
  if(event.target.checked){
    colorChecks.push(event.target.id)
  }
  else{
    colorChecks = colorChecks.filter((item)=>item!==event.target.id)
  }
  let newArr = products.filter(product => 
    product.colors.some(color => colorChecks.includes(color))
);
renderElements(newArr,"Search based on colors")
console.log(newArr);
}
function filterSize(event){
  let products = JSON.parse(localStorage.getItem("products"))
  if(event.target.checked){
    sizeChecks.push(event.target.id)
  }
  else{
    sizeChecks = colorChecks.filter((item)=>item!==event.target.id)
  }
  let newArr = products.filter(product => 
    product.sizes.some(size => sizeChecks.includes(size))
);
renderElements(newArr,"Search based on Size")
}
function filterRating(event){
  let products = JSON.parse(localStorage.getItem("products")??"[]")
  const rangeValue = event.target.value;
  document.getElementById('rangeValue').textContent = rangeValue;
  let newArr = products.filter((item)=>item.rating.rate>rangeValue)
  renderElements(newArr,"filter Based on rating")
}
function filterbasedOnPrice(event){
  let newArr;
  let products = JSON.parse(localStorage.getItem("products")??"[]")
  if(event.target.id == "0-25"){
    newArr = products.filter((item)=>{
      if(parseInt(item.price)>0 && parseInt(item.price)<=25){
        return item
      }
    })
  }
  else if(event.target.id == "25-50"){
    newArr = products.filter((item)=>{
      if(parseInt(item.price)>25 && parseInt(item.price)<=50){
        return item
      }
    })
  }
  else if(event.target.id == "50-100"){
    newArr = products.filter((item)=>{
      if(parseInt(item.price)>50 && parseInt(item.price)<=100){
        return item
      }
    })
  }
  else if(event.target.id == "100on"){
    newArr = products.filter((item)=>{
      if(parseInt(item.price)>100){
        return item
      }
    })
  }
  renderElements(newArr,"Filter based on price")
}
function search(){
  let products = JSON.parse(localStorage.getItem("products"))
  let inputValue = document.getElementById("searchInput").value
  let newArr = products.filter((item)=>{
    if(item.title.toLowerCase().includes(inputValue.toLowerCase())){
      return item
    }
  })
  renderElements(newArr,"Search")
}