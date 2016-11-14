// Select all elements with data-toggle="tooltips" in the document
$('[data-toggle="tooltip"]').tooltip();

// Select a specified element
$('#myTooltip').tooltip(); 



//$('#my_button').on('click'(function(){
  
  //$(".alert").hide().show('medium');
//});

$("#my_button").click(function(){
  
  $(".alert").hide().delay(2500).show('medium');
});

