// representing that the productt is added to the wishlist whenever the like symbol is clicked on any individual product
let w_imgs = document.querySelectorAll('.w_img');

for (let i = 0; i < w_imgs.length; i++) {
    w_imgs[i].addEventListener('click', (e) => {
        e.target.style.color = "red";
    });
    w_imgs[i].addEventListener('dblclick', (e) => {
        e.target.style.color = "black";
    });
}



// filetring the products bades on the select category 
let catog = document.querySelectorAll(".catogeries li");
for (let j = 0; j < catog.length; j++) {
    catog[j].addEventListener('click', (e) => {
        display_catog(e.target.innerText); 
    });
}
function display_catog(catog) {
    let products = document.querySelectorAll(".product-box");
    for (let i = 0; i < products.length; i++) {
        products[i].style.display = "flex";
        if (!products[i].classList.contains(catog)) {
            products[i].style.display = "none";
        } 
    }
}



// logic for adding products to the cart whenever the add to cart button on a product is clicked
let cartset = new Set();
let products = document.querySelectorAll(".product-box");
let cartBox = document.querySelector('.cart-product-box');

for (let j = 0; j < products.length; j++) {
    let btn = products[j].querySelector('.cart-btn'); 
    let img = products[j].querySelector('.product-img').getAttribute('src');
    let price = products[j].querySelector('.price');
    let name = products[j].querySelector('h3');

    btn.addEventListener('click', (e) => {
        
        let cartItem = document.createElement('div');
        let productNumber = products[j].classList[2];

        main_cart.style.display = "block";
        shop_content.style.width = "75%";
        main_wl.style.display = "none";

        if (!cartset.has(productNumber)) {
            cartItem.classList.add("cart_item");
            cartItem.classList.add(productNumber);
            cartItem.innerHTML = `
                <img src="${img}" alt="#">
                <h4>${name.innerText}</h4>
                <h5>${price.innerText}</h5>
                <button class="decrease">-</button>
                <span>1</span>
                <button class="increase">+</button>
            `;
            cartBox.appendChild(cartItem);
            cartset.add(productNumber);
            cart_resize();
        } else {
            for (let i = 0; i < cartBox.children.length; i++) {
                let cartItem = cartBox.children[i];
                if (cartItem.classList.contains(productNumber)) {
                    let quantity = cartItem.querySelector('span').innerText;
                    quantity = "" + (Number(quantity) + 1);
                    cartItem.querySelector('span').innerText = quantity;
                    cart_resize();
                }
            }
        }

    });
}

// changing the quantity of number of products present in the cart in the cart-bubble
function cart_resize() {
    let cat_bubble = document.querySelector('.cart-quantity');
    let cart_prod = document.querySelectorAll('.cart_item');
    let totalQuantity = 0;
    for (let i = 0; i < cart_prod.length; i++) {
        let quantity = parseInt(cart_prod[i].querySelector('span').innerText);
        totalQuantity += quantity;
    }
    cat_bubble.innerText = totalQuantity.toString();
}


// toggling the display of cart whenever an Item is added to the cart  and whenever we click the close button in the cart-box
let cart_close = document.querySelector('.close')
let main_cart = document.querySelector('.main-cart')
let cart_img = document.querySelector('.cart-img');
cart_img.addEventListener('click',(e)=>{
    main_cart.style.display = "block";
    shop_content.style.width = "75%";
    main_wl.style.display = "none";
})
let shop_content = document.querySelector('.shop-content')
cart_close.addEventListener('click',(e)=>{
    main_cart.style.display = "none";
    shop_content.style.width = "100%";
    main_wl.style.display = "none";
})


//increasing and decreasing the quantities of products when increase and decrease buttons of a product are used

cartBox.addEventListener('click', (e) => {
    let targetElement = e.target;

    if (targetElement.classList.contains('decrease')) {
        let span = targetElement.nextElementSibling;
        let newQuantity = Math.max(0, parseInt(span.innerText) - 1);
        span.innerText = newQuantity.toString();

        if (newQuantity === 0) {
            let productNumber = targetElement.closest('.cart_item').classList[1];
            targetElement.closest('.cart_item').remove();
            cartset.delete(productNumber);  // Remove the product from the Set
            cart_resize();
        }
    } else if (targetElement.classList.contains('increase')) {
        let span = targetElement.previousElementSibling;
        let newQuantity = parseInt(span.innerText) + 1;
        span.innerText = newQuantity.toString();
        cart_resize();
    }
});


//adding the elements to the whishlist when I clicked the wish button of any particular product 
let wlset = new Set();
let wl_product_box = document.querySelector('.wl-product-box');

for (let i = 0; i < products.length; i++) {
    let wish_btn = products[i].querySelector('.w_img');

    wish_btn.addEventListener('click', (e) => {
        if (!wlset.has(products[i].classList[2])) {
            let img = products[i].querySelector('.product-img').getAttribute('src');
            let price = products[i].querySelector('.price');
            let name = products[i].querySelector('h3');
            let prod_num = products[i].classList[2];
            let w_item = document.createElement('div');

            w_item.classList.add("list_item");
            w_item.classList.add(prod_num);

            w_item.innerHTML = `
                <div class="li_top">
                    <img src="${img}" alt="#">
                    <h4>${name.innerText}</h4>
                    <h5>${price.innerText}</h5>
                </div>
                <div class="li_btm">
                    <a class="rem_list">Remove from list</a>
                    <a class="add_cart">Move to Cart</a>
                </div>
            `;

            wl_product_box.appendChild(w_item);
            wlset.add(prod_num);

            let removeButton = w_item.querySelector('.rem_list');
            removeButton.addEventListener('click', () => {
                wlset.delete(prod_num);
                w_item.remove();
                
            });

            let moveToCartButton = w_item.querySelector('.add_cart');
            moveToCartButton.addEventListener('click', () => {
                
            });
        }
        wishlist_resize();
    });

    wish_btn.addEventListener('dblclick', (e) => {
        let wl_items = document.querySelectorAll('.list_item');
        for (let i = 0; i < wl_items.length; i++) {
            let prod_num = wl_items[i].classList[1]; // Use wl_items array
            if (wl_items[i].classList.contains(prod_num)) {
                wlset.delete(prod_num);
                wl_product_box.removeChild(wl_items[i]);
            }
        }
        wishlist_resize();
    });
}


//toggling the display of wishlist whwnever we click on the wish-list image
let wishlist = document.querySelector('.wishlist-img')
let main_wl = document.querySelector('.main-wl')
wishlist.addEventListener('click',(e)=>{
    main_wl.style.display = "block";
    shop_content.style.width = "75%";
    main_cart.style.display = "none";

})

let wl_close = document.querySelector('.wl-bottom');
wl_close.addEventListener('click',(e)=>{
    main_wl.style.display = "none";
    shop_content.style.width = "100%";
    main_cart.style.display = "none";
})


//function to change the quantity-bubble of wish-list
function wishlist_resize(){
    let wl_bubble = document.querySelector('.wl-quantity');
    wl_bubble.innerText = (wl_product_box.children.length).toString();
}