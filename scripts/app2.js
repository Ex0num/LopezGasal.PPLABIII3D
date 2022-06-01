//Importo la clase con la que voy a trabajar y la funcionalidad de 'crearTabla' (que ya adentro menciona a las demas funciones necesarias)
import Auto from "./auto.js";

//Carga del STORAGE
const autos = localStorage.getItem("autos") ? JSON.parse(localStorage.getItem("autos")) : [];

console.log("Imprimiendo objetos:")
console.log(autos);

autos.forEach(element => 
{
    
    
});