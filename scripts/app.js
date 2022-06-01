
//Importo la clase con la que voy a trabajar y la funcionalidad de 'crearTabla' (que ya adentro menciona a las demas funciones necesarias)
import Auto from "./auto.js";
import crearTabla from "./tablaDinamica.js";

//Carga del STORAGE
const autos = localStorage.getItem("autos") ? JSON.parse(localStorage.getItem("autos")) : [];

console.log("Imprimiendo objetos:")
console.log(autos);
actualizarTabla();

//-----------------------------------Captura del objeto formulario y desarrollo de su evento 'submit'----------------------
const frmAuto = document.forms[0];
frmAuto.addEventListener("submit", (e) =>
{
    const formAlta = e.target;

    console.log(e);

    // Cancela el evento
    e.preventDefault();

    // ------ Leo sus campos -----
    console.log("Imprimiendo valores leidos:");

    console.log(formAlta.Titulo.value);
    console.log(formAlta.Tipo.value);
    console.log(formAlta.Descripcion.value);
    console.log(formAlta.Precio.value);
    console.log(formAlta.Puertas.value);
    console.log(formAlta.Kilometros.value);
    console.log(formAlta.Potencia.value);

    let ID = Date.now();
    let Titulo = formAlta.Titulo.value;
    let Tipo = formAlta.Tipo.value;
    let Descripcion = formAlta.Descripcion.value;
    let Precio = formAlta.Precio.value;
    let Puertas = formAlta.Puertas.value;
    let Kilometros = formAlta.Kilometros.value;
    let Potencia = formAlta.Potencia.value;

    let resultadoValidacion = validarParametros(ID, Titulo, Tipo, Descripcion, parseFloat(Precio), parseInt(Puertas), parseInt(Kilometros),Potencia)

    if (resultadoValidacion == -1)
    {
        alert("No se pudieron validar todos los campos del formulario.");
    }
    else
    {
        const newAuto = new Auto(ID, Titulo, Tipo, Descripcion, parseFloat(Precio), parseInt(Puertas), parseInt(Kilometros), Potencia);

        autos.push(newAuto);
    
        // ------ Actualizo localStorage ------
        localStorage.setItem("autos", JSON.stringify(autos));
    
        actualizarTabla();
    }
});
//------------------------------------------------------------------------------------------------------------------------

//----------------------------------------Captura del boton eliminar y desarrollo de su evento 'click'---------------------
const botonEliminar = document.getElementById("BtnEliminar");
botonEliminar.addEventListener("click", (e) =>
{
    if (idFilaClickeada != null && idFilaClickeada != undefined)
    {
        //Recorro todos los elementos
        autos.forEach((element, index) => 
        {
            //Si encuentro el elemento que quiero eliminar (coincidente con el ID)
            if (element.ID == idFilaClickeada) 
            {
                //Lo elimino del array.(Index es el indice y el 1 es la cantidad de elementos a eliminar.)
                autos.splice(index,1);

                // ------ Actualizo localStorage ------
                localStorage.setItem("autos", JSON.stringify(autos));

                //Dejo de tener en cuenta ese objeto ya modificado.
                if(flagFilaSeleccionada == true)
                {
                    //Despinto la ultima fila seleccionada y seteo el ultimo valor id como nulo (asi si toco modificar o eliminar tampoco
                    //tengo riesgo de modificar nada).
                    idFilaClickeada = null;
                    ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
                }
                setearControlesValoresDefault();

                //Actualizo la tabla.
                actualizarTabla();

                //Uso return xq break explota.
                return;
            }
        });   
    }
    else
    {
        alert("No se puede eliminar si no hay nada seleccionado en la tabla.");
    }
});
//------------------------------------------------------------------------------------------------------------------------

