let shop = document.getElementById('shop')

let basket =JSON.parse(localStorage.getItem('data')) || [];

let getShopItem = (() => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} =x;
        let search = basket.find((x) => x.id === id) ||[];
        // console.log(id);
       return `<div class="col mb-5">
    <div class="card h-100">
        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
        <img class="card-img-top" height="250" src="${img}" alt="..." />
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${name}</h5>
                <!-- Product price-->
                $${price}
            </div>
            
        </div>
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a onclick=addToCart(${id}) id="${id}" class="btn btn-outline-dark mt-auto">Add to cart</a></div>
        </div>
    </div>
</div>`
    }).join(""));

});

let addToCart = (id)=> {
    let selectedID = id;
    let search = basket.find((x) => x.id ===selectedID.id);
    if (search === undefined){
        basket.push({
                id:selectedID.id,
                item:1
            })
        console.log("Item Added");
    }
    else{
     search.item +=1;
     console.log(basket);
    }
    update();
    localStorage.setItem('data', JSON.stringify(basket));
}



let update = ((id) => {
  let totalitems = basket.map((x) => x.item).reduce((x,y) =>x+y, 0)
  document.getElementById('totalcartitem').innerHTML = totalitems;
})

update();










        
        



getShopItem();
