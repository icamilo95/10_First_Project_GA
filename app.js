$(document).ready(function() { 


	function addProducts (){
		contProducts = 1;
		$('.product-1').on("click", function (e){
			var productCode = parseInt(this.id);   //Takes the number out of the string to compare with amount-result number
			for (var i = 0; i < 9; i++) {
				if (productCode === i) {
					var result = String("#" +[i] + "-result");	
					$(result).text(contProducts++);
				}
			}
		});
	}






	addProducts();
 });