//-------------------------------------Captura del boton modificar y desarrollo de su evento 'click'---------------------
const botonModificar = document.getElementById("BtnModificar");
botonModificar.addEventListener("click", (e) =>
{
    if (idFilaClickeada != null && idFilaClickeada != undefined)
    {
        //Recorro todos los elementos
        autos.forEach((element, index) => 
        {
            //Si encuentro el elemento que quiero eliminar (coincidente con el ID)
            if (element.ID == idFilaClickeada) 
            {
                //Lo modifico del array pisando todos los valores de sus campos con los cargados en los controles
                autos[index].Titulo = document.getElementById("txtBoxTitulo").value;
                autos[index].Precio = document.getElementById("txtBoxPrecio").value;
                autos[index].Descripcion = document.getElementById("txtAreaDescripcion").value;
                autos[index].Puertas = document.getElementById("txtBoxPuertas").value;
                autos[index].Kilometros = document.getElementById("txtBoxKilometros").value;
                autos[index].Potencia = document.getElementById("txtBoxPotencia").value;

                //Modificacion del valor que tenga el radiobutton.
                if (document.getElementById("radioBtnTipoVenta").checked == true)
                {  
                    autos[index].Tipo = "Venta";
                }
                else if (document.getElementById("radioBtnTipoAlquiler").checked == true)
                {
                    autos[index].Tipo = "Alquiler";
                }
                
                // -------------- Actualizo localStorage -----------------------
                localStorage.setItem("autos", JSON.stringify(autos));

                //Dejo de tener en cuenta ese objeto ya modificado.
                if(flagFilaSeleccionada == true)
                {
                    //Despinto la ultima fila seleccionada y seteo el ultimo valor id como nulo (asi si toco modificar o eliminar tampoco
                    //tengo riesgo de modificar nada).
                    idFilaClickeada = null;
                    ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
                }
                setearControlesValoresDefault();

                //Actualizo la tabla.
                actualizarTabla();

                //Uso return xq break explota.
                return;
            }
        });   
    }
    else
    {
        alert("No se puede modificar si no hay nada seleccionado en la tabla.");
    }
});
//-----------------------------------------------------------------------------------------------------------------------

//---------------------------Captura del boton cancelar y desarrollo de su evento 'click'--------------------------------
const botonCancelar = document.getElementById("BtnCancelar");
botonCancelar.addEventListener("click",(e) =>
{
    if(flagFilaSeleccionada == true)
    {
        //Despinto la ultima fila seleccionada y seteo el ultimo valor id como nulo (asi si toco modificar o eliminar tampoco
        //tengo riesgo de modificar nada).
        idFilaClickeada = null;
        ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
    }

    setearControlesValoresDefault();
});
//-----------------------------------------------------------------------------------------------------------------------

//--------------- Captura del contenedor de la tabla y desarrollo de su evento 'click' en una fila ----------------------
let flagFilaSeleccionada = false;
let ultimaFilaSeleccionada;
let idFilaClickeada;

const contenedorTabla = document.getElementById("table-container");
contenedorTabla.addEventListener("click", (e) => 
{
    //Me guardo la ubicacion clickeada y me fijo si es una fila y celda al mismo tiempo
    const ubicacionClickeada = e.target; 
    idFilaClickeada = e.target.parentElement.dataset.id;

    if (ubicacionClickeada.matches("tr td") == true)
    {
        console.log("El ID del Auto seleccionado: "+idFilaClickeada);
        //Me agarro el elemento padre (fila)
        const fila = ubicacionClickeada.parentElement;

        //Si no hay una fila seleccionada, la pinto sin drama.
        if (fila.matches("tr") == true && flagFilaSeleccionada == false && fila != null && fila != undefined)
        { 
            mostrarEnControlesFilaSeleccionada(idFilaClickeada);

            fila.style.backgroundColor = 'antiquewhite';
            flagFilaSeleccionada = true;
            ultimaFilaSeleccionada = fila;
        }
        else if (fila.matches("tr") == true && flagFilaSeleccionada == true && fila != null && fila != undefined) //Si hay una fila seleccionada, la desppinto y pinto la nueva.
        {
            mostrarEnControlesFilaSeleccionada(idFilaClickeada);

            ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";

            fila.style.backgroundColor = 'antiquewhite';
            ultimaFilaSeleccionada = fila;
            flagFilaSeleccionada = true;
        }
    }
});

