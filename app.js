$(document).ready(function() { 

function addingProductsToList () {

	ProductsList = {};
	amountOfProducts = 0;
	checkForProduct();	

	function checkForProduct (){
		$('.product').on("click", function (e){
		var productCode = parseInt(this.id);   //Takes the number out of the string to compare with amount-result number
		addNewProdcutToList(productCode);	
		});		
		$('.positive').on("click", function (e){
		var productCode = parseInt(this.id);
		addNewProdcutToList(productCode);	
		});
		$('.negative').on("click", function (e){
		var productCode = parseInt(this.id);
		console.log(productCode);
		subtractProdcutFromList(productCode);	
		});
	}	

	function addNewProdcutToList (productCode){		  
		if (productCode in ProductsList === false) {
			ProductsList[productCode] = 1;	
		} else {
			ProductsList[productCode] += 1;
		} displayAmount(productCode);
	}		

	function subtractProdcutFromList (productCode){		  
		if (ProductsList[productCode] > 0) {
			ProductsList[productCode] -= 1;
		 	displayAmount(productCode);
		}
	}			


	function displayAmount (productCode) {
			for (var i = 0; i < 11; i++) {
				if (productCode === i) {
					var result = String("#" +[i] + "-result");	
					$(result).text(ProductsList[productCode]);
				
				}
			}
	}
}	






	addingProductsToList();
 });
