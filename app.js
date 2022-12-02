
  navigator.serviceWorker.register('sw.js')


const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let btnEliminar = document.getElementsByClassName('btn-eliminar');
let container = document.querySelector('.collection');
let lista = [];

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
  
  let dia = new Date().toLocaleDateString();
  let contenido = textArea.value;
  let nota = { nota: `${contenido}`, fecha: `${dia}`};
  array.push(nota);
  localStorage.lista = JSON.stringify(array);
  textArea.value = '';
  renderizarNotas(array);
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

    let elemento = document.createElement("li");
    elemento.className = "collection-item";
    let div = document.createElement("div");
    div.innerHTML = `${nota['nota']}`;
    let aFecha = document.createElement("a");
    aFecha.className = "secondary-content blue-text";
    aFecha.innerHTML = `${nota['fecha']}`;
    let aEliminar = document.createElement("a");
    aEliminar.className = "secondary-content red-text btn-eliminar";
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