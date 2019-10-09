var itemCount = 0;
var cartqty = 1;
var file = "https://curlmix.com/collections/all?view=products.json";
var count = 0;
var arrItems = [];

async function preload() {
    try {
        const response = await fetch(file);
        var data = await response.json();
        // console.log(data);
    } catch (error) {
        alert(error);
    }
    data.forEach(data => {
        arrItems.push(data);
    });
    console.log(arrItems);
    for (i = count; i <= arrItems.length; i++) {
        const markup = `
        <div class="card col-xl-3 col-lg-4 col-md-6 col-sm-6 p-4 border-0" data-itemid=${arrItems[i].id}>
              <img src="https:${arrItems[i].images}" class="card-img-top" alt="">
                  <div class="card-body mt-4">
                      <a href="#" class="text-decoration-none">
                          <h6 class="card-title">${arrItems[i].title}</h6>
                      </a>
                  </div>
                  <div class="card-footer">
                  <i class="ion ion-md-eye" onclick="Quickview(${i})"></i>
                      <p class="card-text">${arrItems[i].price}</p>
                      <a class="btn btn-outline-primary text-uppercase px-lg-7 px-sm-5 font-weight-bold" onclick="Cartlist(${i})">Shop now</a>
                  </div>
        </div>`;
        document.getElementById("load").insertAdjacentHTML("beforeend", markup);
    }
}
function Quickview(e) {
    document.getElementById("prod").innerHTML = "";

    console.log(arrItems);

    const markup = `
      <div class="col-lg-6">
         <div class="row mt-4">
            <div class="col-lg-10 col-md-10 order-md-2 mt-md-0 mt-3">
                <div class="carousel-main">
                    <img src="https:${
        arrItems[e].images[0]
        }" alt="" class="w-100 ">
                    <img src="https:${
        arrItems[e].images[1]
        }" alt="" class="w-100">
                    <img src="https:${
        arrItems[e].images[2]
        }" alt="" class="w-100">
                    <img src="https:${
        arrItems[e].images[3]
        }" alt="" class="w-100">
                    <img src="https:${
        arrItems[e].images[4]
        }" alt="" class="w-100">
                </div>
            </div>
  
        </div>
    </div>
    <div class="col-lg-6 my-6 text-lg-left">
    <span class="d-flex justify-content-end"><i class="ion ion-md-close" onclick="Close(${e})"></i></span>
       <p>STEP 4 OF WASH + GO SYSTEM</p>
        <h2>${arrItems[e].title}</h2>
    
        <div class="row">
            <div class="col-sm-6 ">
                <p class="price">${
        arrItems[e].price
        }<span class="ml-2"><small class="text-muted">8 oz. bottle</small></p>
                </span>
            </div>
            <div class="col-sm-6 d-sm-flex justify-content-end">
                <span><img src="assets/images/star.png" alt=""></span>
                <span class="mt-1 custom">43 Reviews</span>
            </div>
        </div>
    
   
        <form>
    
                 <div class="quantity-wrapper d-inline-flex mt-3 mb-mx-3">
                <div class="input-group input-group-sm mt-1">
                    <div class="input-group-prepend ">
                        <a href="#" title="Decrease"
                            class="input-group-text bg-transparent border-right-0 border-secondary">
                            <span class="btn-decrease"></span>
                        </a>
                    </div>
                    <input type="text" name="quantity" aria-label="quantity" value="1" step="1" min="1"
                        class="quantity py-4 px-3 form-control border-secondary font-weight-bolder text-center border-left-0 border-right-0 bg-transparent">
    
                    <div class="input-group-append">
                        <a href="#" title="Increase"
                            class="input-group-text bg-transparent border-left-0 border-secondary">
                            <span class="btn-increase"></span>
                        </a>
                    </div>
                </div>
            </div>
    
            <a href="#"
                class="btn btn-primary text-uppercase text-white px-8 px-sm-5 py-2 mb-1 ml-lg-3 font-weight-bold" onclick="Cartlist(${e})">add
                to
                bag</a>
        </form>
    
    </div>`;

    document.getElementById("prod").insertAdjacentHTML("beforeend", markup);
    setTimeout(() => {
        $(".carousel-main").flickity({
            asNavFor: ".carousel-nav",
            draggable: true,
            groupCells: false,
            pageDots: false,
            prevNextButtons: false,
            arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 45, x3: 25 },
            wrapAround: true
        });
    }, 1000);
    document.getElementById("prod").style.display = "flex";
}

