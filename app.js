if(navigator.serviceWorker){
  navigator.serviceWorker.register('sw.js')
}

const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let container = document.querySelector('.collection');
let lista = [];

if (localStorage.indice) {
  indice = JSON.parse(localStorage.indice);
} else {
  indice = 0;
}


document.addEventListener('DOMContentLoaded', function() {
    let sideNav = document.querySelectorAll('.sidenav');
    let instanciaSide = M.Sidenav.init(sideNav  , {});

    let modal = document.querySelectorAll('.modal');
    let instanciaModal = M.Modal.init(modal, {});

    lista = leerNotas();
    renderizarNotas(lista);
});

/* - FUNCION 1:  Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', ()=>{

  guardarNotas(lista);

})

/* -------- FUNCION 2: Recibe el array y lo guarda en el localStorage ------- */
function guardarNotas(array){

  if (textArea.value != "") {
    let dia = new Date().toLocaleDateString();
    let contenido = textArea.value;
    let nota = {id: indice, nota: `${contenido}`, fecha: `${dia}`};
  
    indice ++;
    localStorage.indice = JSON.stringify(indice);
  
    array.push(nota);
    localStorage.lista = JSON.stringify(array);
  
    textArea.value = '';
  
    renderizarNotas(array);
  } else (alert("El campo se encuentra vacío. Debe ingresar una nota."))
}

/* --------- FUNCION 3: Lee los datos del localStorage y lo retorna --------- */
function leerNotas(){

  if (localStorage.lista) {
    lista = JSON.parse(localStorage.lista);
  }

  return lista;

}

/* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */
function renderizarNotas(array){

  container.innerHTML = '';

  for (nota of array) {

    if (nota != undefined) {
      let elemento = document.createElement("li");
    elemento.className = "collection-item";

    let div = document.createElement("div");
    div.innerHTML = `${nota['nota']}`;

    let aFecha = document.createElement("a");
    aFecha.className = "secondary-content blue-text";
    aFecha.innerHTML = `${nota['fecha']}`;

    let aEliminar = document.createElement("a");
    aEliminar.className = "secondary-content red-text";
    aEliminar.id = `btn-eliminar-${nota['id']}`;
    aEliminar.addEventListener('click', (e)=>{

      eliminarNota(e.target);
    
    })

    let iEliminar = document.createElement("i");
    iEliminar.className = "material-icons";
    iEliminar.innerHTML = `delete`;

    aEliminar.appendChild(iEliminar);
    div.appendChild(aEliminar);
    div.appendChild(aFecha);
    elemento.appendChild(div);
    container.appendChild(elemento);
    }

  }
}

/* -------- FUNCION 5: Elimina nota del array y del renderizado------- */
function eliminarNota(btn) {

  let idBtn = parseInt(btn.parentNode.id.slice(13));
  
  for (nota of lista) {
    if (nota != undefined) {
      if (nota.id === idBtn) {

        if (confirm(`Estás seguro que queres eliminar la nota: "${nota.nota}" del ${nota.fecha}`) == true)
        delete lista[idBtn];
        localStorage.lista = JSON.stringify(lista);
        btn.parentNode.parentNode.parentNode.remove();
      }
    }
  }
}