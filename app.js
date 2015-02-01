$(document).ready(function() { 

function addingProductsToList () {

	var newProductsList = {};
	var inventoryList = {1:11.30,2:23.00,3:30.00,4:40.00,5:50.00,6:10.20,7:20.00,8:30.00,9:40.00,10:50.00};
	var totalPerProduct = {};
	displayPrices();
	checkForProduct();	
	
	

	function checkForProduct (){
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


	function displayAmount (productCode) { //display amount in line of quantities
		for (var i = 0; i < 11; i++) {
			if (productCode === i) {
				var result = String("#" +[i] + "-result");	
				$(result).text(newProductsList[productCode]);
				totalize();
			}
		}
	}

	function totalize () {
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


totalize();
}	
addingProductsToList();

});
