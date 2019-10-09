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
}, 7000);

Vue.component("sellertemp", {
  props: {
    seller:{
      type: Object,
      required: true
    },
    index:{
      type: Number,
      required: true
    }
  },
  template: `<div class="card col-xl-3 col-lg-4 col-md-6 col-sm-6 p-4 border-0" data-itemid="">
    <img :src="seller.images" class="card-img-top" alt="">
    <div class="card-body mt-4">
        <a href="#" class="text-decoration-none">
            <h6 class="card-title">{{seller.title}}</h6>
        </a>
    </div>
    <div class="card-footer">
         <i class="ion ion-md-eye" id="quickview" @click.stop @click.prevent="quickView(index); $emit('open')"></i>
        <p class="card-text">$ {{(seller.price)/100}}</p>
        <a class="btn btn-outline-primary shopNow text-uppercase text-primary px-lg-7 px-sm-5 font-weight-bold" @click.stop @click.prevent = "cartList(index);$emit('add');$emit('addcart')">Shop
            now</a>
    </div>
  </div>`,
  methods: {
    quickView: function(index) {
      this.$emit("get-index", index);
    },
    cartList: function(index) {
      this.$emit("get-index", index);
    }
  }
});
Vue.component("cartitem", {
  methods:{
    removeItem(){
      this.$emit('remove',this.index);
    }
  },
  props: {
    cartitems: {
      type: Object,
      required: true
    },
    dIndex: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    // qty:{
    //   type: Array,
    //   required: true
    // }
  },
  template: `<div class="row w-100 m-0 " >
  <div class="col-lg-3"><img :src="cartitems.images[0]" class="card-img" alt="..."></div>
  <div class="col-lg-6 mt-2 col-mx-8"><div class="card-body">
  <p class="card-title mb-6 mb-lg-0">{{cartitems.title}}</p>
  <div class="quantity-wrapper d-inline-flex mt-mx-5 mt-lg-0">
  <div class="input-group input-group-sm">
  <div class="input-group-prepend">
  <a href="#" title="Decrease" class="input-group-text bg-transparent border-right-0 border-secondary" @click.prevent= "cartitems.compare_at_price_min--">
  <span class="btn-decrease"></span></a></div>
  <input type="text" name="quantity" aria-label="quantity" :value="cartitems.compare_at_price_min+1"  step="1" min="1" class="quantity py-4 px-3 form-control border-secondary font-weight-bolder text-center border-left-0 border-right-0 bg-transparent"  >
  <div class="input-group-append">
  <a href="#" title="Increase"  class="input-group-text bg-transparent border-left-0 border-secondary" @click.prevent= "cartitems.compare_at_price_min++" >
  <span class="btn-increase" ></span></a></div></div></div></div></div><div class="col-lg-3">
  <a href="#" class="cartremove" @click = "removeItem"><img src="assets/images/remove.png" alt=""></a><h6>$ {{((cartitems.price)/100)*(cartitems.compare_at_price_min+1)}}</h6></div></div>`
});
Vue.component("quicktemp", {
  props: {
    dIndex: {
      type: Number
    },
    arrItems: {
      type: Array
    },
    
  },
  template: `
  <div class="row position-fixed" id="prod" @click.stop>
    <div class="col-lg-6">
         <div class="row mt-4">
            <div class="col-lg-10 col-md-10 order-md-2 mt-md-0 mt-3">
                <div class="carousel-main">
                    <img :src="arrItems[this.dIndex].images[0]" alt="" class="w-100 ">
                    <img :src="arrItems[this.dIndex].images[1]" alt="" class="w-100">
                    <img :src="arrItems[this.dIndex].images[2]" alt="" class="w-100">
                    <img :src="arrItems[this.dIndex].images[3]" alt="" class="w-100">
                    <img :src="arrItems[this.dIndex].images[4]" alt="" class="w-100">
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-6 my-6 text-lg-left">
    <span class="d-flex justify-content-end">
    <a href="#" ><i class="ion ion-md-close" @click.prevent ="$emit('close')"></i></a>
    </span>
       <p>STEP 4 OF WASH + GO SYSTEM</p>
        <h2>{{arrItems[dIndex].title}}</h2>
        <div class="row">
            <div class="col-sm-6 ">
                <p class="price">{{arrItems[dIndex].title}}<span class="ml-2"><small class="text-muted">8 oz. bottle</small> </span></p>
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
                        <a href="#" title="Decrease" @click.prevent="$emit('dec')"
                            class="input-group-text bg-transparent border-right-0 border-secondary">
                            <span class="btn-decrease"></span>
                        </a>
                    </div>
                    <input type="text" name="quantity" aria-label="quantity" :value="arrItems[dIndex].compare_at_price_min+1" step="1" min="1"
                        class="quantity py-4 px-3 form-control border-secondary font-weight-bolder text-center border-left-0 border-right-0 bg-transparent">
                    <div class="input-group-append">
                        <a href="#" title="Increase" @click.prevent="$emit('inc')"
                            class="input-group-text bg-transparent border-left-0 border-secondary">
                            <span class="btn-increase"></span>
                        </a>
                    </div>
                </div>
            </div>
            <a href="#"
                class="btn btn-primary addToCart text-uppercase text-white px-8 px-sm-5 py-2 mb-1 ml-lg-3 font-weight-bold" @click.stop  @click.prevent = "cartList(index);$emit('add');$emit('addcart');$emit('remove-popup')">add to bag</a>
        </form></div></div>`,
        methods: {
          cartList: function(index) {
            this.$emit("get-index", index);
            // document.querySelector('.cart-drawer').classList.add("opened");
          }
        }
});

