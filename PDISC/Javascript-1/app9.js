let miArrayDeNumeros = new Array ();
miArrayDeNumeros [0] = 2;
miArrayDeNumeros [1] = 3;
miArrayDeNumeros [2] = 4;
miArrayDeNumeros [3] = 5;
miArrayDeNumeros [4] = 6;
miArrayDeNumeros [5] = 7;
miArrayDeNumeros [6] = 8;
for (a=0; a<miArrayDeNumeros.length; a++){
  if (miArrayDeNumeros[a] % 2 === 0){
    console.log("Es par");
  }   
  else{
    console.log("Es impar");
  }

}