var collection = {
  arrItems: [],
  file: "https://curlmix.com/collections/all?view=products.json",
  count: 0,
  itemCount: 0,
  cartqty: 1,
  init: function() {
    this.cacheDom();
    this.render();
    
   document.querySelector('body').addEventListener('click', function(e){
    console.log(e.target);
    if((e.target).matches('.cart-drawer')===false){
      document.querySelector('.cart-drawer').classList.remove("opened");
      collection.cartlistclose();
    }
    if((e.target).matches('#prod') === false){
     collection.Close();
    }
   })
   document.querySelector('.carticon').addEventListener('click', function(e){
     e.stopPropagation();
   });

   document.querySelector('.cart-drawer').addEventListener('click', function(e){
    e.stopPropagation();
  });
  document.querySelector('#prod').addEventListener('click', function(e){
    e.stopPropagation();
    if((e.target).matches('.addToCart')){
      e.stopPropagation();
      e.preventDefault();
    }
  });

  document.querySelector('#load').addEventListener('click', function(e){
    if((e.target).matches('.shopNow')){
      e.stopPropagation();
      document.querySelector('body').style.overflowY = 'hidden';
    }
    if((e.target).matches('#quickview')){
      e.stopPropagation();
      document.querySelector('body').style.overflowY = 'hidden';
    }
    

  })
  },
  cacheDom: function() {
    this.$loadsection = document.getElementById("load");
    this.$quickbtn = document.getElementById("quickview");
    this.$quickview = document.getElementById("prod");
    this.$count = document.getElementById("itemCount");
    this.$cartdraw = document.querySelector(".cart-drawer");
    this.$cartitem = document.querySelector(".cart-item");
  },
  render: async function() {
    try {
      const response = await fetch(this.file);
      var data = await response.json();
    } catch (error) {
      alert(error);
    }
    console.log(data);
    data.forEach(data => {
      this.arrItems.push(data);
    });

    for (i = this.count; i <= this.arrItems.length; i++) {
      const markup = `
        <div class="card col-xl-3 col-lg-4 col-md-6 col-sm-6 p-4 border-0" data-itemid="${this.arrItems[i].id}">
              <img src="https:${this.arrItems[i].images}" class="card-img-top" alt="">
                  <div class="card-body mt-4">
                      <a href="#" class="text-decoration-none">
                          <h6 class="card-title">${this.arrItems[i].title}</h6>
                      </a>
                  </div>
                  <div class="card-footer">
                  <i class="ion ion-md-eye" id="quickview" onclick="collection.quickView(${i})"></i>
                      <p class="card-text">${this.arrItems[i].price}</p>
                      <a class="btn btn-outline-primary shopNow text-uppercase text-primary px-lg-7 px-sm-5 font-weight-bold" onclick="collection.cartList(${i})">Shop now</a>
                  </div>
        </div>`;
      this.$loadsection.insertAdjacentHTML("beforeend", markup);
    }
  },
  quickView: function(e) {
    console.log("test");
    this.$quickview.innerHTML = "";

    const markup1 = `
      <div class="col-lg-6">
         <div class="row mt-4">
            <div class="col-lg-10 col-md-10 order-md-2 mt-md-0 mt-3">
                <div class="carousel-main">
                    <img src="https:${
                      this.arrItems[e].images[0]
                    }" alt="" class="w-100 ">
                    <img src="https:${
                      this.arrItems[e].images[1]
                    }" alt="" class="w-100">
                    <img src="https:${
                      this.arrItems[e].images[2]
                    }" alt="" class="w-100">
                    <img src="https:${
                      this.arrItems[e].images[3]
                    }" alt="" class="w-100">
                    <img src="https:${
                      this.arrItems[e].images[4]
                    }" alt="" class="w-100">
                </div>
            </div>
  
        </div>
    </div>
    <div class="col-lg-6 my-6 text-lg-left">
    <span class="d-flex justify-content-end"><i class="ion ion-md-close" onclick="collection.Close(${e})"></i></span>
       <p>STEP 4 OF WASH + GO SYSTEM</p>
        <h2>${this.arrItems[e].title}</h2>
    
        <div class="row">
            <div class="col-sm-6 ">
                <p class="price">${
                  this.arrItems[e].price
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
                class="btn btn-primary addToCart text-uppercase text-white px-8 px-sm-5 py-2 mb-1 ml-lg-3 font-weight-bold" onclick="collection.cartList(${e})">add
                to
                bag</a>
        </form>
    
    </div>`;

    this.$quickview.insertAdjacentHTML("beforeend", markup1);
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
    this.$quickview.style.display = "flex";
  },
  cartList: function(el,event) {
    this.itemCount++;
    // event.stopPropagation();
    // event.preventDefault();
    this.$count.innerHTML = this.itemCount;
    this.$quickview.style.display = "none";
    // document.querySelector('.closeicon').innerHTML = "";
    this.$cartdraw.classList.add("opened");

    if ($(`.row[data-itemid=${this.arrItems[el].id}]`).length == 0) {
      const markup = `<div class="row w-100 m-0 temp_${this.arrItems[el].id}" data-itemid="${this.arrItems[el].id}">
      <div class="col-lg-3"><img src="https:${this.arrItems[el].images}" class="card-img" alt="..."></div>
      <div class="col-lg-6 mt-2 col-mx-8"><div class="card-body">
      <p class="card-title mb-6 mb-lg-0">${this.arrItems[el].title}</p>
      <div class="quantity-wrapper d-inline-flex mt-mx-5 mt-lg-0">
      <div class="input-group input-group-sm">
      <div class="input-group-prepend">
      <a href="#" title="Decrease" onclick="collection.decrementValue('number_${this.arrItems[el].id}')" class="input-group-text bg-transparent border-right-0 border-secondary">
      <span class="btn-decrease"></span></a></div>
      <input type="text" name="quantity" aria-label="quantity" value=${this.cartqty} step="1" min="1" class="quantity py-4 px-3 form-control border-secondary font-weight-bolder text-center border-left-0 border-right-0 bg-transparent" id="number_${this.arrItems[el].id}" >
      <div class="input-group-append">
      <a href="#" title="Increase" class="input-group-text bg-transparent border-left-0 border-secondary" onclick="collection.incrementValue('number_${this.arrItems[el].id}')">
      <span class="btn-increase" ></span></a></div></div></div></div></div><div class="col-lg-3"><a href="#" class="cartremove" onclick="collection.cartRemove(${el})">
      <img src="assets/images/remove.png" alt=""></a><h6>${this.arrItems[el].price}</h6></div></div>'`;
      this.$cartitem.insertAdjacentHTML("beforeend", markup);
    } else {
      this.cartqty =
        parseInt(
          $(`.row[data-itemid="${this.arrItems[el].id}"] .quantity-wrapper`)
            .find(`#number_${this.arrItems[el].id}`)
            .val()
        ) + parseInt(1);
      console.log(this.cartqty);
      $(
        `.row[data-itemid="${this.arrItems[el].id}"] .quantity-wrapper #number_${this.arrItems[el].id}`
      ).val(this.cartqty);
      $(`#number_${this.arrItems[el].id}`).html(this.cartqty);
    }
    this.cartqty = 1;
    console.log("item added");
  },
  incrementValue: function(l) {
    console.log("iam clicked");
    var $n = $(".quantity-wrapper").find("#" + l);
    console.log($n);
    this.itemCount++;
    document.getElementById("itemCount").innerHTML = this.itemCount;
    $n.val(Number($n.val()) + 1);
  },
  decrementValue: function(l) {
    var $n = $(".quantity-wrapper").find("#" + l);
    var amount = Number($n.val());
    if (amount > 0) {
      $n.val(amount - 1);
      this.itemCount--;
      document.getElementById("itemCount").innerHTML = this.itemCount;
    }
  },
  cartRemove: function(l) {

    var n =parseInt(document.querySelector(`.temp_${this.arrItems[l].id} .quantity-wrapper`).parentNode.lastElementChild.lastElementChild.children[1].value);

    document.querySelector(`.temp_${this.arrItems[l].id}`).remove();
    
    this.itemCount -= n;
    this.$count.innerHTML = this.itemCount;
    

  },
  cartlistclose: function() {
     this.$cartdraw.classList.remove("opened");
     document.querySelector('body').style.overflowY = 'scroll'
  },
  carticon: function(e) {

    this.$cartdraw.classList.add("opened");
    document.querySelector('body').style.overflowY = 'hidden';
    
  },
  Close: function() {
    this.$quickview.style.display = "none";
    document.querySelector('body').style.overflowY = 'scroll';
  },
};
collection.init();

