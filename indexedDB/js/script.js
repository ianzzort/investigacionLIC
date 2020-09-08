const indexedDB = window.indexedDB;
const form = document.querySelector('form');
const tarea = document.querySelector('.tarea');

if(indexedDB){
    let db;
    const request = indexedDB.open('listaTareas', 1);

    request.onsuccess = () => {
        db = request.result;
        console.log('OPEN', db);
        readData();
    };

    request.onupgradeneeded = () => {
        db = request.result;
        console.log('Create', db);
        const objetoStore = db.createObjectStore('tareas', {
            autoIncrement:true
        });
    };

    request.onerror = (error) => {
        console.log('Error', error);
    }

    const readData = (data) => {
        const transaction = db.transaction(['tareas'], 'readonly');
        const objectStore = transaction.objectStore('tareas');
        const request = objectStore.openCursor();
        const fragmento = document.createDocumentFragment();

        request.onsuccess = (e)=> {
            const cursor = e.target.result;
            if(cursor){
                const tituloTareas = document.createElement('p');
                const prioridadTareas = document.createElement('p');

                tituloTareas.textContent = cursor.value.tituloTarea;
                prioridadTareas.textContent = cursor.value.prioridad;
                fragmento.appendChild(tituloTareas);
                fragmento.appendChild(prioridadTareas);
                cursor.continue();
            }else {
                tarea.innerHTML = "";
                tarea.appendChild(fragmento);
                console.warn('Ya no hay mas datos');
            }
        }
    }

    const addData = (data) => {
        const transaction = db.transaction(['tareas'], 'readwrite');
        const objectStore = transaction.objectStore('tareas');
        const request = objectStore.add(data);
        readData();
    }


    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const data = {
            tituloTarea:e.target.tarea.value,
            prioridad:e.target.prioridad.value
        }
        addData(data);
    });


}