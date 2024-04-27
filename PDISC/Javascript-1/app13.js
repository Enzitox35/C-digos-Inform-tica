Frutas = new Array();
Frutas [0] = 1;
Frutas [1] = 2;
Frutas [2] = 3;
Frutas [3] = 4;
let aux=0;
for (a=0; a<Frutas.length ;a++){
    console.log(Frutas[a]);
    aux = aux + Frutas[a];
}
console.log("La suma de todos los numeros en el Array es ",aux);

function mostrarFruta (Fruta){    
console.log(Fruta);
}

mostrarFruta(Frutas[2]);

function encontrarLargoPalabras(Fruta){
}

//ejemplo
let objs = [
    {marca:"VW 1", motor:"1.6"},
    {marca:"Ford 2", motor:"1.0"},
    {marca:"Chevrolet 3", motor:"2.6"},

];

function mostrarAuto(auto){
    console.log("marca",auto.marca,"motor",auto.motor);
}

mostrarAuto2 = (auto)=>{
    console.log("La marca de su auto es ",auto.marca," con un motor de ",auto.motor, " c3");
};

objs.forEach(miauto=>{
    mostrarAuto(miauto);
    mostrarAuto2(miauto);
})

