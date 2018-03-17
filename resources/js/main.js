var products = []
var imgs = []

$(document).ready(function () {
    
    $.getJSON("https://private-70cb45-aobara.apiary-mock.com/product/list", function(result){
    $.each(result, function(i, field){
        $("#product-select").append("<option value=" + field.id + ">" + field.description + "</option>");
        field.unitPriceInCents = field.unitPriceInCents / 100;
        products.push(field);
    });

    
    $("#product-number").attr({
        value: products[0].minQuantity,
        min: products[0].minQuantity,
    });
    updatePrice();

    $.getJSON("https://private-70cb45-aobara.apiary-mock.com/related-product/list", function(result){
        $.each(result, function(i, field){
            $("#related-product .container-fluid .row").append(
                "<div class='col-sm-3 description__related'>" +
                    "<img src='" + field.pictureUrl +"' alt='related-product' class='description__related-img'>" +
                    "<h5 class='description__related-title'>" + field.title + "</h5>" +
                    "<h6 class='description__related-price'><i class='far fa-credit-card'></i> desde " + field.fromPrice + "</h6>" +
                    "<p class='description__related-description'>" + field.description + "</p>" +
                    "<input type='button' class='btn btn-default description__related-btn' value='CONTRATAR'/>" +
                "</div>"
            );
        });

    });
    
    $.getJSON("https://private-70cb45-aobara.apiary-mock.com/product/" + products[0].id + "/photos", function(result){
        $.each(result, function(i, photo){
            $("#gallery-thumbnail").append("<input type='image' src='" + photo.url + "' onclick='changeImg(this)' class='img-responsive'>");
            
            imgs.push(photo)
        });   
        $("#gallery-main").append("<img src='" + imgs[0].url + "' alt='main-product_image' class='img-responsive'>");
    });

    
    });
    document.getElementsByTagName("html")[0].style.visibility = "visible";
});

function updateProduct () {
    select_product = $("#product-select").val();
    $("#product-number").attr({
        value: products[select_product - 1].minQuantity,
        min: products[select_product - 1].minQuantity,
    }).val(products[select_product - 1].minQuantity);
    updatePrice();
    updateGallery(select_product);
}

function updatePrice() {
    select_product = $("#product-select").val();
    number_product = $("#product-number").val();
    $("#product-select__price").text("$ " + products[select_product - 1].unitPriceInCents * number_product);
}

function quantityUp() {
    currentup = $("#product-number").val();
    $("#product-number").val(Number(currentup) + 1);
    updatePrice();
}

function quantityDown() {
    currentdown = $("#product-number").val();
    minval = $("#product-number").attr("min");
    if(currentdown > minval){
        $("#product-number").val(Number(currentdown) - 1);
        updatePrice();
    }
}

function changeImg(element){
    newImg = $(element).attr("src");
    $("#gallery-main img").attr("src", newImg);
}

function updateGallery(id){
    var img_holder = [];
    
    $.getJSON("https://private-70cb45-aobara.apiary-mock.com/product/" + id + "/photos", function(result){
        $("#gallery-thumbnail").empty();
        $.each(result, function(i, photo){
            
            $("#gallery-thumbnail").append("<input type='image' src='" + photo.url + "' onclick='changeImg(this)' class='img-responsive'>");
            
            img_holder.push(photo)
        });  
        $("#gallery-main img").attr("src", img_holder[0].url);
    });
}