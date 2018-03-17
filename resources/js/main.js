var products = []

$(document).ready(function () {
    
    $.getJSON("https://private-70cb45-aobara.apiary-mock.com/product/list", function(result){
    $.each(result, function(i, field){
        $("#product-select").append("<option value=" + field.id + ">" + field.description + "</option>");
        products.push(field);
    });

    
    $("#product-number").attr({
        value: products[0].minQuantity,
        min: products[0].minQuantity,
    });
    updatePrice();
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    });
    
});

function updateProduct () {
    select_product = $("#product-select").val();
    $("#product-number").attr({
        value: products[select_product - 1].minQuantity,
        min: products[select_product - 1].minQuantity,
    }).val(products[select_product - 1].minQuantity);
    //$("#product-select__price").text(products[a - 1].unitPriceInCents * products[a - 1].minQuantity);
    updatePrice();
}

function updatePrice() {
    select_product = $("#product-select").val();
    number_product = $("#product-number").val();
    $("#product-select__price").text("$ " + products[select_product - 1].unitPriceInCents * number_product);
}