function Cartlist(el) {
    itemCount++;

    document.getElementById("itemCount").innerHTML = itemCount;
    document.getElementById('prod').style.display = "none";
    // document.querySelector('.closeicon').innerHTML = "";
    var element = document.querySelector(".cart-drawer");
    element.classList.add("opened");

    console.log(arrItems);
    if ($(`.row[data-itemid=${arrItems[el].id}]`).length == 0) {
        const markup = `<div class="row w-100 m-0 temp_${arrItems[el].id}" data-itemid="${arrItems[el].id}">
      <div class="col-lg-3"><img src="https:${arrItems[el].images}" class="card-img" alt="..."></div>
      <div class="col-lg-6 mt-2 col-mx-8"><div class="card-body">
      <p class="card-title mb-6 mb-lg-0">${arrItems[el].title}</p>
      <div class="quantity-wrapper d-inline-flex mt-mx-5 mt-lg-0">
      <div class="input-group input-group-sm">
      <div class="input-group-prepend ">
      <a href="#" title="Decrease" onclick="decrementValue('number_${arrItems[el].id}')" class="input-group-text bg-transparent border-right-0 border-secondary">
      <span class="btn-decrease"></span></a></div>
      <input type="text" name="quantity" aria-label="quantity" value=${cartqty} step="1" min="1" class="quantity py-4 px-3 form-control border-secondary font-weight-bolder text-center border-left-0 border-right-0 bg-transparent" id="number_${arrItems[el].id}" >
      <div class="input-group-append">
      <a href="#" title="Increase" class="input-group-text bg-transparent border-left-0 border-secondary" onclick="incrementValue('number_${arrItems[el].id}')">
      <span class="btn-increase" ></span></a></div></div></div></div></div><div class="col-lg-3"><a href="#" class="cartremove" onclick="cartremove(${el})">
      <img src="assets/images/remove.png" alt=""></a><h6>${arrItems[el].price}</h6></div></div>'`;
        document
            .querySelector(".cart-item")
            .insertAdjacentHTML("beforeend", markup);
    } else {
        cartqty =
            parseInt(
                $(`.row[data-itemid="${arrItems[el].id}"] .quantity-wrapper`)
                    .find(`#number_${arrItems[el].id}`)
                    .val()
            ) + parseInt(1);
        console.log(cartqty);
        $(
            `.row[data-itemid="${arrItems[el].id}"] .quantity-wrapper #number_${arrItems[el].id}`
        ).val(cartqty);
        $(`#number_${arrItems[el].id}`).html(cartqty);
    }
    cartqty = 1;
    console.log("item added");

}

function cartremove(l) {
    var n =parseInt(document.querySelector(`.temp_${arrItems[l].id} .quantity-wrapper`).parentNode.lastElementChild.lastElementChild.children[1].value);
    console.log(n);

    console.log("removed", l);
    document.querySelector(`.temp_${arrItems[l].id}`).remove();
    
    itemCount -= n;
    document.getElementById("itemCount").innerHTML = itemCount;
}
function incrementValue(l) {
    console.log("iam clicked");
    var $n = $(".quantity-wrapper").find("#" + l);
    console.log($n);
    itemCount++;
    document.getElementById("itemCount").innerHTML = itemCount;
    $n.val(Number($n.val()) + 1);
}
function decrementValue(l) {
    var $n = $(".quantity-wrapper").find("#" + l);
    var amount = Number($n.val());
    if (amount > 0) {
        $n.val(amount - 1);
        itemCount--;
        document.getElementById("itemCount").innerHTML = itemCount;
    }
}
function cartlistclose() {
    var element = document.querySelector(".cart-drawer");
    element.classList.remove("opened");
}
function carticon() {
    var element = document.querySelector(".cart-drawer");
    element.classList.add("opened");
}
function Close() {
    document.getElementById("prod").style.display = "none";
}