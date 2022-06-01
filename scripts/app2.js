//Importo la clase con la que voy a trabajar y la funcionalidad de 'crearTabla' (que ya adentro menciona a las demas funciones necesarias)
import Auto from "./auto.js";

//Carga del STORAGE
const autos = localStorage.getItem("autos") ? JSON.parse(localStorage.getItem("autos")) : [];

console.log("Imprimiendo objetos:")
console.log(autos);

//Simulacion de carga de tabla con el loader
setTimeout(() => 
{
    const divSpinner = document.getElementById("divSpinner");
    divSpinner.setAttribute("Hidden", true);

    const divPrincipal = document.getElementById("table-containerAnuncios");
    divPrincipal.removeAttribute("Hidden");
},5000);

//Disculpe profe, no supe como superponer las tablas en el wallpaper :'(
autos.forEach(element => 
{  
    //Creo una tabla por cada elemento del localstorage
    const tablaCreada = document.createElement("table");
    tablaCreada.setAttribute("class","anuncioDisponible");

    ///-----------------------CABECERA DEL ANUNCIO--------------------
    //Le agrego la cabecera
    const cabeceraCreada = document.createElement("thead");
    cabeceraCreada.setAttribute("class","cabeceraAnuncioDisponible");
    
    //Creo el nodo de texto con todos los distintos datos.
    const textNodeTituloValue =  document.createTextNode(element["Titulo"]);

    //Creo la celda cabecera y el nodo de texto que le voy a posteriormente agregar como campo
    const celdaCabecera = document.createElement("th");
    //Agrego el nodo de texto que representa el campo, (valor de la key)
    celdaCabecera.appendChild(textNodeTituloValue);

    //Creo el elemento html "tr" (fila de tabla)
    const filaCabeceraTabla = document.createElement("tr");
    filaCabeceraTabla.setAttribute("class","filaAnuncioDisponible");
    filaCabeceraTabla.appendChild(celdaCabecera);

    ///-----------------------CABECERA DEL ANUNCIO--------------------

    //PERDON PROFE. ESTO CON UN FOR ES MUCHISIMO MAS PROLIJO PERO YA SON 10. MENOS CUARTO Y BUENO...
    
    //ATENCION - !!!PELIGO!!! CODIGO CAVERNA A CONTINUACION!!!!!

    ///-----------------------CUERPO DEL ANUNCIO--------------------
    const textNodeTipoValue =  document.createTextNode("Tipo: "+element["Tipo"]);
    const textNodePrecioValue =  document.createTextNode("Precio: "+element["Precio"]);
    const textNodeDescripcionValue =  document.createTextNode("Descripcion: "+element["Descripcion"]);
    const textNodePuertasValue =  document.createTextNode("Puertas: "+element["Puertas"]);
    const textNodeKilometrosValue =  document.createTextNode("Km: "+element["Kilometros"]);
    const textNodePotenciaValue =  document.createTextNode("Hp: "+element["Potencia"]);

    //Creo el elemento html "tr" (fila de tabla)
    const filaCuerpoTabla = document.createElement("tr");
    filaCuerpoTabla.setAttribute("class","filaAnuncioDisponible");

    const celda1CuerpoTabla = document.createElement("td");
    const celda2CuerpoTabla = document.createElement("td");
    const celda3CuerpoTabla = document.createElement("td");
    const celda4CuerpoTabla = document.createElement("td");
    const celda5CuerpoTabla = document.createElement("td");
    const celda6CuerpoTabla = document.createElement("td");

    celda1CuerpoTabla.appendChild(textNodeTipoValue);
    celda2CuerpoTabla.appendChild(textNodePrecioValue);
    celda3CuerpoTabla.appendChild(textNodeDescripcionValue);
    celda4CuerpoTabla.appendChild(textNodePuertasValue);
    celda5CuerpoTabla.appendChild(textNodeKilometrosValue);
    celda6CuerpoTabla.appendChild(textNodePotenciaValue);

    filaCuerpoTabla.appendChild(celda1CuerpoTabla);
    filaCuerpoTabla.appendChild(celda2CuerpoTabla);
    filaCuerpoTabla.appendChild(celda3CuerpoTabla);
    filaCuerpoTabla.appendChild(celda4CuerpoTabla);
    filaCuerpoTabla.appendChild(celda5CuerpoTabla);
    filaCuerpoTabla.appendChild(celda6CuerpoTabla);

    //A la tabla le agrego la fila
    tablaCreada.appendChild(filaCabeceraTabla);
    tablaCreada.appendChild(filaCuerpoTabla);
    ///----------------------------------------------------------------------

    //Finalmente se lo agrego al objeto contenedor
    const parrafoContenedor = document.getElementById("table-containerAnuncios");
    parrafoContenedor.appendChild(tablaCreada);
    
});