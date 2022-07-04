let cartTotal = document.getElementById('cartTotal')
let cartLists = document.getElementById('cartlists')
let summary = document.getElementById('summary')
let totalPrice = document.getElementById('totalPrice')
let clearCart = document.getElementById('clearCart')




//event listener



let basket =JSON.parse(localStorage.getItem('data')) || [];

document.getElementById("clearCart").onclick = emptyCart;


let update = ((id) => {
    let totalitems = basket.map((x) => x.item).reduce((x,y) =>x+y, 0)
    if (totalitems > 1){
    cartTotal.innerHTML = totalitems + ` Items Selected`;
    }
    else {
    cartTotal.innerHTML = totalitems + ` Item Selected`;
    }
})
  
update();

let showCartItems =(() => {
    if (basket.length !==0) {
    return (cartLists.innerHTML =  basket.map((x) => {
        let {id, item} =x;
        let search = shopItemsData.find((y) => y.id === id) || [];
    return `
    <div class="row border-top border-bottom">
    <div class="row main align-items-center">
         <div class="col-2"><img class="img-fluid" src="${search.img}" alt=""></div>
         <div class="col">
             <div class="row"><h5>${search.name} (${search.price}/Unit)</h5></div>
             <div class="row text-muted">${search.desc}</div>
         </div>
         <div class="col">
            <i onclick=reduceFromCart(${id}) class="bi bi-dash"></i><span class="border display-6">${item}</span><i onclick=addToCart(${id}) id ="${id}" class="bi bi-plus"></i>
         </div>
         <div class="col">$ ${item * search.price}<span onclick=removeFromCart(${id}) class="close icon-cross">&#10005;</span></div>
     </div>
  </div>      
     `
     
  }).join(""));  
  
}

  else {
    cartLists.innerHTML = `<h2 class="text-center">Cart Is Empty</h2>`;
    summary.innerHTML = `No Items In Your Cart!`
    clearCart.style.display='none';
  }     
});

let showSummary =(() => {
    if (basket.length !==0) {
    return (summary.innerHTML =  basket.map((x) => {
        let {id, item} =x;
        let search = shopItemsData.find((y) => y.id === id) || [];
    return `<div class="row">
    <div class="col" style="padding-left:0;">${search.name} X ${item}</div>
    <div class="col text-right">$ ${item * search.price}</div>
    </div> 
     `
     
  }).join(""));  
  
}

  else {
    summary.innerHTML = `No Items In Your Cart!`
  }  
   
});

let addToCart = (id)=> {
    let selectedID = id;
    let search = basket.find((x) => x.id ===selectedID.id);
    if (search.id === undefined){
        basket.push({
                id:selectedID.id,
                item:1
            })
    }
    else{
     search.item +=1;
    }
    update();
    showCartItems();
    TotalAmount();
    showSummary();
    localStorage.setItem('data', JSON.stringify(basket));
}

let reduceFromCart = (id)=> {
    let selectedID = id;
    let search = basket.find((x) => x.id ===selectedID.id);
    if (search.id === undefined) return;
    else if (search.item == 0) return;
    else{
     search.item -=1;
    }
    
    basket =basket.filter((x) =>x.item !==0 );
    update();
    showCartItems();
    TotalAmount();
    showSummary();
    localStorage.setItem('data', JSON.stringify(basket));
}

removeFromCart = (id) => {
    let selectedId = id;
    basket =basket.filter((x) =>x.id !==selectedId.id );
    localStorage.setItem('data', JSON.stringify(basket));
    showCartItems();
    showSummary();
    TotalAmount();
    update();




}

let TotalAmount =() => { 
    let amount =basket.map((x) => {
        let {id, item} = x;
        let search = shopItemsData.find((y) => y.id === id );
        return (item * search.price)    
    }).reduce((x,y) =>x+y,0) 
    totalPrice.innerHTML = `&dollar;`+amount;
    showCartItems();
    showSummary();
    update();
}

function emptyCart(e) {
    basket =[];
    localStorage.setItem('data', JSON.stringify(basket));
    TotalAmount();
    showCartItems();
    showSummary();
    e.preventDefault()
}

TotalAmount();
showCartItems();
showSummary();


