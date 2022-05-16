// programa para calcular staking de criptomonedas, mientras el usuario deje mas tiempo las criptos mas interes generara.

const listaCriptos = [];
let lista = document.querySelector("#listaPorcentajes");

// fetch("./json/criptos.json")
// .then((response) => response.json())
// .then ((data) => {
//     data.forEach((element) =>{
//         lista.innerHTML += `<div class='info'> <img src="${element.logo}"> <p> %${element.porcentaje*100} <strong>Al hacer Stake de ${element.nombre} recibirás el porcentaje indicado mulitplicado por la cantidad de meses que deseas conservarlo</strong> </p>  </div>`;
//     })
// })


// al pulsar ENTER se crearan 'x' formularios, dependiendo del numero que coloquemos.
document.querySelector("#cantidad_criptos").addEventListener("keydown", (event) => {
    if(event.keyCode == 13){ 
        let numero = document.querySelector('#cantidad_criptos').value;
        if (numero > 10){
            Toastify({
                text: "Recuerda que el máximo de criptos que puedes hacer stake es de 10!",
                duration: 3000,
                gravity: 'bottom',
                position: 'left',
                style: {
                    background: 'linear-gradient(to right, #8C4968, #383EA6)'
                }
            }).showToast();
        } else {
            document.querySelector('.pregunta').style.display = 'none';
            document.querySelector('#cantidad_criptos').style.display = 'none';
        document.querySelector('#stake').style.display = "inline-block";
        let formulario = document.querySelector("#formularios");
        formulario.innerHTML = ``;
        for (let i = 0; i<document.querySelector("#cantidad_criptos").value;i++){

           formulario.innerHTML += " <form class ='selectorCriptos'>             <select id='criptos'>                <option value='BTC'>BTC</option>                <option value='ETH'>ETH</option>                <option value='ADA'>ADA</option>                <option value='SOL'>SOL</option>                <option value='USDT'>USDT</option> <option value='BNB'>BNB</option> <option value='USDC'>USDC</option> <option value='XRP'>XRP</option> <option value='DOGE'>DOGE</option> <option value='LUNA'>LUNA</option>            </select>        <br><br>            <input type='number' id='cantidad' placeholder='¿Cuánta cantidad?'>        <br><br>        <input type='number' id='meses' placeholder='¿Cuántos Meses?'>  </form> <br><br>"        }}
           
           
    }
} );


// al hacer click en el boton stake nos creara una lista que nos dirá cuantas criptos recibiremos al cabo de los meses seleccionados
// solo funciona al hacer un solo click, si hacemos mas se rompe
document.querySelector("#stake").addEventListener("click", ()=>{
    let criptos = document.querySelectorAll("#criptos");
    let cantidades = document.querySelectorAll("#cantidad");
    let meses = document.querySelectorAll("#meses");
    if(listaCriptos.length == 0){
    for (let i=0; i<criptos.length;i++){
        listaCriptos.push({nombre:criptos[i].value, cantidad:  cantidades[i].value, meses:meses[i].value});
        
        
    }

    
    for (const cripto of listaCriptos) {
        let li = document.createElement("li");
        let total = calcularInteres(cripto.nombre,cripto.cantidad,cripto.meses);
        let total2;
        total.then((value)=> total2=value);
        
        
        fetch("./json/criptos.json")
       .then((response)=> response.json())
       .then((data) => {
           data.forEach((element)=>{
               if (cripto.nombre == element.token){
                   
                //    let logo = `<img src =" ${element.logo}"`;
                   li.innerHTML = `<img src="${element.logo}">` + "  Usted recibirá " + total2 + " " + cripto.nombre + " al cabo de " + cripto.meses + " mes(es)." ;
                   document.getElementById("listaCriptos").append(li);
               }
           })
       });

       
       
       
       
        // li.innerHTML = cripto.nombre +": Usted recibirá " + (parseInt(cripto.cantidad) + parseInt(calcularInteres(cripto.nombre,cripto.cantidad,cripto.meses))) + " " + cripto.nombre + " al cabo de " + cripto.meses + " meses.";
        // document.getElementById("listaCriptos").append(li);
        
    }

    localStorage.setItem("listaCriptos",  JSON.stringify(listaCriptos));
    document.querySelector('#stake').style.display='none';
    document.querySelector('#formularios').style.display='none';
    let aux=0;
    for (let index = 0; index < listaCriptos.length; index++) {
        listaCriptos[0].nombre == listaCriptos[index].nombre ? aux++: aux=aux; 
        
    }

    // let li = document.createElement("li");
    // let {nombre} = listaCriptos[0];
    // aux == listaCriptos.length && (li.innerHTML = "Todas las criptos en stake son " + nombre);
    // aux == listaCriptos.length ? document.getElementById("listaCriptos").append(li): (li = "");

    // maxCantidad(...listaCriptos);

    Swal.fire({
        icon:'success',
        title: 'Tus criptos ya están en Stake!',
        text: 'Se ha creado una lista con el monto que recibirás al cabo de los meses que hayas indicado.',
        confirmButtontext: 'OK'
    });

    }
    
    
})


function calcularInteresAux(cripto,cantidad,meses){
    calcularInteres(cripto.cantidad,meses);
}


async function calcularInteres(cripto, cantidad, meses){
   
    let total = cantidad;
    let interes = 0;
    let porcentaje=0;

   await fetch("./json/criptos.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((element) =>{
            if (cripto == element.token){
            porcentaje = element.porcentaje
            }
        })
    });

    for (let index =1;index<=meses;index++){
        interes+= cantidad*porcentaje;
    }

    // console.log(porcentaje);
    // console.log(interes);
    // console.log(parseInt(cantidad) + parseInt(interes));

    return parseInt(total) + parseInt(interes);





    // fetch("./json/criptos.json")
    // .then((response) => response.json())
    // .then ((data) => {
    // data.forEach((element) =>{
        
    //     if (cripto == element.token){ 
    //     for (let index = 1; index <= meses; index++) {
    //     interes += cantidad * element.porcentaje;
    // }
    // console.log(parseInt(cantidad) + parseInt(interes));
    // return parseInt(cantidad) + parseInt(interes);
    //     }
        
    // })
// })





    // let interes = 0;
    // for (let index = 1; index <= meses; index++) {
    //     interes += cantidad *0.05; //se genera un 5% por mes
    // }
    // console.log("El interés calculado es " + interes + " por " + meses + " meses en la criptomoneda " + cripto);
    // console.log("Usted recibirá " + (parseInt(interes) + parseInt(cantidad)) + " " +  cripto + " al cabo de " + meses + " meses.");
   
}

// function maxCantidad(...listaCriptos) {
//     let maxCant = 0;
//     let li = document.createElement("li");
//     for (let i = 0; i < listaCriptos.length; i++) {
//         if (parseInt(listaCriptos[i].cantidad) > parseInt(maxCant)){
//         maxCant = listaCriptos[i].cantidad;
//         li.innerHTML = "La cripto con mayor cantidad en stake es " + listaCriptos[i].nombre + " con " + listaCriptos[i].cantidad + " unidades";
        
//         }
//     }
//     document.querySelector("#listaCriptos").append(li);
    
    
// }

