/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _funciones_help_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


async function loadHead() {
    try {
        const response = await fetch(`${(0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_0__.getDomain)()}/parts/head.html`);
        let data = await response.text();
        data = data.replace(/{{domain}}/g, (0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_0__.getDomain)());
        data = typeof pageTitle !== 'undefined' ? data.replace('{{pageTitle}}', pageTitle) : data.replace('{{pageTitle}}', '');
        document.head.innerHTML += data;
    } catch (error) {
        console.error('Error loading head:', error);
        throw error; // Propaga el error para el manejo en el flujo principal
    }
}

async function loadComponent(url, elementId, callback) { 
    try {
        const response = await fetch(url);
        let data = await response.text();
        data = data.replace(/{{domain}}/g, (0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_0__.getDomain)());
        document.getElementById(elementId).innerHTML += data;
        if (callback) callback();
    } catch (error) {
        console.error(`Error loading component ${elementId}:`, error);
    }
}

// Cargar contenido
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadHead();
        await Promise.all([
            loadComponent(`${(0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_0__.getDomain)()}/parts/banner-top.html`, 'banner-top'),
            loadComponent(`${(0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_0__.getDomain)()}/parts/nav.html`, 'navegador', _funciones_help_js__WEBPACK_IMPORTED_MODULE_0__.setActiveNavLink),
            loadComponent(`${(0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_0__.getDomain)()}/parts/pasos-compra.html`, 'pasos-compra'),
            loadComponent(`${(0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_0__.getDomain)()}/parts/footer.html`, 'footer')
        ]);
        if (document.body.classList.contains('index')){
            // await loadComponent('./parts/slider.html', 'slider');
        }
    } catch (error) {
        console.error('Error loading head or components:', error);
    } finally {
        setTimeout(() => {
            document.getElementById('main').style.display = '';
        }, 300);
    }
});

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDomain: function() { return /* binding */ getDomain; },
/* harmony export */   orderPrice: function() { return /* binding */ orderPrice; },
/* harmony export */   setActiveNavLink: function() { return /* binding */ setActiveNavLink; }
/* harmony export */ });
// Abrir tabs especificas segun el atributo de la URL
function setActiveNavLink() {
    const links = document.querySelectorAll('.navlista a');
    const currentPath = window.location.pathname;

    links.forEach(link => {
        if (link.getAttribute('href') === '.' + currentPath) {
            link.classList.add('active');
        }
    });
}

// Ordenar precio
function orderPrice(items) {
    Object.keys(items).forEach(item => {
        items[item].sort((a, b) => {
            const precioA = parseFloat(a.precio.replace('S/.', '').trim());
            const precioB = parseFloat(b.precio.replace('S/.', '').trim());
            return precioA - precioB;
        });
    });
}

function getDomain() {
    return window.location.origin;
}

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dataPedido: function() { return /* binding */ dataPedido; },
/* harmony export */   fetchTemplate: function() { return /* binding */ fetchTemplate; },
/* harmony export */   generateProductHtml: function() { return /* binding */ generateProductHtml; },
/* harmony export */   handlePeluches: function() { return /* binding */ handlePeluches; },
/* harmony export */   handleProducto: function() { return /* binding */ handleProducto; },
/* harmony export */   handleProductoSeleccionado: function() { return /* binding */ handleProductoSeleccionado; },
/* harmony export */   handleVinil: function() { return /* binding */ handleVinil; },
/* harmony export */   hideEmptyModals: function() { return /* binding */ hideEmptyModals; },
/* harmony export */   initializeModals: function() { return /* binding */ initializeModals; },
/* harmony export */   whatsappUrl: function() { return /* binding */ whatsappUrl; }
/* harmony export */ });
/* harmony import */ var _sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _funciones_help_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);




// Función para obtener el contenido de la plantilla
const fetchTemplate = async () => {
    try {
        const response = await fetch(`${(0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_1__.getDomain)()}/parts/grilla-tabs.html`);
        return await response.text();
    } catch (error) {
        console.error('Error fetching grilla-tabs.html:', error);
        throw error;
    }
};

// Función para inicializar modales de Bootstrap
const initializeModals = () => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => new bootstrap.Modal(modal));
};


// Enlaces para los botones de productos
function whatsappUrl(data) {
    let enlace = `https://api.whatsapp.com/send?phone=51940541547&text=`;
    enlace += `Pedido de compra:`;
    enlace += `%0A(*)Arreglo: ${data.producto.nombre} (SKU:${data.producto.sku}) - S/${data.producto.precio}`;
    if (data.peluche.precio !== 0) {
        enlace += `%0A(*)Peluche: ${data.peluche.nombre} (SKU:${data.peluche.sku}) - S/${data.peluche.precio}`;
    } else {
        enlace += `%0A(*)Peluche: No incluye peluche`;
    }
    if (data.vinil.precio !== 0) {
        enlace += `%0A(*)Mensaje: "${data.vinil.mensaje}" - S/${data.vinil.precio}`;
    } else {
        enlace += `%0A(*)Mensaje: No incluye mensaje personalizado`;
    }
    enlace += `%0A(*)Precio Total: S/${data.precioTotal}`;
    data.enlace.href = enlace;
}

