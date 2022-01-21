jQuery(document).ready(function($) {
  $(".ajaxcart_overlay").click(function(e) {
    $("body").removeClass("ajaxcart-open");
  });
  
  $("#ajaxCart .btn-close").click(function(e) {
    $("body").removeClass("ajaxcart-open");
  });
  
  $(".header__icon--cart").click(function(e) {
    e.preventDefault();
    $("body").addClass("ajaxcart-open");
  });
  
  jQuery(document).on("click", ".quantity-box .qty-plus", function(e) {
    var qty = parseInt($(this).parent().find(".qty-input").val());
    $(this).parent().find(".qty-input").val(qty + 1);
    $(this).parent().find(".qty-input").trigger("change");
  });
  
  jQuery(document).on("click", ".quantity-box .qty-minus", function(e) {
    var qty = parseInt($(this).parent().find(".qty-input").val());
    if(qty <= 0) {
      return;
    }
    $(this).parent().find(".qty-input").val(qty - 1);
    $(this).parent().find(".qty-input").trigger("change");
  });
  
  jQuery(document).on("change", ".quantity-box .qty-input", function(e) {
    console.log($(this).val());
    
    var datas = {};
    var qty = $(this).val();
    var cart_item = $(this).parents(".cart-item");
    datas[$(this).parents(".cart-item").attr("data-variantid")] = qty;
    console.log(datas);

    jQuery.ajax({
      type: 'POST',
      url: '/cart/update.js',
      data: {updates : datas},
      dataType: 'json',
      success: function(cart) {
        $(".btn-checkout").html("Checkout - " + Shopify.formatMoney(cart.total_price) + " kr");
        
        if(qty <= 0) {
          cart_item.remove();
        }
        
        if(cart.item_count <= 0) {
          $("#ajaxCart").addClass("empty");
        }
      }
    });
  });
  
  jQuery(document).on("click", ".cart-item .item-remove", function(e) {
    $(this).parent().find(".quantity-box .qty-input").val(0).trigger("change");
  });
});