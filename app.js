$(document).ready(function() { 

function addingProductstoList () {

	ProductsList = {};
	amountOfProducts = 0;
	checkForProduct();	

	function checkForProduct (){
		$('.product').on("click", function (e){
		var productCode = parseInt(this.id);   //Takes the number out of the string to compare with amount-result number
		addNewProdcutToList(productCode);	
		});
	}	


	function addNewProdcutToList (productCode){		  
		if (productCode in ProductsList === false) {
			ProductsList[productCode] = 1;	
		} else {
			ProductsList[productCode] += 1;
		} displayAmount(productCode);
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






	addingProductstoList();
 });