// Ocultar secciones especificas vacias de modales
function hideEmptyModals() {
    const modalContenidos = document.querySelectorAll('.modal-contenido');
    const modalVideos = document.querySelectorAll('.modal-video');
    modalContenidos.forEach(modalContenido => {
        if (modalContenido.querySelector('ul').children.length === 0) {
            modalContenido.style.display = 'none';
        }
    });
    modalVideos.forEach(modalVideo => {
        const baseurl = window.location;
        const videoEnlace = modalVideo.querySelector('.video-enlace').getAttribute('href');
        if (!videoEnlace || videoEnlace === baseurl || videoEnlace === '') {
            modalVideo.style.display = 'none';
        }
    });
}

// Contenido de pedido
const dataPedido = {
    producto: {
        nombre: '',
        sku: '',
        precio: 0
    },
    peluche: {
        nombre: '',
        sku: '',
        precio: 0
    },
    vinil: {
        mensaje: '',
        precio: 0
    },
    get precioTotal() {
        return (parseFloat(this.producto.precio) + parseFloat(this.peluche.precio) + parseFloat(this.vinil.precio)).toFixed(2);
    },
    enlace: ''
};

// Aregra los datos a la plantilla HTML de productos
const generateProductHtml = (template, product, categoria, index, contenidoLista) => {
    return template
        .replace(/{{cols}}/g, 'col-xl-4 col-lg-4 col-md-6 col-12')
        .replace(/{{imagen}}/g, product.thumbnail)
        .replace(/{{nombre}}/g, product.nombre)
        .replace(/{{precio}}/g, product.precio)
        // .replace(/{{video}}/g, product.video)
        .replace(/{{notas}}/g, product.notas)
        // .replace(/{{contenido}}/g, contenidoLista)
        // .replace(/{{index}}/g, `${categoria}-${index}`)
        .replace(/{{sku}}/g, product.sku);
};

//Funcion para manejar producto seleccionado
const handleProducto = () => {
    const productos = document.querySelectorAll('.producto-item');
    productos.forEach(producto => {
        producto.addEventListener('click', handleProductoEnlace);
    });
}

const handleProductoEnlace = (event) => {
    const producto = event.currentTarget;
    const skuProducto = producto.getAttribute('data-sku');
    const baseUrl = window.location.origin + window.location.pathname;
    window.location.href = `${baseUrl}arreglo?sku=${skuProducto}`;
}

const handleProductoSeleccionado = (event) => {
    const itemProducto = document.querySelector('.producto-title');
    const precioProducto = document.querySelector('.producto-precio');
    const digitoPrecioProducto = parseFloat(precioProducto.dataset.precio.replace('S/.', '').trim());

    dataPedido.producto.nombre = itemProducto.dataset.nombre;
    dataPedido.producto.sku = itemProducto.dataset.sku;
    dataPedido.producto.precio = digitoPrecioProducto.toFixed(2);

    dataPedido.peluche.nombre = '';
    dataPedido.peluche.sku = '';
    dataPedido.peluche.precio = 0;

    dataPedido.vinil.mensaje = '';
    dataPedido.vinil.precio = 0;

    dataPedido.enlace = '';
}

// Función para manejar peluches
const handlePeluches = async () => {
    try {
        const peluches = await (0,_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchPeluches)();
        const enlaceWsp = document.getElementById(`producto-pedido`).querySelector('.wsp-pedido');
        const precioProducto = document.getElementById(`precio-total`);
        const modalPeluches = document.getElementById(`producto-peluches`);
        const carouselPeluches = modalPeluches.querySelector('.carousel-inner');

        // Agregar peluches al carrusel
        addPeluchesToCarousel(peluches, carouselPeluches, precioProducto, enlaceWsp);
    } catch (error) {
        console.error('Error fetching peluches:', error);
    }
};

// export const handlePeluches = async () => {
//     try {
//         const peluches = await fetchPeluches();
//         const modals = document.querySelectorAll('.modal');

//         modals.forEach(modal => {
//             const index = modal.id.replace('productModal', '');
//             const enlaceWsp = document.getElementById(`modal-pedido${index}`).querySelector('.wsp-pedido');
//             const precioProducto = document.getElementById(`precio-total${index}`);
//             const modalPeluches = document.getElementById(`modal-peluches${index}`);
//             const carouselPeluches = modalPeluches.querySelector('.carousel-inner');

