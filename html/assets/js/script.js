function myFunction(x) {
    x.classList.toggle("change");
}

$(".button").click(function () {
    $(".mobile-navigation").toggleClass("open");
});

$(".carticon").click(function (e) {
    $(".cart-drawer").addClass("opened");
    $('body').css('overflow', 'hidden');
    e.preventDefault();
    e.stopPropagation();
});

var itemCount = 0;
var cartqty = 1;

$(".cartlist").click(function (e) {
    itemCount++;
    $('#itemCount').html(itemCount);
    
    $(".cart-drawer").addClass("opened");
    $('body').css('overflow', 'hidden');
    e.preventDefault();
    e.stopPropagation();

    var image = $(this).parents(".card").find("img").data("image");
    var title = $(this).parents(".card").find(".title-list").data("title");
    var price = $(this).parents(".card-footer").find(".card-text").data("price");
 
    console.log(image);
    console.log(title);
    console.log(price);

            var prod_id = $(this).closest('[data-product-id]').attr('data-product-id');
            console.log(prod_id);

            console.log('===',$(".cart-item").html().length);
            console.log('=====>',$('.row[data-product-id="'+prod_id+'"]').length);
           
            console.log('$',cartqty);

            if(($('.row[data-product-id="'+prod_id+'"]').length) == 0){
                $(".cart-item").append('<div class="row w-100 m-0 temp" data-product-id="'+prod_id+'"><div class="col-lg-3"><img src="'
                + image + '" class="card-img" alt="..."></div><div class="col-lg-6 mt-2 col-mx-8"><div class="card-body"><p class="card-title mb-6 mb-lg-0">'
                + title + '</p><div class="quantity-wrapper d-inline-flex mt-mx-5 mt-lg-0"><div class="input-group input-group-sm"><div class="input-group-prepend "><a href="#" title="Decrease" onclick="decrementValue()" class="input-group-text bg-transparent border-right-0 border-secondary"><span class="btn-decrease"></span></a></div><input type="text" name="quantity" aria-label="quantity" value='
                + cartqty +' step="1" min="1" class="quantity py-4 px-3 form-control border-secondary font-weight-bolder text-center border-left-0 border-right-0 bg-transparent" id="number" ><div class="input-group-append"><a href="#" title="Increase" class="input-group-text bg-transparent border-left-0 border-secondary" onclick="incrementValue()"><span class="btn-increase" ></span></a></div></div></div></div></div><div class="col-lg-3"><a href="#" class="cartremove"><img src="assets/images/remove.png" alt=""></a><h6>'
                + price + '</h6></div></div>');
            }
            else{
                console.log("**");
                cartqty = parseInt($('.row[data-product-id="'+prod_id+'"] .quantity-wrapper').find('#number').val()) + parseInt(1);
                console.log(cartqty);
                $('.row[data-product-id="'+prod_id+'"] .quantity-wrapper #number').val(cartqty);
                $('#number').html(cartqty);
            }
            cartqty=1;
            console.log("item added");
});
$(".cart-item").on("click", ".cartremove", function (event) {
    $(this).parents(".temp").remove();
    console.log(cartqty);
    itemCount--;
    $('#itemCount').html(itemCount);
    console.log(itemCount);
});

function incrementValue() {
    console.log("iam clicked");
    var $n = $(".quantity-wrapper").find("#number");
    console.log($n);
    itemCount++;
    $('#itemCount').html(itemCount);
    $n.val(Number($n.val())+1 );
}
function decrementValue() {
    var $n = $(".quantity-wrapper").find("#number");
	var amount = Number($n.val());
	if (amount > 0) {
        $n.val(amount-1);
        itemCount--;
        $('#itemCount').html(itemCount);
	}
}
$('.cart-drawer').click(function (e) {
    e.stopPropagation();
});

$('body').click(function () {
    $(".cart-drawer").removeClass("opened");
    $('body').css('overflow', 'auto');
});
$(".closeicon").click(function() {
    $(".cart-drawer").removeClass("opened");
    $('body').css('overflow', 'auto');
});
$(".widget h6").click(
    function () {
        $(this).parent().toggleClass('active');
    }
);
function Function() {
    document.getElementById("search").classList.toggle("show");
}
window.onclick = function (event) {
    if (!event.target.matches('.iconone')) {
        var dropdowns = document.getElementsByClassName("searchbox");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            }
        }
    }
}
$('.ba-slider').beforeAfter();