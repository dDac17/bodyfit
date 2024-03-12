document.addEventListener('DOMContentLoaded', function () {
    const addButtons = document.querySelectorAll('.card button')
    const carrito = document.querySelector('.sidebar')

    const cart = []

    function updateCart() {
        carrito.innerHTML = ''

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div')
            cartItem.classList.add('cart-item')
            cartItem.innerHTML = `
                <span>${item.title}</span>
                <span>${item.price}</span>
                <button class="remove-from-cart" data-index="${index}">Quitar</button>
            `;
            carrito.appendChild(cartItem)
        });

        const total = cart.reduce((acc, item) => acc + item.price, 0)
        const totalElement = document.createElement('div')
        totalElement.classList.add('cart-total')
        totalElement.textContent = `Total: ${total.toFixed(2)}€`
        carrito.appendChild(totalElement)

        const removeButtons = document.querySelectorAll('.remove-from-cart')
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const indexToRemove = parseInt(this.dataset.index)
                cart.splice(indexToRemove, 1)
                updateCart()
            })
        })
    }

    addButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const productContainer = this.closest('.card')
            if (productContainer) {
                const productTitle = productContainer.querySelector('.product-title').textContent;
                const productPrice = parseFloat(productContainer.querySelector('.product-price b').textContent)

                cart.push({ title: productTitle, price: productPrice })
                updateCart();
            }
        })
    })
})
