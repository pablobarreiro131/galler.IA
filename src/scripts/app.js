let arte = [];
let numeroImagenActual = 0;
// Se declaran las variables. arte es un array que contendrá la información de las obras. 
// numeroImagenActual es un numero que indica en que imagen estamos. Se inicializa a 0.


// La funcion mostrarGaleria va creando contenedores para cada obra de arte y para cada texto informativo que las
// acompaña. Se le pasa el numero de la imagen que se quiere mostrar, por defecto empieza en 0.
function mostrarGaleria(indice=0) {
    const galeria = document.getElementById("galeria");                             // Se obtiene el elemento que tiene el id galeria. Que es el contenedor que tendrá toda la información de las obras.
    galeria.innerHTML = '';                                                         // Se limpia el contenido de galeria, para borrar la información de la obra anterior.
    if (arte.length > 0) {                                                          // Se comprueba que el array no esté vacío. (Lo cual sería un error).
        const imagenActual = arte[indice];                                          // Se  obtiene la obra actual, que es un objeto con la información del JSON. Se llama imagenActual porque al principio solo iba a tener imagenes, pero luego se le añadió más información.
        const bloque = document.createElement('div');                               // Se crea el div que contendrá la información de la obra actual.
        bloque.className = 'bloque';                                                // Se crea una clase bloque, para utilizrla luego en el CSS.
        const bloqueImagen = document.createElement('img');                         // Se crea el elemento img que contendrá la imagen de la obra actual.
        bloqueImagen.src = imagenActual["img.src"];                                 // Se indica la ruta de como encontrar la informacion en el JSON.
        const bloqueTitulo = document.createElement('h3');                          // Se crea un h3 que contendrá el título de la obra actual.
        bloqueTitulo.textContent = imagenActual.title;                              // Se indica la ruta de como encontrar el título en el JSON.
        const bloqueDescripcion = document.createElement('p');                      // Se crea un párrafo que contendrá la descripción de la obra actual.
        bloqueDescripcion.textContent = imagenActual.description;                   // Se indica la ruta de como encontrar la descripción en el JSON.
        bloque.appendChild(bloqueImagen);                                           // Se añade la imagen al bloque.
        bloque.appendChild(bloqueTitulo);                                           // Se añade el título al bloque.
        bloque.appendChild(bloqueDescripcion);                                      // Se añade la descripción al bloque.
        galeria.appendChild(bloque);                                                // Se añade el bloque al contenedor galeria.    
    }               
}               


// La función cargarGaleria se encarga de cargar el JSON que contiene la información de las obras de arte.
function cargarGaleria() {              
    fetch("data/artPieces.json")                                                    // Fetch se se usa para obtener el JSON que contiene la información de las obras de arte. Se indica la ruta del JSON.
        .then(response => response.json())                                          // Se convierte la respuesta en un objeto JSON.  
        .then(data => {                                                             // Se obtiene la información recursiva del JSON.    
            arte = data;                                                            // Se convierte la información obtenida del JSON, que ya es un array de objetos al array arte. 
            mostrarGaleria(numeroImagenActual);                                     // Se llama a la función mostrarGaleria para mostrar la primera obra de arte. 
        })              
        .catch(error => {               
            console.error("Error al cargar la galería:", error);                    // Se capturan los errores, que podrian darse si hubiera algo mal con el JSON.
        });             
}               

