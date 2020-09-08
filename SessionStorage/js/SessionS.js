function iniciar(){
	var btnenviar = document.getElementById("btnSend");

	if(btnenviar.addEventListener){
		btnenviar.addEventListener("click", function(){
			clickCounter();
		}, false);
	}
	else{
		btnenviar.attachEvent("onclick", function(){
			clickCounter();
		});
	}
}

function clickCounter() {
  if(typeof(Storage) !== "undefined") {
    if (sessionStorage.clickcount) {
      sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
    } else {
      sessionStorage.clickcount = 1;
    }
    document.getElementById("result").innerHTML = "Usted ha dado " + sessionStorage.clickcount + " clicks.";
  } else {
    document.getElementById("result").innerHTML = "Su navegador no soporta el SessionStorage";
  }
}


//Asociando función que manejará el evento load al cargar la página
if(window.addEventListener){
	window.addEventListener("load", iniciar, false);
}
else if(window.attachEvent){
	window.attachEvent("onload", iniciar);
}