$(document).ready(function() { 

var inventoryList = {1:11.40,2:23,3:30.8,4:40,5:50,6:10.20,7:20,8:30,9:40,10:50,11:5};
var newProductsList = {};

hideDivs();
carouselRecipes();
retrieveData();
// getProduct();
showLogIn();
addingProductsToList();
checkPassword();
resetCart();

// --------------RETRIEVE DATA FROM LOCA STORAGE--------------

function retrieveData () {			
	var frozen = localStorage.getItem("listOfProducts");
	var unfrozen = JSON.parse(frozen);
	if (unfrozen !== null) {
		newProductsList = unfrozen;
		return newProductsList;
	}
}

function resetCart () {

	$(".signup").on("click", function(){
		localStorage.clear();

	});
}

// --------------ADD PRODUCT TO LIST AND CART - TOTALIZE --------------

function addingProductsToList () {

	var totalPerProduct = {};
	displayPrices();
	checkForProduct();	

	function checkForProduct (newProductsListInStorage){
		$('.product').on("click", function (e){
		var productCode = parseInt(this.id);   
		addNewProductToList(productCode);	
		});		
		$('.positive').on("click", function (e){
		var productCode = parseInt(this.id);
		addNewProductToList(productCode);	
		});
		$('.negative').on("click", function (e){
		var productCode = parseInt(this.id);
		subtractProdcutFromList(productCode);	
		});
		$('.product-only').on("click", function (e){
		var productCode = parseInt(this.id);
		addNewProductToList(productCode);	
		});
	}	

	function addNewProductToList (productCode){		  
		if (productCode in newProductsList === false) {
			newProductsList[productCode] = 1;	
		} else {
			newProductsList[productCode] += 1;
		} displayAmount(productCode);
		
	}		

	function subtractProdcutFromList (productCode){		  
		if (newProductsList[productCode] > 0) {
			newProductsList[productCode] -= 1;
		 	displayAmount(productCode);
			checkIfProductsinList();
		}
	}			

	function displayAmount (productCode) { //display amount in line of "quantities in html"
		hideDivsFade();
		for (var i = 0; i < 11; i++) {
			if (parseInt(productCode) === i) {
				var result = String("#" +[i] + "-result");	
				$(result).text(newProductsList[productCode]);
				totalizePrices();
			}
		}
	}

	function totalizePrices () {
		for (var clientProduct in newProductsList) {
			var pricePerProduct = inventoryList[clientProduct];
			var amountPerProduct = newProductsList[clientProduct]; 
			totalPerProduct[clientProduct] = pricePerProduct * amountPerProduct;
		}  
		var totalToCart = 0;
  		for( var productCode in totalPerProduct ) {
  			if( totalPerProduct.hasOwnProperty(productCode)) {
    			totalToCart += parseFloat( totalPerProduct[productCode] );
    			totalToCart =  Math.round(totalToCart);
    		}
 		}
  		$(".totalHolder").attr("placeholder","$ " + totalToCart);
  		checkIfProductsinList(totalToCart);
	}


	function checkIfProductsinList (totalToCart){
		if (totalToCart === 0) {
			newProductsList = {};
		}
		storeData();
	}


	function storeData () {
		// console.log(newProductsList);
		var listOfProducts = newProductsList;
		var stringifiedList = JSON.stringify(listOfProducts);
		localStorage.setItem("listOfProducts",stringifiedList);
	}

	
	function displayPrices () {
		for( var product in inventoryList ) {
			for (var i = 1; i < 11; i++) {
				if ( parseInt(product)  === i ) {
					var result = String("." + [i] + "-price");
					$(result).attr("placeholder","$ "  + inventoryList[product]);	
					}	
				}			
		}
	}

	// function Product (quantity,price){
	// 	this.quantity = quantity;
	// 	this.price = price;
	// }
	// var bread = new Product (20,25);
	// var milk = new Product (10,10);

	
	function readFrozenData () {
		for (var productCodes in newProductsList) {
			var productCode = productCodes;
			displayAmount(productCode);
		}  
	}

readFrozenData();
totalizePrices();
}	

	
// --------------CAROUSEL--------------

function	carouselRecipes (){
	$(".img-recipe").ready(function(e){
		self = this;
		var cont = 1;
		loop();
		function loop (){
			setTimeout (function() {
				// DEBUG
				$("#recipe1").fadeOut(0).attr("src","img/415x234(" + cont + ").jpg").fadeIn(2000);
				$("#recipe2").fadeOut(0).attr("src","img/415x234(" + (cont+1) + ").jpg").fadeIn(2000);
				$("#recipe3").fadeOut(0).attr("src","img/415x234(" + (cont+2) + ").jpg").fadeIn(2000);
				$("#recipe4").fadeOut(0).attr("src","img/415x234(" + (cont+3) + ").jpg").fadeIn(2000);
				cont++;
					if (cont < 9) {
						loop();
					} else if (cont === 9) {
						cont = 1;
						loop();
					}
			},3000);
		}
	});
}

// --------------CHECK PASSWORD LOG IN--------------
	
function checkPassword() {
	var firstPassword = "";
	var secondPassword = "";
	$("form #password").on("keyup", function(e){
		// console.log($("#password").val().length);
		if ($("#password").val().length < 6) {
			$("#message-digits").text("Password must contain at least 6 characters");
			$("#message-digits").show();	
		}  else {
			firstPassword = $("#password").val();
			$("#message-digits").text("Secure password");
			// console.log(firstPassword);
		}
	});

	$("form #password-again").on("keyup", function(e){
			// console.log($("#password-again").val().length);
			secondPassword = $("#password-again").val();
			// console.log(secondPassword);
		if (secondPassword === firstPassword) {
			$("#conrfirm").text("Correct Log In");
			logInMessage();
		} else {	
			$("#conrfirm").text("Wrong password");
		}
	});
}


// --------------SEARCH FOR PRODUCT API--------------

function getProduct (){

	$("form").on("submit",function(e){
		e.preventDefault();
	    var productToFind = $(".inputSearch").val();
		$("li").remove();
		displayProductList(productToFind);
	});
}


function displayProductList (selectedProductFromGet) {
	$.ajax({
		url: "http://www.supermarketapi.com/api.asmx/SearchByProductName",
		type: 'GET',   
  		data: {
       		APIKEY:"9b1cf47834", 
   		 	ItemName: selectedProductFromGet
   			},
  			dataType: 'xml',
			success: function(data) {
				
				if (data.childNodes[0].childNodes[0] === undefined) {
					$("ul").text("Product does not exist! Try again please.");
				}else {
					$("ul").empty();
					$.each($(data).find('Product'),function(index,product){
					$("ul").append(("<li class=\"productSearched\">") + $("Itemname",product).text()+"</a>" +("</li>")+"<hr>");
					
					});
				}
			}  			
 	});
	displayProductImage();
}


function displayProductImage (){
	
	$("ul").on("click", ".productSearched",function(e){
		$("productImage").empty();
		var selectedProduct = $(this).text();
		$.ajax({
		url: "http://www.supermarketapi.com/api.asmx/SearchByProductName",
		type: 'GET',   
  		data: {
       		APIKEY:"9b1cf47834", 
   		 	ItemName: selectedProduct
   			},
  			dataType: 'xml',
			success: function(data) {
				var productImg =$("ItemImage",$(data).find('Product')[0]).text();
				var productDescription =$("ItemDescription",$(data).find('Product')[0]).text();
				var productCategory =$("ItemCategory",$(data).find('Product')[0]).text();
				// console.log(productImg);
				 $(".productImage").attr("src",productImg);
				 $(".description").text(productDescription);
				 $(".item-category").text("Category: " + productCategory);
				 $(".ItemName-text").text(selectedProduct);
				 console.log(selectedProduct);

			
			// WE NEED TO DO SOME APPENDING/REMOVING
			showSearchedProduct();
			$("separator-1").append(selectedProduct);
			$("separator-1").append(productImg);
			$("separator-1").append(productDescription);
			$("separator-1").append(productCategory);
			
			// $('#myModal').modal('hide');
			}

		});
	});

}

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus();
  });