document.addEventListener('DOMContentLoaded', () => {                               // Cuando la página se haya cargado completamente, se ejecuta el código dentro de esta función.
    cargarGaleria();                                                                // El lambda carga la galeria, cada vez que se actualiza la página.
    document.getElementById('anterior').addEventListener('click', () => {               // Al texto con id prev se le añade un evento de click, que al pulsarlo ejecuta la función que se le pasa como parámetro.
        if (arte.length === 0) return;
        numeroImagenActual = (numeroImagenActual - 1 + arte.length) % arte.length;  // Esta función calcula si hay una imagen anterior a la actual. Si no la hay, vuelve a la última imagen.
        mostrarGaleria(numeroImagenActual);                                         // Se llama a la función mostrarGaleria para actualizar la imagen.
    });

    document.getElementById('siguiente').addEventListener('click', () => {          // Al texto con id next se le añade un evento de click, que al pulsarlo ejecuta la función que se le pasa como parámetro.
        if (arte.length === 0) return;
        numeroImagenActual = (numeroImagenActual + 1) % arte.length;                // Esta función calcula si hay una imagen siguiente a la actual. Si no la hay, vuelve a la primera imagen.
        mostrarGaleria(numeroImagenActual);                                         // Se llama a la función mostrarGaleria para actualizar la imagen.   
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');                                                                    // Se obtiene el formulario de contacto por su id.
    if(contactForm) {                                                                                                               // Se comprueba que el formulario existe.
        contactForm.addEventListener("submit", function(enviar) {                                                                   // Se indica que sucede cuando se envía el formulario.
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/;                                                                     // Se utiliza una expresión regular para el nombre encontrada en internet.
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;                                                  // Se utiliza una expresión regular para el email encontrada en internet.
            const messageRegex = /^.{10,500}$/;                                                                                     // Se utiliza una expresión regular para el mensaje, que debe tener entre 10 y 500 caracteres.
            let valido = true;                                                                                                      // Se inicializa una variable, para comprobar si el formulario es válido y continuar.
            let mensajeError = '';                                                                                                  // Se crea una variable para guardar los mensajes de error. Que cambiarán según el error que de.
            if(!nameRegex.test(contactForm.name.value)) {                                                                           // Se comprueba si el nombre es válido.
                mensajeError += 'El nombre debe tener entre 2 y 40 caracteres y solo puede contener letras y espacios.\n';          // Si no es válido, se añade un mensaje de error.
                valido = false;                                                                                                     // Se cambia la variable valid a false, para indicar que el formulario no es válido.
            }
            if(!emailRegex.test(contactForm.email.value)) {                                                                         // Se comprueba si el email es válido.
                mensajeError += 'Introduce un email válido.\n';                                                                     // Si no es válido, se añade un mensaje de error.
                valido = false;                                                                                                     // Se cambia la variable valid a false, para indicar que el formulario no es válido.
            }
            if(!messageRegex.test(contactForm.message.value)) {                                                                     // Se comprueba si el mensaje es válido.
                mensajeError += 'El mensaje debe tener entre 10 y 500 caracteres.\n';                                               // Si no es válido, se añade un mensaje de error.
                valido = false;                                                                                                     // Se cambia la variable valid a false, para indicar que el formulario no es válido.
            }
            if(!valido) {                                                                                                           // Si el formulario no es válido, se muestra un mensaje de error.
                alert(mensajeError);                                                                                                // Se muestra el mensaje de error.
                enviar.preventDefault();                                                                                            // Se evita que el formulario se envíe.
            } else {                                                                                                                // Si el formulario es válido, se muestra un mensaje de éxito.
                alert('Formulario enviado correctamente.');                                                                         // Se muestra un mensaje de éxito.
            }                                                                                                                       // Se evita que el formulario se envíe, para evitar que se recargue la página.
        });
    }
});


// Efecto de píxeles estilo 8-bits.
function createPixel8Bit() {
    const pixel = document.createElement('div');
    pixel.className = 'pixel-8bit';
    const size = Math.floor(Math.random() * 5) + 6;
    pixel.style.width = `${size}px`;
    pixel.style.height = `${size}px`;
    pixel.style.position = 'fixed';
    const side = Math.random() < 0.5 ? 'left' : 'right';
    if (side === 'left') {
        pixel.style.left = `${Math.random() * 10}vw`;
    } else {
        pixel.style.left = `${90 + Math.random() * 10}vw`;
    }
    pixel.style.top = `${Math.random() * 100}vh`;
    pixel.style.zIndex = 0;
    document.body.appendChild(pixel);
    setTimeout(() => {
        pixel.style.opacity = 0;
        setTimeout(() => pixel.remove(), 600);
    }, 600 + Math.random() * 800);
}
setInterval(createPixel8Bit, 150);