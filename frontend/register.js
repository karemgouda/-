function validate_form(){
	document.getElementById('error_label').style.color = "";
	
	for(var i = 0; i < document.regForm.elements.length; i++){
		document.regForm.elements[i].style.borderColor = 'green';
		if(document.regForm.elements[i].className == "required")
		{
			if(document.regForm.elements[i].value == ""){
				document.regForm.elements[i].style.borderColor = 'red';
				document.regForm.elements[i].focus();
				document.getElementById('error_label').style.color = "red";
				document.getElementById('error_label').innerHTML = ("Error, " + document.regForm.elements[i].name + " is required!");
				return;
			}
		}
	}
	
	if(document.regForm.pass.value.length < 8){
		document.getElementById('error_label').style.color = "red";
		document.getElementById('error_label').innerHTML = ("Error, password must be 9 charchaters or more!");
		
		document.regForm.pass.focus();
		document.regForm.pass.value = "";
		document.regForm.pass2.value = "";
		return;
	}
	if(document.regForm.pass.value != document.regForm.pass2.value){
		document.getElementById('error_label').style.color = "red";
		document.getElementById('error_label').innerHTML = ("Error, password and repeated password do not match!");
		
		document.regForm.pass.focus();
		document.regForm.pass.value = "";
		document.regForm.pass2.value = "";
		
		return;
	}
}