//             // Agregar peluches al carrusel
//             addPeluchesToCarousel(peluches, carouselPeluches, precioProducto, enlaceWsp, index);
//         });
//     } catch (error) {
//         console.error('Error fetching peluches:', error);
//     }
// };

// Función para agregar peluches al carrusel
const addPeluchesToCarousel = (peluches, carouselPeluches, precioProducto, enlaceWsp) => {
    let grupoPeluches = '';
    const peluchesDisponibles = peluches.filter(peluche => peluche.unidades > 0); // Filtrar antes de iterar

    peluchesDisponibles.forEach((peluche, i) => {
        const active = i === 0 ? 'active' : '';
        if (i % 2 === 0) {
            if (i > 0) grupoPeluches += '</div>'; // Cierra el div anterior si hay uno
            grupoPeluches += `<div class="row carousel-item ${active}">`; // Abre un nuevo grupo
        }

        grupoPeluches += `
            <div class="col-6 peluche" data-id="${peluche.sku}" data-precio="${peluche.precio}" data-nombre="Peluche ${peluche.nombre}" data-sku="${peluche.sku}">
                <img src="${peluche.imagen}" class="d-block w-100" alt="${peluche.nombre}">
                <div class="info-peluche">
                    <h5 class="nombre">${peluche.nombre}</h5>
                    <p class="precio">${peluche.precio}</p>
                    <p class="tamanio">Medidas:<br /> ${peluche.altura}</p>
                    <button class="select-peluche">Agregar</button>
                </div>
            </div>
        `;

        if (i === peluchesDisponibles.length - 1) {
            grupoPeluches += '</div>'; // Cierra el último grupo
        }
    });

    carouselPeluches.innerHTML = grupoPeluches;

    // Agregar eventos a los peluches
    addPeluchesEvents(carouselPeluches, precioProducto, enlaceWsp); 
};

// Función para agregar peluches al carrusel
// const addPeluchesToCarousel = (peluches, carouselPeluches, precioProducto, enlaceWsp, index) => {
//     let grupoPeluches = '';
//     peluches.forEach((peluche, i) => {
//         const active = i === 0 ? 'active' : '';
//         if (i % 2 === 0) {
//             if (i > 0) grupoPeluches += '</div>'; // Cierra el div anterior si hay uno
//             grupoPeluches += `<div class="row carousel-item ${active}">`; // Abre un nuevo grupo
//         }

//         grupoPeluches += `
//             <div class="col-6 peluche" data-id="${peluche.sku}" data-precio="${peluche.precio}" data-nombre="Peluche ${peluche.nombre}" data-sku="${peluche.sku}">
//                 <img src="${peluche.imagen}" class="d-block w-100" alt="${peluche.nombre}">
//                 <div class="info-peluche">
//                     <h5 class="nombre">${peluche.nombre}</h5>
//                     <p class="precio">${peluche.precio}</p>
//                     <p class="tamanio">Medidas:<br /> ${peluche.altura}</p>
//                     <button class="select-peluche">Agregar</button>
//                 </div>
//             </div>
//         `;

//         if (i === peluches.length - 1) {
//             grupoPeluches += '</div>'; // Cierra el último grupo
//         }
//     });
//     carouselPeluches.innerHTML = grupoPeluches;

//     // Agregar eventos a los peluches
//     addPeluchesEvents(carouselPeluches, precioProducto, enlaceWsp, index);
// };

// Función para agregar eventos a los peluches
const addPeluchesEvents = (carouselPeluches, precioProducto, enlaceWsp) => {
    const itemPeluches = carouselPeluches.querySelectorAll('.peluche');
    const filaPeluche = document.getElementById(`row-peluche`);
    const tdNombrePeluche = filaPeluche.querySelector(`#nombre-peluche`);
    const tdPrecioPeluche = filaPeluche.querySelector(`#precio-peluche`);

    itemPeluches.forEach(peluche => {
        peluche.addEventListener('click', () => {
            const precioPeluche = peluche.dataset.precio;
            const precioPelucheNumerico = parseFloat(precioPeluche.replace('S/.', '').trim());

            const botonPeluche = peluche.querySelector('.select-peluche');

            // Lógica para agregar o deseleccionar peluche
            if (botonPeluche.classList.contains('active')) {
                dataPedido.peluche.nombre = '';
                dataPedido.peluche.sku = '';
                dataPedido.peluche.precio = 0;

                botonPeluche.classList.remove('active');
                botonPeluche.innerText = 'Agregar';

                filaPeluche.style.display = 'none';
                tdNombrePeluche.innerText = '';
                tdPrecioPeluche.innerText = '';

            } else {
                itemPeluches.forEach(pelucheItem => {
                    const boton = pelucheItem.querySelector('.select-peluche');
                    boton.classList.remove('active');
                    boton.innerText = 'Agregar';
                });

                // Actualizar precio total
                dataPedido.peluche.nombre = peluche.dataset.nombre;
                dataPedido.peluche.sku = peluche.dataset.sku;
                dataPedido.peluche.precio = precioPelucheNumerico.toFixed(2);

                botonPeluche.classList.add('active');
                botonPeluche.innerText = 'Agregado';

                // Actualizar tabla
                filaPeluche.style.display = 'table-row';
                tdNombrePeluche.innerText = `Peluche: ${peluche.dataset.nombre} (SKU: ${peluche.dataset.sku})`;
                tdPrecioPeluche.innerText = `S/.${precioPelucheNumerico.toFixed(2)}`;
            }

            precioProducto.innerText = `S/.${dataPedido.precioTotal}`;
            dataPedido.enlace = enlaceWsp;

            whatsappUrl(dataPedido);
        });
    });
};

