jQuery(document).ready(function($) {
  $(".collection_filter_tag").click(function(e) {
    $(".collection .loading-overlay").show();    
    $(".collection_filter_tag").removeClass("active");
    $(this).addClass("active");
    console.log($(this));
    var url = $(this).attr("data-href");
      
    if($(this).parents("#CollectionFiltersFormMobile").length > 0) {
      $(".mobile-facets__close").trigger("click");
    }
    
    $.ajax({
		url:	url + "?view=ajax",
		type:	'GET'
	})
	.done(function(content) {
      var tempElement = document.createElement('div');
      tempElement.innerHTML = content;

      var html = tempElement.querySelector('.collection').innerHTML;
      
      $(".collection").html(html);
      
      $(".collection-product-count").html($('.collection .grid__item').length + " products");
	})
	.fail(function(data) {})
	.always(function(data) {});
  });
});