// --------------UNHIDE DIV'S--------------

function showLogIn () {
	$(".loginClick").on("click", function (e) {
		hideDivsFade();
		$(".log-in-form-div").fadeIn(500);	
	});
}

function showSearchedProduct () {
	$(".searched-product-display").fadeIn(500);
}


//----------------HIDE DIV'S------------------

function hideDivs () {
	$(".searched-product-display").hide();
	$(".log-in-form-div").hide();
	$(".welcome-message").hide();

}

function hideDivsFade () {
	$(".searched-product-display").fadeOut(500);
	$(".log-in-form-div").fadeOut(500);
	$(".hide-buton").on("click",function(e){
		$(".log-in-form-div").fadeOut(500);
	});
	$(".hide-buton-search").on("click",function(e){
		$(".searched-product-display").fadeOut(500);
	});

}

//----------------AUTHORIZATION AFTER LOGIN------------------

function logInMessage (){
	$(".button-log").on("click",function (e){
		$("#login-ID").text("Hello_Camilo");
		$(".welcome-message").fadeIn(500);
		$(".log-in-form-div").fadeOut(2500);
		$(".send").removeAttr("disabled");
		$(".inputSearch").attr("placeholder", "Search");

		getProduct();


	});
}




}); //-----DO NOT REMOVE--------