// Función para agregar eventos a los peluches
// const addPeluchesEvents = (carouselPeluches, precioProducto, enlaceWsp, index) => {
//     const itemPeluches = carouselPeluches.querySelectorAll('.peluche');
//     const filaPeluche = document.getElementById(`row-peluche${index}`);
//     const tdNombrePeluche = filaPeluche.querySelector(`#nombre-peluche${index}`);
//     const tdPrecioPeluche = filaPeluche.querySelector(`#precio-peluche${index}`);

//     itemPeluches.forEach(peluche => {
//         peluche.addEventListener('click', () => {
//             const precioPeluche = peluche.dataset.precio;
//             const precioPelucheNumerico = parseFloat(precioPeluche.replace('S/.', '').trim());

//             const botonPeluche = peluche.querySelector('.select-peluche');

//             // Lógica para agregar o deseleccionar peluche
//             if (botonPeluche.classList.contains('active')) {
//                 dataPedido.peluche.nombre = '';
//                 dataPedido.peluche.sku = '';
//                 dataPedido.peluche.precio = 0;

//                 botonPeluche.classList.remove('active');
//                 botonPeluche.innerText = 'Agregar';

//                 filaPeluche.style.display = 'none';
//                 tdNombrePeluche.innerText = '';
//                 tdPrecioPeluche.innerText = '';

//             } else {
//                 itemPeluches.forEach(pelucheItem => {
//                     const boton = pelucheItem.querySelector('.select-peluche');
//                     boton.classList.remove('active');
//                     boton.innerText = 'Agregar';
//                 });

//                 // Actualizar precio total
//                 dataPedido.peluche.nombre = peluche.dataset.nombre;
//                 dataPedido.peluche.sku = peluche.dataset.sku;
//                 dataPedido.peluche.precio = precioPelucheNumerico.toFixed(2);

//                 botonPeluche.classList.add('active');
//                 botonPeluche.innerText = 'Agregado';

//                 // Actualizar tabla
//                 filaPeluche.style.display = 'table-row';
//                 tdNombrePeluche.innerText = `Peluche: ${peluche.dataset.nombre} (SKU: ${peluche.dataset.sku})`;
//                 tdPrecioPeluche.innerText = `S/.${precioPelucheNumerico.toFixed(2)}`;
//             }

//             precioProducto.innerText = `S/.${dataPedido.precioTotal}`;
//             dataPedido.enlace = enlaceWsp;

//             whatsappUrl(dataPedido);
//         });
//     });
// };

// Función para manejar vinil
const handleVinil = () => {

    const modalVinil = document.getElementById(`producto-vinil`);
    const checkVinil = modalVinil.querySelector(`#checkvinil`);
    const boxTextVinil = modalVinil.querySelector(`.textvinil`);
    const inputVinil = boxTextVinil.querySelector(`#textvinil`);

    const precioProducto = document.getElementById(`precio-total`);
    const enlaceWsp = document.getElementById(`producto-pedido`).querySelector('.wsp-pedido');

    const filaVinil = document.getElementById(`row-vinil`);
    const tdNombreVinil = filaVinil.querySelector(`#nombre-vinil`);
    const tdPrecioVinil = filaVinil.querySelector(`#precio-vinil`);

    boxTextVinil.style.display = 'none';

    checkVinil.addEventListener('change', () => {
        boxTextVinil.style.display = checkVinil.checked ? 'block' : 'none';
        if (!checkVinil.checked) {
            inputVinil.value = '';
            dataPedido.vinil.mensaje = '';
            dataPedido.vinil.precio = 0;

            filaVinil.style.display = 'none';
            tdNombreVinil.innerText = '';
            tdPrecioVinil.innerText = '';
        }
        precioProducto.innerText = `S/.${dataPedido.precioTotal}`;
        dataPedido.enlace = enlaceWsp;
        whatsappUrl(dataPedido);
    });

    inputVinil.addEventListener('input', () => {
        if (inputVinil.value.length > 50) {
            inputVinil.value = inputVinil.value.slice(0, 50);
        }

        if (inputVinil.value == '') {
            dataPedido.vinil.mensaje = '';
            dataPedido.vinil.precio = 0;

            filaVinil.style.display = 'none';
            tdNombreVinil.innerText = '';
            tdPrecioVinil.innerText = '';

        } else {
            dataPedido.vinil.mensaje = inputVinil.value;
            dataPedido.vinil.precio = parseFloat(6).toFixed(2);

            filaVinil.style.display = 'table-row';
            tdNombreVinil.innerText = `Mensaje: "${inputVinil.value}"`;
            tdPrecioVinil.innerText = `S/.${parseFloat(6).toFixed(2)}`;
        }

        precioProducto.innerText = `S/.${dataPedido.precioTotal}`;
        dataPedido.enlace = enlaceWsp;
        whatsappUrl(dataPedido);
    });
};

