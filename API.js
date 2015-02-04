$(document).ready(function() { 

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
       		APIKEY:"9b1cf47834", //Recuerda esconderla
   		 	ItemName: selectedProductFromGet
   			},
  			dataType: 'xml',
			success: function(data) {
				
				if (data.childNodes[0].childNodes[0] === undefined) {
					$("h4").text("Product does not exist! Try again please.");
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
		// $(document).load("search.html");
		// window.location.href = "search.html";
		$("productImage").empty();
		var selectedProduct = $(this).text();


		
		$.ajax({
		url: "http://www.supermarketapi.com/api.asmx/SearchByProductName",
		type: 'GET',   
  		data: {
       		APIKEY:"9b1cf47834", //Recuerda esconderla
   		 	ItemName: selectedProduct
   			},
  			dataType: 'xml',
			success: function(data) {
				var productImg =$("ItemImage",$(data).find('Product')[0]).text();
				var productDescription =$("ItemDescription",$(data).find('Product')[0]).text();
				var productCategory =$("ItemCategory",$(data).find('Product')[0]).text();
				console.log(productImg);
				 $(".productImage").attr("src",productImg);
				 $(".description").text(productDescription);
				 $(".item-category").text(productCategory);
			
			// WE NEED TO DO SOME APPENDING/REMOVING
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



$(document).ready(getProduct);
});