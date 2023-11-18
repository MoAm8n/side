// // Open Cart Shop
let iconShop = document.querySelector('#cart-icon-shop');
let contentShop = document.querySelector('.cart');
let iconClose = document.querySelector('#icon-Close');
iconShop.onclick = () =>{
    contentShop.classList.add("openCartShop");
    iconShop.style.color = '#1b6ef3';
    document.querySelector('.mobile').style.display ='none'
}
iconClose.onclick = () =>{
    contentShop.classList.remove("openCartShop");
    iconShop.style.color = '';
    document.querySelector('.mobile').style.display =''
}
// product To Cart
function myFunction(){
    let iconRemove = document.getElementsByClassName('card-trash');
    // console.log(iconRemove);
    for(var i=0; i<iconRemove.length; i++){
        var button = iconRemove[i];
        button.addEventListener("click", removeItemChecked)
    }
    let quantityChange = document.getElementsByClassName('card-quantity');
    // console.log(quantityChange);
    for(var i=0; i<quantityChange.length; i++){
        var input = quantityChange[i];
        input.addEventListener("change", quantityChangeCheck)
    }
    let iconAddCart = document.getElementsByClassName('add-icon');
    // console.log(iconAddCart);
    for(var i=0; i<iconAddCart.length; i++){
        var addButton = iconAddCart[i];
        addButton.addEventListener("click", addButtonCheck)
    }
    loadCartItems()
}
myFunction();
function removeItemChecked(event){
    var buttonCheck = event.target;
    buttonCheck.parentElement.remove();
    upTotalData()
    saveCartItems()
    updateCartIcon()
}
function quantityChangeCheck(event){
    var input = event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value = 1
    }
    upTotalData()
    saveCartItems()
    updateCartIcon()
}
function addButtonCheck(event){
    var button = event.target;
    var productToShops = button.parentElement;
    var title = productToShops.getElementsByClassName('title-product')[0].innerText;
    var direction = productToShops.getElementsByClassName('direction-Product')[0].innerText;
    var price = productToShops.getElementsByClassName('price-product')[0].innerText;
    var image = productToShops.getElementsByClassName('imgProductToCart')[0].src;
    addToCart(title, direction, price, image);
    upTotalData()
    saveCartItems()
    updateCartIcon()
}
function addToCart(title, direction, price, image){
    let cartShopBox = document.createElement("div")
    cartShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-shop')[0]
    let cartItemsNames = cartItems.getElementsByClassName('card-title')
    for(var i=0; i<cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert('This item is already in your shopping cart!')
            return;
        }
    }
    cartShopContent = `<img src="${image}" class="card-img" alt="...">
    <div class="card-titles">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${direction}</p>
        <div class="size-title pt-2 pb-2">
        <h4 class="pb-1"><strong>مقاس</strong></h4>
        <div class="d-flex gap-2">
            <button type="button" class="sizeBottom">S</button>
            <button type="button" class="sizeBottom">M</button>
            <button type="button" class="sizeBottom">L</button>
            <button type="button" class="sizeBottom">XL</button>
            <button type="button" class="sizeBottom">2XL</button>
            </div>
        </div>
        <div class="input-price">
        <input type="number" class="card-quantity" value="1" id="" name="">
        <p class="card-price">${price}</p>
        </div>
    </div>
    <i class="bx bx-trash card-trash"></i>`;
    cartShopBox.innerHTML = cartShopContent;
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('card-trash')[0]
    .addEventListener("click", removeItemChecked)
    cartShopBox.getElementsByClassName('card-quantity')[0]
    .addEventListener("change", quantityChangeCheck)
    saveCartItems()
    updateCartIcon()
}
    // total
function upTotalData(){
    let cartContent = document.getElementsByClassName('cart-shop')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total = 0;
    for(var i=0; i<cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('card-price')[0]
        let quantityElement = cartBox.getElementsByClassName('card-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace('حنية', ""))
        let quantity = quantityElement.value;
        total += price * quantity
    }
    document.getElementsByClassName('price-total')[0].innerText = total + ' حنية';
    // save total to localStorage
    localStorage.setItem('totalPrice', total)
}
// localStorage Items with Refresh
function saveCartItems(){
    let cartContent = document.getElementsByClassName('cart-shop')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let cartItem = []
    for(var i=0; i<cartBoxes.length; i++){
        cartBox = cartBoxes[i];
        let titleElement = cartBox.getElementsByClassName('card-title')[0]
        let directionElement = cartBox.getElementsByClassName('card-text')[0]
        let priceElement = cartBox.getElementsByClassName('card-price')[0]
        let quantityElement = cartBox.getElementsByClassName('card-quantity')[0]
        let imageElement = cartBox.getElementsByClassName('card-img')[0].src

        let item = {
            title: titleElement.innerText,
            direction: directionElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            image: imageElement,
        }
        cartItem.push(item)
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItem))
}
// save to cart in loading
function loadCartItems(){
    var cartItems = localStorage.getItem('cartItems')
    if(cartItems){
        cartItems = JSON.parse(cartItems);
        for(let i=0; i<cartItems.length; i++){
            var item = cartItems[i];
            addToCart(item.title, item.direction, item.price, item.image);
            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName('card-quantity')[0]
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem('totalPrice')
    if(cartTotal){

        document.getElementsByClassName('price-total')[0].innerText = cartTotal + ' حنية' 
    }
    updateCartIcon()
}
// quantity in cart icon 
function updateCartIcon(){
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;
    for(var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('card-quantity')[0]
        quantity += parseInt(quantityElement.value);
    }
    var cartIcon = document.getElementById('cart-icon-shop');
    cartIcon.setAttribute("data-quantity", quantity)
}
// end of carts
let scrollHeader = document.getElementById('header');
window.onscroll = function(){
    if(scrollY>=250){
        // scrollHeader.classList.add('headerHide')
        document.querySelector('.btnScrollY').classList.add('show-btnScrollY')
        // document.querySelector('.mobile').classList.add('mobileHide')
    }else{
        if(scrollY<=250){
            // scrollHeader.classList.remove('headerHide')
            document.querySelector('.btnScrollY').classList.remove('show-btnScrollY')
            // document.querySelector('.mobile').classList.remove('mobileHide')
        }
    }
}
window.onscroll = function(){
    if(scrollY>=25){
        document.querySelector('.img-fixed').classList.add('img-fixed-active')
        document.querySelector('.boxes-products').style.marginTop='45px';
    }else{
        if(scrollY<=25){
            document.querySelector('.img-fixed').classList.remove('img-fixed-active')
            document.querySelector('.boxes-products').style.marginTop='';
        }
    }
}
let btnScrollY = document.querySelector('.btnScrollY');
btnScrollY.onclick = function(){
    scroll({
        left: 0,
        top:0,
        behavior: "smooth"
    })
}