// export const handleVinil = () => {
//     const modals = document.querySelectorAll('.modal');

//     modals.forEach(modal => {
//         const index = modal.id.replace('productModal', '');
//         const modalVinil = document.getElementById(`moda-vinil${index}`);
//         const checkVinil = modalVinil.querySelector(`#checkvinil${index}`);
//         const boxTextVinil = modalVinil.querySelector(`.textvinil`);
//         const inputVinil = boxTextVinil.querySelector(`#textvinil${index}`);

//         const precioProducto = document.getElementById(`precio-total${index}`);
//         const enlaceWsp = document.getElementById(`modal-pedido${index}`).querySelector('.wsp-pedido');

//         const filaVinil = document.getElementById(`row-vinil${index}`);
//         const tdNombreVinil = filaVinil.querySelector(`#nombre-vinil${index}`);
//         const tdPrecioVinil = filaVinil.querySelector(`#precio-vinil${index}`);

//         boxTextVinil.style.display = 'none';

//         checkVinil.addEventListener('change', () => {
//             boxTextVinil.style.display = checkVinil.checked ? 'block' : 'none';
//             if (!checkVinil.checked) {
//                 inputVinil.value = '';
//                 dataPedido.vinil.mensaje = '';
//                 dataPedido.vinil.precio = 0;

//                 filaVinil.style.display = 'none';
//                 tdNombreVinil.innerText = '';
//                 tdPrecioVinil.innerText = '';
//             }
//             precioProducto.innerText = `S/.${dataPedido.precioTotal}`;
//             dataPedido.enlace = enlaceWsp;
//             whatsappUrl(dataPedido);
//         });

//         inputVinil.addEventListener('input', () => {
//             if (inputVinil.value.length > 50) {
//                 inputVinil.value = inputVinil.value.slice(0, 50);
//             }

//             if (inputVinil.value == '') {
//                 dataPedido.vinil.mensaje = '';
//                 dataPedido.vinil.precio = 0;

//                 filaVinil.style.display = 'none';
//                 tdNombreVinil.innerText = '';
//                 tdPrecioVinil.innerText = '';

//             } else {
//                 dataPedido.vinil.mensaje = inputVinil.value;
//                 dataPedido.vinil.precio = parseFloat(6).toFixed(2);

//                 filaVinil.style.display = 'table-row';
//                 tdNombreVinil.innerText = `Mensaje: "${inputVinil.value}"`;
//                 tdPrecioVinil.innerText = `S/.${parseFloat(6).toFixed(2)}`;
//             }

//             precioProducto.innerText = `S/.${dataPedido.precioTotal}`;
//             dataPedido.enlace = enlaceWsp;
//             whatsappUrl(dataPedido);
//         });
//     });
// };


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchArreglos: function() { return /* binding */ fetchArreglos; },
/* harmony export */   fetchFlores: function() { return /* binding */ fetchFlores; },
/* harmony export */   fetchGigantes: function() { return /* binding */ fetchGigantes; },
/* harmony export */   fetchHelios: function() { return /* binding */ fetchHelios; },
/* harmony export */   fetchPeluches: function() { return /* binding */ fetchPeluches; }
/* harmony export */ });
// Función genérica para obtener datos de Google Sheets
async function fetchSheetData(sheetName, range) {
    const API_KEY = 'AIzaSyB0wl-sQaS72bOzVKBbsdgPKMK9_IYlUWA';
    const SPREADSHEET_ID = '1UeRsfG_I1Ai27zZuWNzL4CYHdP9gzCd49Sz1IkNBtmE';

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}!${range}?key=${API_KEY}`);
    const data = await response.json();
    return data.values.slice(1); // Ignoramos la primera fila de títulos
}

// Función para procesar las URLs de imágenes
function procesarImagenUrl(imagenUrl, tamanio) {
    if (imagenUrl.includes('drive.google.com/file/d/')) {
        const fileId = imagenUrl.match(/\/d\/(.*?)\//)[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${tamanio}`;
    }
    return imagenUrl;
}

