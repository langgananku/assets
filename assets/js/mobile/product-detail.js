function getVariationChoosed(){const t=[];let a="";$(".additional_field_container .additional_field.active").each((function(){const o=$(this).data("value");t.push(o),""==a?a=o:a+=" "+o})),$("#choose_list .product_choose").each((function(a){a<t.length?$(this).find("h6").text(CapitalizeFirstLetter(t[a])):$(this).find("h6").text("")}));return{productVariationClient:`${$("#product-code-data").data("product-code")}-${SortCharacters(TextToSlug(a))}`,activeValues:t}}function processToCart(t,a,o,i){const e=$("#langganan-name-data").data("langganan-name"),n=$("#langganan-slug-name-data").data("langganan-slug-name"),c=$("#product-code-data").data("product-code"),d=$(a).find(".productVariationCode").data("value"),r=$(a).find(".name").data("value"),s=$(a).find(".price").data("value"),u=$(a).find(".stock").data("value"),l=$(a).find(".imgUrl").data("value");if(o&&d&&s&&r){if(t.data("clicked"))return;t.data("clicked",!0),t.prop("disabled",!0),t.html("<h5>Memasukan...</h5>");let a=getCart();a=updateCart({companyName:e,companySlugName:n,cart:a,quantity:1,productCode:c,productVariationClient:o,activeValues:i,productVariationCode:d,name:r,price:s,stock:u,imgUrl:l}),localStorage.setItem("cart",JSON.stringify(a)),animateCartAddition(1,(function(){t.prop("disabled",!1).data("clicked",!1).html('<i class="fa fa-shopping-cart"></i><h5>Masukan ke Keranjang</h5>')}))}}function updateCart({companyName:t,companySlugName:a,cart:o,quantity:i,productCode:e,productVariationClient:n,activeValues:c,productVariationCode:d,name:r,price:s,stock:u,imgUrl:l}){let p=o.langgananku.findIndex((t=>t[a]));if(-1===p){let i={};i[a]={companyName:t,items:[]},o.langgananku.push(i),p=o.langgananku.length-1}let h=o.langgananku[p][a],f=!1;return h.items=h.items.map((t=>(t.productVariationCode===d&&(t.quantity=parseInt(t.quantity)+parseInt(i),f=!0),t))),f||h.items.push({productCode:e,productVariationCode:d,productVariationClient:n,quantity:parseInt(i),price:s,activeValues:c,name:r,stock:u,imgUrl:l,checked:!0}),{...o}}function animateCartAddition(t,a){const o=$("#cart_count"),i=$("#cart_icon");o.css({opacity:0});const e=$("<span>").text("+"+t).css({position:"fixed",top:"50%",left:"50%",fontSize:"34px",backgroundColor:"var(--info-color)",color:"var(--primary-light)",padding:"1rem",borderRadius:"50%",transform:"translate(-50%, -50%)",opacity:1,zIndex:99999999}).appendTo("body");e.animate({top:o.offset().top+$(window).scrollTop(),left:o.offset().left,fontSize:o.css("font-size"),opacity:0},500,(function(){e.remove(),o.addClass("scale-opacity-animation"),i.addClass("shake"),setTimeout((function(){o.css({opacity:1,zIndex:999}),i.removeClass("shake"),o.removeClass("scale-opacity-animation");const t=calculateTotalCartQuantity();o.text(t),"function"==typeof a&&a()}),500)}))}$(".sheet").sheet({openSheetButton:"#choose_product_variation",addToCartButton:"#add_to_cart",sheet:"#sheet_product_detail"}),$(".additional_field_container .additional_field").on("click",(function(){$(this).siblings().removeClass("active"),$(this).addClass("active");const{productVariationClient:t}=getVariationChoosed();$("#product-variation-data .product-variation-"+t).each((function(){const t=$(this).find(".price").data("value"),a=$(this).find(".stock").data("value"),o=$(this).find(".imgUrl").data("value");$("#product_container #price").html(`<h4>${rupiah(t)}</h4>`),$("#product_container #stok").html(`<h6>Stok: ${a}</h6>`),$("#product_detail_sheet_container #image img").attr("src",o)}))})),$("#direct_add_to_cart").on("click",(function(t){t.preventDefault();const a=$(this),o=$("#product-code-data").data("product-code");$("#product-variation-data .product-variation-"+o).each((function(){processToCart(a,this,o,[])}))})),$("#add_to_cart").on("click",(function(t){t.preventDefault();const a=$(this),{productVariationClient:o,activeValues:i}=getVariationChoosed();$("#product-variation-data .product-variation-"+o).each((function(){processToCart(a,this,o,i)}))}));