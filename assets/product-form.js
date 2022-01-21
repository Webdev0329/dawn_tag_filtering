class ProductForm extends HTMLElement {
  constructor() {
    super();   

    this.form = this.querySelector('form');
    this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
    this.cartNotification = document.querySelector('cart-notification');
  }
  
  function buildCart(cart) {
    console.log(cart);
    
    if(cart.item_count > 0) {
      $("#ajaxCart").removeClass("empty");
    }
    else {
      $("#ajaxCart").addClass("empty");
    }
    
    $("#ajaxCart .cart-body").empty();
    
    var html = "";
    for(var i = 0; i < cart.items.length; i ++) {
      var item = cart.items[i];
      html += "<div class='cart-item' data-variantid='" + item.variant_id + "'>"
             +   "<div class='item-image'>"
             +     "<img src='" + item.featured_image.url + "'>"
             +   "</div>"
             +   "<div class='item-content'>"
             +     "<div class='item-row'> <span class='item-title'>" + item.title.split("-")[0] + "</span> </div>"
             +     "<div class='item-row'>"
             +       "<span class='item-variant'>" + item.title.split("-")[1] + "</span>"
             +     "</div>"
             +     "<div class='item-row'>" 
             +       "<span class='item-price'>" + Shopify.formatMoney(item.price) + " kr </span>"
             +     "</div>"
             +     "<div class='item-row'>"
             +       "<div class='quantity-box'>"
             +         "<button class='qty-minus'> - </button>"
             +         "<input type='number' class='qty-input' value='" + item.quantity + "'>"
             +         "<button class='qty-plus'> + </button>"
             +       "</div>"
             +       "<a class='item-remove'>Remove</a>"
             +     "</div>"
             +   "</div>"
             + "</div>";
    }    
    
    $("#ajaxCart .cart-body").append(html);
    
    $("body").addClass("ajaxcart-open");
  }

  onSubmitHandler(evt) {
    evt.preventDefault();
    this.cartNotification.setActiveElement(document.activeElement);
    
    const submitButton = this.querySelector('[type="submit"]');

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('loading');

    const body = JSON.stringify({
      ...JSON.parse(serializeForm(this.form)),
      sections: this.cartNotification.getSectionsToRender().map((section) => section.id),
      sections_url: window.location.pathname
    });
    
    var pform = this;

    fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
      .then((response) => response.json())
      .then((parsedState) => {
      	console.log("product-form.js - product added");
        this.cartNotification.renderContents(parsedState);
      
      	jQuery.getJSON('/cart.js', function(cart) {
          pform.buildCart(cart);
        });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        submitButton.classList.remove('loading');
        submitButton.removeAttribute('disabled');
      });
  }
}

customElements.define('product-form', ProductForm);
