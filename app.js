$(document).ready(function() { 

var inventoryList = {1:11.40,2:23,3:30.8,4:40,5:50,6:10.20,7:20,8:30,9:40,10:50};
var newProductsList = {};

carouselRecipes();
retrieveData();
addingProductsToList();
checkPassword();

// RETRIEVE DATA FROM LOCA STORAGE

function retrieveData () {			
	var frozen = localStorage.getItem("listOfProducts");
	var unfrozen = JSON.parse(frozen);
	if (unfrozen !== null) {
		newProductsList = unfrozen;
		return newProductsList;
	}
}

// ADD PRODUCT TO LIST AND CART - TOTALIZE

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
		console.log(newProductsList);
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

	
// CAROUSEL OF PICTURESON TOP

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

// CHECK PASSWORD LOG IN
	
function checkPassword() {
	var firstPassword = "";
	var secondPassword = "";
	$("form #password").on("keyup", function(e){
		console.log($("#password").val().length);
		if ($("#password").val().length < 6) {
			$("#message-digits").text("Password must contain at least 6 characters");
			$("#message-digits").show();	
		}  else {
			firstPassword = $("#password").val();
			$("#message-digits").text("Secure password");
			console.log(firstPassword);
		}
	});

	$("form #password-again").on("keyup", function(e){
			console.log($("#password-again").val().length);
			secondPassword = $("#password-again").val();
			console.log(secondPassword);
		if (secondPassword === firstPassword) {
			$("#cornfirm").text("Correct Log In");
			$("#button-log").attr("onClick","parent.location='index.html'");					
		} else {
			$("#cornfirm").text("Wrong password");
		}
	});
}







});