// Función para remover tildes y otros diacríticos
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para transformar los datos de productos
function transformarProducto(row) {
    return {
        id: row[0],
        thumbnail: row[1] ? procesarImagenUrl(row[1], 300) : null,
        imagen: row[1] ? procesarImagenUrl(row[1], 1000) : null,
        nombre: row[2],
        precio: row[3],
        notas: row[4],
        descripcion: row[5],
        contenido: row[6] ? row[6].split('; ') : [],
        subcategorias: row[7] ? row[7].split('; ') : [],
        sku: row[8] ? normalizarTexto(row[8]) : null,
        destacado: row[9].toLowerCase() === 'true' ? true : false,
        visible: row[10].toLowerCase() === 'true' ? true : false,

    };
}

// Función para transformar los datos de peluches
function transformarPeluche(row) {
    return {
        id: row[0],
        imagen: procesarImagenUrl(row[1]),
        precio: row[2],
        nombre: row[3],
        altura: row[4],
        sku: row[5],
        unidades: row[6]
    };
}

// Fetch de productos
// export async function fetchProducts() {
//     const data = await fetchSheetData('Productos', 'A:K');
//     const products = data.map(transformarProducto).filter(product => product.id);
//     return products;
// }

// Fetch de arreglos
async function fetchArreglos() {
    const data = await fetchSheetData('Arreglos', 'A:K');
    const products = data.map(transformarProducto).filter(product => product.id);
    return products;
}

// Fetch de arreglos gigantes
async function fetchGigantes() {
    const data = await fetchSheetData('Gigantes', 'A:K');
    const products = data.map(transformarProducto).filter(product => product.id);
    return products;
}

// Fetch de arreglos helios
async function fetchHelios() {
    const data = await fetchSheetData('Helios', 'A:K');
    const products = data.map(transformarProducto).filter(product => product.id);
    return products;
}

// Fetch de arreglos flores
async function fetchFlores() {
    const data = await fetchSheetData('Flores', 'A:K');
    const products = data.map(transformarProducto).filter(product => product.id);
    return products;
}


// Fetch de peluches
async function fetchPeluches() {
    const data = await fetchSheetData('Peluches', 'A:G');
    const peluches = data.map(transformarPeluche).filter(peluche => peluche.id);
    return peluches;
}

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _funciones_help_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);




document.addEventListener('DOMContentLoaded', () => {
    const mostrador = document.getElementById('mostrador');
    if (!mostrador) return;

    const categorias = {
        globos: [],
        gigantes: [],
        flores: [],
        helio: []
    };

    // Función para procesar los productos
    const processProducts = async (template) => {
        try {
            const data = await (0,_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchProducts)();
            data.forEach(product => {
                if (product.destacado) {
                    categorias[product.categoria].push(product);
                }
            });

            // Ordenar y limitar productos por categoría
            (0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_2__.orderPrice)(categorias);
            Object.keys(categorias).forEach(categoria => {
                categorias[categoria] = categorias[categoria].slice(0, 4);
            });

            // Agregar productos al DOM
            addProductsToDOM(categorias, template);
            (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.initializeModals)();
            return categorias;
        } catch (error) {
            console.error('Error processing products:', error);
            throw error;
        }
    };

    // Función para agregar productos al DOM
    const addProductsToDOM = (categorias, template) => {
        Object.keys(categorias).forEach(categoria => {
            const contenedorCategoria = document.querySelector(`#${categoria} .productos`);

            categorias[categoria].forEach((product, index) => {
                if (!product.id) return;

                const contenidoLista = product.contenido.length > 0
                    ? product.contenido.map(item => `<li>${item}</li>`).join('')
                    : '';

                const itemHtml = template
                    .replace(/{{cols}}/g, 'col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-12')
                    .replace(/{{imagen}}/g, product.imagen)
                    .replace(/{{nombre}}/g, product.nombre)
                    .replace(/{{precio}}/g, product.precio)
                    .replace(/{{video}}/g, product.video)
                    .replace(/{{descripcion}}/g, product.descripcion)
                    .replace(/{{contenido}}/g, contenidoLista)
                    .replace(/{{index}}/g, product.categoria + index)
                    .replace(/{{sku}}/g, product.sku);

                contenedorCategoria.innerHTML += (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.generateProductHtml)(template, product, categoria, index, contenidoLista);
                //contenedorCategoria.innerHTML += itemHtml;
            });
        });
    };

    // Función para inicializar el mostrador
    const initializeMostrador = async () => {
        try {
            const template = await (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.fetchTemplate)();
            await processProducts(template);
            (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.hideEmptyModals)();
            (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.handleProducto)();
            (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.handleVinil)();
            await (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.handlePeluches)();
        } catch (error) {
            console.error('Error initializing mostrador:', error);
        }
    }

    if (document.body.id === 'index') {
        initializeMostrador();
    }
});

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _funciones_help_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);




