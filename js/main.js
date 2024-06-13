document.addEventListener('DOMContentLoaded', function () {
    fetch('productos-papa.json')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('productos');

            products.forEach((product, index) => {
                // Crear tarjeta de producto
                const productCard = document.createElement('div');
                productCard.classList.add('col-3', 'producto');
                productCard.setAttribute('data-bs-toggle', 'modal');
                productCard.setAttribute('data-bs-target', '#productModal'+index);
                productCard.innerHTML = `
                    <div class="imagen">
                        <img src="${product.imagen}" alt="">
                    </div>
                    <div class="descripcion">
                        <p class="titulo">${product.nombre}</p>
                        <p class="precio">s/ ${product.precio}</p>
                    </div>
                    <div class="detalles">
                        <button>Detalles del producto</button>
                    </div>
                `;
                productContainer.appendChild(productCard);

                // Crear modal de producto
                const productModal = document.createElement('div');
                productModal.classList.add('modal', 'fade', 'producto-modal');
                productModal.id = `productModal${index}`;
                productModal.tabIndex = -1;
                productModal.setAttribute('aria-labelledby', `productModalLabel${index}`);
                productModal.setAttribute('aria-hidden', 'true');
                productModal.innerHTML = `
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-5">
                                        <img src="${product.imagen}" class="img-fluid mb-3" alt="${product.nombre}">
                                    </div>
                                    <div class="col-6 offset-md-1">
                                        <h5 class="modal-title" id="productModalLabel${index}">${product.nombre}</h5>
                                        <p><b>Descripción:</b></p>
                                        <p>${product.descripcion}</p>
                                        <a href="https://api.whatsapp.com/send?phone=51940541547&text=Me%20interesa%20el%20producto%20${encodeURIComponent(product.nombre)}" target="blank_" class="wsp-pedido"><i class="bi bi-whatsapp"></i> Solicitar producto</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
                document.body.appendChild(productModal);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
});