
let itemlist = []
let data
function change(id) {
  fetch("./appliancies.json").then((res) => res.json()).then((data) => {
    let filterArray = data.filter((item) => item.filter_id == id)
    let div = `<div class="ans">`
    filterArray.forEach((x) => {
      x.products.forEach((i) => {
        let div2 = ` <div class="wrapper">
            <div class="pic">
                <img src=${i.imgSrc} class="food-img">
            </div>
            <h2 class="food-title">${i.product_name}</h2>
            <span class="food-price">Rs.${i.price}</span>
            <div class="add-cart"> <ion-icon name="cart-outline"></ion-icon></div>
           
          </div>
           `
        div += div2
      })

    })

    div += `</div>`
    document.getElementById("output").innerHTML = div
    let addcart = document.querySelectorAll(".add-cart")
    console.log(addcart)
    addcart.forEach((add) => {
      add.addEventListener("click", additems)
    })

    function additems() {
      let value = getCookies("username")
      let food = this.parentElement

      let title = food.querySelector(".food-title").innerText
      let image = food.querySelector(".food-img").src
      let price = food.querySelector(".food-price").innerText
      let newproduct = { title, image, price }

      if (itemlist.find((el) => el.title == newproduct.title)) {
        alert("product already added to a cart")
        return
      }
      if (value != "") {

        itemlist.push(newproduct)
       

        let newproductelement = createcartproduct(title, image, price)

        let div = document.createElement("div")
        div.innerHTML = newproductelement
        let cartbox = document.querySelector(".cart-box")
        cartbox.append(div)
        loadcontent()

      } else {
        let value = prompt("enter your name")
        if (value != "" && value != undefined) {
          setCookies("username", value)
        }
      }
    }

    })

}


function carsouel() {
  let carsouelDiv = `
          <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/imageCarsouel/photo2.jpg" class="img">
          </div>
          <div class="carousel-item">
            <img src="/imageCarsouel/photo3.jpg" class="img">
          </div>
          <div class="carousel-item">
            <img src="/imageCarsouel/photo4.webp" class="img">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>

      </div>
    `
  document.getElementById("output").innerHTML = carsouelDiv
}

function loadfood() {
  loadcontent()

}

function loadcontent() {

  let cartopen = document.querySelector(".cart-icon")
  let cart = document.querySelector(".cart-items")
  let cartclose = document.querySelector(".cart-cancel")


  cartopen.addEventListener("click", () => {
    cart.classList.add("cart-active")
  })

  cartclose.addEventListener("click", () => {

    cart.classList.remove("cart-active")
  })

  let btnremove = document.querySelectorAll(".cart-remove")
  btnremove.forEach((btn) => {
    btn.addEventListener("click", removeitem)
  })

  function removeitem() {
    let title = this.parentElement.querySelector(".cfood-title").innerHTML;
    itemlist = itemlist.filter((el) => el.title != title)

    this.parentElement.remove();
    loadcontent()
  }
  let cartquantity = document.querySelectorAll(".cart-quantity")
  cartquantity.forEach((input) => {
    input.addEventListener("change", quantity)
  })
  function quantity() {
    if (isNaN(this.value) || this.value < 1) {
      this.value = 1

    }
    loadcontent()
  }
  updatetotal()
}


function createcartproduct(title, image, price) {
  return `
  
          <div class="food-items">
            <div class="food-div">

              <img class="cfood-img" src=${image}>
            </div>
            <div class="cfood-title">${title}</div>
            <div class="cfood-price">
             ${price}
            </div>
            <div class="ccart-price">
              ${price}
            </div>
            <div class="ccart-input">
              <input type="number" value="1" class="cart-quantity">
            </div>

            <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
            <hr>  

          </div>
         
  `
}
function updatetotal() {
  let cartitems = document.querySelectorAll(".food-items")
  let totalprice = document.querySelector(".total-amt")
  let paymentcount = document.querySelector(".total-pay")
  let total = 0

  cartitems.forEach(products => {
    let foodprice = products.querySelector(".cfood-price")
    let price = parseInt(foodprice.innerHTML.replace("Rs.", ""))
    let qty = products.querySelector(".cart-quantity").value
    total += (price * qty)

    products.querySelector(".ccart-price").innerText = "Rs." + (price * qty)

  })
  totalprice.innerHTML = "Rs." + total
  paymentcount.innerHTML = "Amount payable.Rs." + total

  let cartcount = document.querySelector(".cart-count")
  let count = itemlist.length
  cartcount.innerHTML = count
  if (count == 0) {
    cartcount.style.display = "none"
  } else {
    cartcount.style.display = "block"
  }
}

let placeorder = document.querySelector(".order-btn")
let pro = document.querySelector(".payment")
let btn = document.querySelector(".btn1")

placeorder.addEventListener("click", () => {

  pro.classList.add("product-active")
  document.querySelector(".full").style.opacity = "0.1";
})

btn.addEventListener("click", () => {
  pro.classList.remove("product-active")
  document.querySelector(".full").style.opacity = "5";
})
function setCookies(name, value) {
  let partOne = name + "=" + value
  let d = new Date()
  d.setMinutes(d.getMinutes() + 2)
  let fullcookie = partOne + ";expires=" + d.toUTCString() + ";path=/"
  document.cookie = fullcookie
}

function getCookies(name) {
  let partone = name + "="
  let allCookie = decodeURIComponent(document.cookie)
  let splitCookie = allCookie.split(";")
  for (let i = 0; i < splitCookie.length; i++) {
    let checkCookie = splitCookie[i].indexOf(partone)
    if (checkCookie != -1) {
      let value = splitCookie[i].substring(splitCookie[i].indexOf("=") + 1)
      if (value == "") {
        continue
      } else {
        return value
      }
    }
  }
  return ""
}

