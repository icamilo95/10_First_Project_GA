$(document).ready(function() { 

var inventoryList = {1:11,2:23,3:30,4:40,5:50,6:10,7:20,8:30,9:40,10:50,11:10}; //change display amount
var newProductsList = {};

hideDivs();
carouselRecipes();
retrieveData();
showLogIn();
addingProductsToList();
checkPassword();
resetCart();
supporting();

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
		$('.product,.positive,.product-only').on("click", function (e){
		var productCode = parseInt(this.id);   
		addNewProductToList(productCode);	
		console.log("Codigo" + productCode);
		});		

		$('.negative').on("click", function (e){
		var productCode = parseInt(this.id);
		subtractProdcutFromList(productCode);	
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

	function displayAmount (productCode) { 
		hideDivsFade();
		for (var i = 0; i < 12; i++) {
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


	function checkIfProductsinList (totalToCart){ //Empties the array if customer decreases all products to 0
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
				$("#recipe1").fadeOut(0).attr("src","img/415x234(" + cont + ").jpg").fadeIn(1000);
				$("#recipe2").fadeOut(0).attr("src","img/415x234(" + (cont+1) + ").jpg").fadeIn(1000);
				$("#recipe3").fadeOut(0).attr("src","img/415x234(" + (cont+2) + ").jpg").fadeIn(1000);
				$("#recipe4").fadeOut(0).attr("src","img/415x234(" + (cont+3) + ").jpg").fadeIn(1000);
				cont++;
					if (cont < 11) {
						loop();
					} else if (cont === 11) {
						cont = 1;
						loop();
					}
			},4500);
		}
	});
}

// --------------CHECK PASSWORD LOG IN--------------
	
function checkPassword() {
	var firstPassword = "";
	var secondPassword = "";
	$("form #password").on("keyup", function(e){
		
		if ($("#password").val().length < 2) {
			$("#message-digits").text("Password must contain at least 6 characters");
			$("#message-digits").show();	
		}  else {
			firstPassword = $("#password").val();
			$("#message-digits").text(" Secure password. Welcome to Foodapp !! ");
			
		}
	});

	$("form #password-again").on("keyup", function(e){
		secondPassword = $("#password-again").val();
		if (secondPassword === firstPassword) {
			$("#conrfirm").text("!! Correct Log In !!");
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
					var c = 0;
					$.each($(data).find('Product'),function(index,product){
					c++;
					$("ul").append(("<li class=\"productSearched\">") + $("Itemname",product).text()+"</a>" +("</li>")+"<hr>");
					
					if (c > 6) {
						return false;	
					}
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
				 $(".productImage").attr("src",productImg);
				 $(".description").text(productDescription);
				 $(".item-category").text("Category: " + productCategory);
				 $(".ItemName-text").text(selectedProduct);
				 console.log(selectedProduct);

			
			// WE NEED TO DO SOME APPENDING/REMOVING
			showSearchedProduct();
			$("separator-1").append(selectedProduct + "<hr>");
			$("separator-1").append(productImg);
			$("separator-1").append(productDescription);
			$("separator-1").append(productCategory);
			
			}
		});
	});
}

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus();
  });


// --------------UNHIDE DIV'S--------------

function showLogIn () {
	$(".loginClick").on("click", function () {
		hideDivsFade();
		$(".log-in-form-div").fadeIn(500);	
	});
}

function showSearchedProduct () {
	$(".searched-product-display").fadeIn(500);
}

function supporting() {
	$(".support-button").on("click", function () {
		$(".supportUser").fadeIn(500);
		hideDivsFade();
	});

}

//----------------HIDE DIV'S------------------

function hideDivs () {
	$(".searched-product-display,.log-in-form-div, .back-welcome, .welcome-message, .supportUser").hide();
}

function hideDivsFade () {
	$(".searched-product-display").fadeOut(500);
	$(".log-in-form-div").fadeOut(500);

	$(".hide-buton-search, .back-welcome").on("click",function(e){
		$(".searched-product-display,.supportUser,.log-in-form-div ").fadeOut(500);
	});
}

//----------------AUTHORIZATION AFTER LOGIN------------------

function logInMessage (){
	$(".button-log").on("click",function (e){
		$(".table-login").fadeOut(0);
		$("#login-ID").text("My Account");
		$(".back-welcome").fadeIn(0);
		$(".welcome-message").fadeIn(500);
		$(".log-in-form-div").fadeOut(3000);
		$(".send").removeAttr("disabled");
		$(".inputSearch").attr("placeholder", "Search");
		getProduct();
	});
}




}); //-----DO NOT REMOVE--------




