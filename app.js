$(document).ready(function() { 

function addingProductsToList () {

	var newProductsList = {};
	var inventoryList = {1:11.30,2:23.00,3:30.00,4:40.00,5:50.00,6:10.20,7:20.00,8:30.00,9:40.00,10:50.00};
	var totalPerProduct = {};
	displayPrices();
	checkForProduct();	
	
	var test = 0; //

	function checkForProduct (newProductsListInStorage){
		console.log(typeof(newProductsListInStorage) + "ca");
		if (newProductsListInStorage === "object") {
			// console.log("camilo");
		}


		$('.product').on("click", function (e){
		var productCode = parseInt(this.id);   
		addNewProdcutToList(productCode);	
		});		
		$('.positive').on("click", function (e){
		var productCode = parseInt(this.id);
		addNewProdcutToList(productCode);	
		});
		$('.negative').on("click", function (e){
		var productCode = parseInt(this.id);
		subtractProdcutFromList(productCode);	
		});
	}	

	function addNewProdcutToList (productCode){		  
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
		}
	}			


	function displayAmount (productCode) { //display amount in line of "quantities in html"
		for (var i = 0; i < 11; i++) {
			if (productCode === i) {
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
  		storeData();
	}


	function storeData () {
		var listOfProducts = newProductsList;
		var stringifiedList = JSON.stringify(listOfProducts);
		localStorage.setItem("listOfProducts",stringifiedList);
		retrieveData(listOfProducts);
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

	



totalizePrices();
}	

	function retrieveData (listOfProducts) {	//IT is inside the add function in this moment
		if (typeof(listOfProducts) === 'object') {
			var frozen = localStorage.getItem("listOfProducts");
			var unfrozen = JSON.parse(frozen);
			
		}	
	}

	function	carouselRecipes (){
		$(".img-recipe").on("mouseover",function(e){
			// $(this).attr("src","img/415x234(" + 2 + ").jpg");
			// console.log($(this));
			self = this;
			var cont = 1;
			loop();
			function loop (){
				setTimeout (function() {
					console.log($(self).attr("src","img/415x234(" + cont + ").jpg"));
					$(self).attr("src","img/415x234(" + cont + ").jpg");
					cont++;
						if (cont < 9) {
							loop();
						}	
				},3000);
			}
		});
	}


carouselRecipes();
addingProductsToList();
retrieveData();

});