var loadMore = new Vue({
  el: "#load",
  data: {
    arrItems: [],
    file: "https://curlmix.com/collections/all?view=products.json",
    dIndex: -1,
    isactive: false,
    openedcart: false,
    cartListItem: [],
    // price : 0
  },
  methods: {
    init: function() {
      this.render();
    },
    addtocartlist() {
      let temp = this.arrItems[this.dIndex].id;
      let i;
     
      let flag = 0
      const s = this.cartListItem;
    
      if(s.length != 0){
        // console.log(s.length);
        for (let i = 0; i < s.length; i++) {
         
          if (temp === s[i].id) { //check if id exists in cart
              //increase qty
              this.arrItems[this.dIndex].compare_at_price_min++;
            
              flag = 1;
              break;
          }
        }
        if (flag === 0) {
          s.push(this.arrItems[this.dIndex]); //else push the item
          // this.cartItem++;
        }
      }
      else{ //if zero items are presnt
        s.push(this.arrItems[this.dIndex]);
        // console.log(s.length);
      }
    },
    // increase(){
    //   this.arrItems[this.dIndex].compare_at_price_min++;
    // },
    // decrease(){
    //   if(this.arrItems[this.dIndex].compare_at_price_min>0){
    //     this.arrItems[this.dIndex].compare_at_price_min--;
    //   }
    // },
    getIndex(index) {
      // console.log(index);
      this.dIndex = index;
    },
    open() {
      this.isactive = true;
    },
    close() {
      this.isactive = false;
    },
    Close() {
      if (this.isactive === true) {
          this.close();
      } else if (this.openedcart === true) {
          this.removeadd();
      }
    },
    add() {
      this.openedcart = true;
    },
    removeadd() {
      this.openedcart = false;
    },
    removeitem(index){
      console.log(this.cartListItem)
      this.cartListItem.splice(index,1);
    },
    addprice(){//subtotal price increase and decrease
      let sum=0;
      for(let p=0;p<this.cartListItem.length;p++){
        console.log(((this.cartListItem[p].compare_at_price_min)+1) * (this.cartListItem[p].price)/100);
        sum +=  ((this.cartListItem[p].compare_at_price_min)+1) * (this.cartListItem[p].price)/100;
        console.log(sum);
      }
        return sum;
    },
    render: async function() {
      try {
        const response = await fetch(this.file);
        var data = await response.json();
      } catch (error) {
        alert(error);         
      }
      // console.log(data);
      data.forEach(data => {
        this.arrItems.push(data);
        // this.qty.push(1);
      });
      // console.log(this.arrItems);
    }
  }
});
loadMore.init();




