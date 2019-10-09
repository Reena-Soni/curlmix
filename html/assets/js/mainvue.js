var load = new Vue({
  el: "a#lod",
  data: {
    file: "https://curlmix.com/collections/all?view=products.json",
    arrItems: []
  },
  methods: {
    init() {
      this.render();
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
      console.log(this.arrItems);
    }
  }
});
load.init();

Vue.component("sellertemp", {
  props: {
    seller: {
      type: Object,
      required: true
    },
    index: {
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
  </div>`
});
