const nombre = document.querySelector('#nombre');
const edad = document.querySelector('#edad');
const correo = document.querySelector('#correo');
const materia = document.querySelector('#materia');

const tabla = document.querySelector('#alumnos tbody');

const btnSubmit = document.querySelector('.btnSubmit');

let fila = '';
const form = document.querySelector('form');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
});

const obtenerLocalStorage = () => {

    if(localStorage.getItem("persona")){
        let persona = JSON.parse(localStorage.getItem("persona"));
        fila += `
        <tr>
            <td>${persona.nombre}</td>
            <td>${persona.edad}</td>
            <td>${persona.correo}</td>
            <td>${persona.materia}</td>
        </tr>
        `;
        tabla.innerHTML = fila;
    }else {
        console.warn('No hay entradas en el localStorage');
    }
}

const guardarLocalStorage = () => {

    let persona = {
        nombre: nombre.value,
        edad: edad.value,
        correo: correo.value,
        materia: materia.value
    }

localStorage.setItem("persona", JSON.stringify(persona) );

};

obtenerLocalStorage();

btnSubmit.addEventListener('click', ()=> {
    guardarLocalStorage();
    obtenerLocalStorage();
})



