$(document).ready(function() { 

function addingProductsToList () {

	var newProductsList = {};
	var inventoryList = {1:10,2:20,3:30,4:40,5:50,6:10,7:20,8:30,9:40,10:50};
	var totalPerProduct = {};
	
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


	function displayAmount (productCode) {
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
  		console.log(totalToCart);
  		$(".totalHolder").attr("placeholder",totalToCart);
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
