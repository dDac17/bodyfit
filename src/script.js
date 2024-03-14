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
                <span class = "product-title">${item.title}</span>
                <span class = "product-price">${item.price} €/Mes</span>
                <button class="remove-from-cart" data-index="${index}">Quitar</button>`
            carrito.appendChild(cartItem)
        })

        const total = cart.reduce((acc, item) => acc + item.price, 0)
        const totalElement = document.createElement('div')
        totalElement.classList.add('cart-total')
        totalElement.textContent = `Total: ${total.toFixed(2)}€`
        carrito.appendChild(totalElement)

        
        const btnFinalizar = document.createElement('button')
        btnFinalizar.classList.add('btn-finalizar')
        btnFinalizar.textContent = 'Finalizar compra'
        carrito.appendChild(btnFinalizar)

     btnFinalizar.addEventListener('click', function () {
        if (cart.length > 0) {
          alert('¡Compra finalizada con éxito!')
        window.location.href = '../index.html'
       } else {
         alert('Añade productos antes de finalizar la compra.')
       }
      })

        const removeButtons = document.querySelectorAll('.remove-from-cart')
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const indexToRemove = parseInt(this.dataset.index)
                cart.splice(indexToRemove, 1)
                updateCart()
            })
        })
    
        const totalAmountElement = document.getElementById('totalAmount')
        totalAmountElement.textContent = `${total.toFixed(2)}€`
        
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