function mostrarEnControlesFilaSeleccionada(idRecibido) 
{
    autos.forEach((element) => 
    {
    if (element.ID == idRecibido) 
    {
        document.getElementById("txtBoxTitulo").value = element.Titulo;
        document.getElementById("txtAreaDescripcion").value = element.Descripcion;
        document.getElementById("txtBoxPrecio").value = element.Precio;
        document.getElementById("txtBoxPuertas").value = element.Puertas;
        document.getElementById("txtBoxKilometros").value = element.Kilometros;
        document.getElementById("txtBoxPotencia").value = element.Potencia;

        //Si (en el formulario) venta esta tildado y el tipo del elemento es alquiler
        if (frmAuto.Tipo[0].checked == true && element.Tipo == "Alquiler") 
        {
            //Tildo alquiler
            frmAuto.Tipo[1].checked = true;
        }
        else if (frmAuto.Tipo[1].checked == true && element.Tipo == "Venta") 
        {
            //Tildo venta
            frmAuto.Tipo[0].checked = true;
        }
    }
    });
}
//------------------------------------------------------------------------------------------------------------------------

//Funcion actualizadora de tabla.
//(Desde su contenedor final, elimina a todos los hijos (tr,td,th) y 
//escribe desde 0 con los datos obtenidos del localStorage [puede ser tambien]
//Definido para recibir los datos por param desde un array.)
function actualizarTabla(arr)
{
    const data = localStorage.getItem("autos") ? JSON.parse(localStorage.getItem("autos")) : [];            

    const container = document.querySelector(".table-container");

    while(container.children.length > 0) // si tiene elementos hijos, los borra
    { 
        container.removeChild(container.firstElementChild);
    }

    if (data.length > 0)
    {
        container.appendChild(crearTabla(autos));
    }
}
//------------------------------------------------------------------------------------------------------------------------

//Setea los valores vacios en los controles
function setearControlesValoresDefault()
{
    //Seteo los valores default
    document.getElementById("txtBoxTitulo").value = "";
    document.getElementById("txtAreaDescripcion").value = "";
    document.getElementById("txtBoxPrecio").value = "";
    document.getElementById("txtBoxPuertas").value = "";
    document.getElementById("txtBoxKilometros").value = "";
    document.getElementById("txtBoxPotencia").value = ""; 
    frmAuto.Tipo[0].checked = true;
}

//Valida todos los campos del formulario
function validarParametros(idRecibido,tituloRecibido,tipoRecibido,descripcionRecibida,precioRecibido,cantPuertasRecibida,cantidadKilometros,cantPotenciaRecibida) 
{
    let retorno;

    if (idRecibido == null || idRecibido == undefined || 
        tituloRecibido == null || tituloRecibido == undefined || tituloRecibido.length > 32 || tituloRecibido == "" ||
        tipoRecibido == null || tipoRecibido == undefined || tipoRecibido == "" || 
        descripcionRecibida == null || descripcionRecibida == undefined || descripcionRecibida.length > 100 || descripcionRecibida == "" ||
        isNaN(precioRecibido) == true || precioRecibido.length > 18 || precioRecibido == null || precioRecibido == undefined ||
        isNaN(cantPuertasRecibida) == true || cantPuertasRecibida.length > 2 || cantPuertasRecibida == null || cantPuertasRecibida == undefined || 
        isNaN(cantidadKilometros) == true || cantidadKilometros.length > 2 || cantidadKilometros == null || cantidadKilometros == undefined || 
        cantPotenciaRecibida.length > 4 || cantPotenciaRecibida == null || cantPotenciaRecibida == undefined) 
    {
        retorno = -1;
    }
    else
    {
        retorno = 0;
    }

    return retorno;
}

//Simulacion de carga de tabla con el loader
setTimeout(() => 
{
    const divSpinner = document.getElementById("divSpinner");
    divSpinner.setAttribute("Hidden", true);

    const divPrincipal = document.getElementById("table-container");
    divPrincipal.removeAttribute("Hidden");
},5000);