document.addEventListener('DOMContentLoaded', () => {
    const catalogo = document.getElementById('catalogo');
    if (!catalogo) return;

    const categoriaPrincipal = catalogo.dataset.categoria;

    const normalizeSubcategoria = (subcategoria) => {
        return subcategoria
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '');
    };

    const processProducts = async (template, fetchCategory) => {
        try {
            const data = await fetchCategory();
            const subcategorias = categorizeProducts(data);
            (0,_funciones_help_js__WEBPACK_IMPORTED_MODULE_2__.orderPrice)(subcategorias);

            const tabSubcategorias = document.getElementById('tab-subcategorias');
            const contentSubcategorias = document.getElementById('content-subcategorias');
            createTabs(subcategorias, tabSubcategorias, contentSubcategorias, template);

            return subcategorias;
        } catch (error) {
            console.error('Error processing products:', error);
            throw error;
        }
    };

    // Organizar productos por categoria
    const categorizeProducts = (data) => {
        const subcategorias = {};

        data.forEach(product => {
            if (product.visible === true && product.id) {
                product.subcategorias.forEach(subcategoria => {
                    if (!subcategorias[subcategoria]) {
                        subcategorias[subcategoria] = [];
                    }
                    subcategorias[subcategoria].push(product);
                });
            }
        });

        return subcategorias;
    };

    // Creando tabs para categorias
    const createTabs = (subcategorias, tabSubcategorias, contentSubcategorias, template) => {
        Object.keys(subcategorias).sort().forEach((subcategoria, index) => {
            const normalizeSubcat = normalizeSubcategoria(subcategoria);
            const tabId = `subcategoria-${normalizeSubcat}`;
            const isFirstTab = index === 0;
            const activeClass = isFirstTab ? 'active' : '';

            tabSubcategorias.appendChild(createTabElement(subcategoria, tabId, activeClass, isFirstTab));
            contentSubcategorias.appendChild(createContentPane(subcategorias[subcategoria], subcategoria, tabId, isFirstTab, template));
        });
    };

    const createTabElement = (subcategoria, tabId, activeClass, isFirstTab) => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
            <button class="nav-link ${activeClass}" id="${tabId}-tab" data-bs-toggle="pill"
                data-bs-target="#${tabId}" data-parametro="${normalizeSubcategoria(subcategoria)}" type="button" role="tab" aria-controls="${tabId}"
                aria-selected="${isFirstTab}"><i class="bi bi-arrow-right-short"></i> ${subcategoria}</button>
        `;
        return li;
    };

    const createContentPane = (productos, subcategoria, tabId, isFirstTab, template) => {
        const div = document.createElement('div');
        div.classList.add('tab-pane', 'fade');
        if (isFirstTab) {
            div.classList.add('show', 'active');
        }
        div.id = tabId;
        div.setAttribute('role', 'tabpanel');
        div.setAttribute('aria-labelledby', `${tabId}-tab`);
        div.setAttribute('tabindex', '0');

        const productosDiv = document.createElement('div');
        productosDiv.classList.add('row', 'productos');
        div.appendChild(productosDiv);

        productos.forEach((product, index) => {
            if (!product.id) return;
            const contenidoLista = product.contenido.length > 0
                ? product.contenido.map(item => `<li>${item}</li>`).join('')
                : '';

            productosDiv.innerHTML += (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.generateProductHtml)(template, product, normalizeSubcategoria(subcategoria), index, contenidoLista);
        });

        return div;
    };

    const urls = () => {
        const event = new Event('subcategorias-loaded');
        document.dispatchEvent(event);
    };

    // Función para inicializar el mostrador
    const initializeMostradorCategory = async (fetchCategory) => {
        try {
            const template = await (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.fetchTemplate)();
            await processProducts(template, fetchCategory);
            urls();
            (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.handleProducto)();
        } catch (error) {
            console.error('Error initializing mostrador:', error);
        }
    }

    if (document.body.id === 'category-page') {
        if (categoriaPrincipal === 'globos') {
            initializeMostradorCategory(_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchArreglos);
        } else if (categoriaPrincipal === 'gigantes') {
            initializeMostradorCategory(_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchGigantes);
        } else if (categoriaPrincipal === 'helio') {
            initializeMostradorCategory(_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchHelios);
        } else if (categoriaPrincipal === 'flores') {
            initializeMostradorCategory(_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchFlores);
        } else {
            initializeMostradorCategory();
        }
    }
});

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



document.addEventListener('DOMContentLoaded', () => {
    const informacion = document.getElementById('informacion-producto');
    if (!informacion) return;

    const categoriaPrincipal = informacion.dataset.categoria;

    const normalizeSubcategoria = (subcategoria) => {
        return subcategoria
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '');
    };

    const getSKUFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('sku');
    };


    const processProduct = async (fetchCategory) => {
        try {
            const data = await fetchCategory();
            const sku = getSKUFromURL();
            const product = data.find(item => item.sku === sku);

            if (product && product.visible === true) {
                const contentImage = document.getElementById('imagen-principal');
                replaceTemplate(informacion, product);
                contenidoLista();
                breadcrumbs(product);
            } else {
                console.error('Producto no encontrado para el SKU:', sku);
                window.location = window.location.origin + "/404";
            }
        } catch (error) {
            console.error('Error processing products:', error);
            throw error;
        } finally {
            setTimeout(() => {
                document.getElementById('informacion-producto').style.display = '';
            }, 300);
        }
    };

    const replaceTemplate = (templateElement, product) => {
        const keys = Object.keys(product);
        keys.forEach(key => {
            Array.from(templateElement.attributes).forEach(attr => {
                if (attr.value.includes(`{{${key}}}`)) {
                    attr.value = attr.value.replace(`{{${key}}}`, product[key]);
                }
            });
            templateElement.innerHTML = templateElement.innerHTML.replace(
                new RegExp(`{{${key}}}`, 'g'),
                product[key]
            );
        });
    };

    const contenidoLista = () => {
        const productoContenido = document.getElementById("producto-contenido");
        const contenidoTexto = productoContenido.getAttribute("data-contenido");

        if (!contenidoTexto || contenidoTexto.trim() === "") {
            productoContenido.style.display = "none";
            return; 
        }

        const contenidoArray = contenidoTexto.split(',').map(item => item.trim());
        const ulElement = productoContenido.querySelector("ul");
        
        contenidoArray.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ulElement.appendChild(li);
        });
    }

    const breadcrumbs = (product) => {
        // console.log(product);
        const breads = document.getElementById('breadcrumbs');
        const pathArray = window.location.pathname.split('/');

        const homeUrl = window.location.origin;
        const tipoUrl = homeUrl + '/' + pathArray[1];

        const subcategoriasLinks = product.subcategorias.map(subcategoria =>
            `<a href="${tipoUrl}/?categoria=${normalizeSubcategoria(subcategoria)}">${subcategoria}</a>`
        ).join(', ');

        const div = document.createElement('DIV');
        div.classList.add('col-12');
        div.innerHTML = `<p>
            <a href="${homeUrl}"><i class="bi bi-house-fill"></i> Inicio</a> <i class="bi bi-caret-right-fill"></i> 
            <a href="${tipoUrl}">${pageTitle}</a> <i class="bi bi-caret-right-fill"></i> 
            ${subcategoriasLinks} <i class="bi bi-caret-right-fill"></i> 
            ${product.nombre}
        </p>`;
        breads.appendChild(div);
    };

    // Función para inicializar el template
    const initializeSingle = async (fetchCategory) => {
        try {
            await processProduct(fetchCategory);
            (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.handleProductoSeleccionado)();
            // urls();
            // hideEmptyModals();
            // handleProducto();
            (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.handleVinil)();
            await (0,_loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__.handlePeluches)();
        } catch (error) {
            console.error('Error initializing mostrador:', error);
        }
    }

    if (document.body.id === 'single-page') {
        if (categoriaPrincipal === 'globos') {
            initializeSingle(_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchArreglos);
        } else if (categoriaPrincipal === 'gigantes') {
            initializeSingle(_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchGigantes);
        } else if (categoriaPrincipal === 'helio') {
            initializeSingle(_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchHelios);
        } else if (categoriaPrincipal === 'flores') {
            initializeSingle(_sheetsdb_js__WEBPACK_IMPORTED_MODULE_0__.fetchFlores);
        } else {
            initializeSingle();
        }
    }
});


/***/ }),
/* 8 */
/***/ (function() {

document.addEventListener('subcategorias-loaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const subcategoria = urlParams.get('categoria');

    if (subcategoria) {
        const tabButton = document.querySelector(`button[data-parametro="${subcategoria}"]`);
        if (tabButton) {
            const tabInstance = new bootstrap.Tab(tabButton);
            tabInstance.show();
        } else {
            console.log('No se encontró el botón de tab para la subcategoría: ' + subcategoria);
        }
    }

    // Agregar event listener a cada botón de subcategoría para actualizar la URL
    const tabButtons = document.querySelectorAll('#tab-subcategorias button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-parametro');
            urlParams.set('categoria', target);
            window.history.replaceState(null, '', `?${urlParams.toString()}`);
        });
    });
});

/***/ }),
/* 9 */
/***/ (function() {

var myCarousel = document.querySelector('#slider-principal');
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 5000,
  wrap: true
});

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loadparts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _loadgrillas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _grilla_tabs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _grilla_category_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _single_product_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _urls_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _urls_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_urls_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_slider_js__WEBPACK_IMPORTED_MODULE_6__);
// import './funciones_help.js';
// import './sheetsdb.js';



 



}();
/******/ })()
;