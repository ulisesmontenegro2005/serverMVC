const socket = io();

async function getData() {
    const data = await fetch('/get-data');
    const prodsData = await fetch('/get-products');
    const cart = await fetch('/get-products-cart');
    const d = await data.json();
    const p = await prodsData.json();
    const c = await cart.json()

    return { data: d, prods: p, cart: c };
}

// GET BY IDS

const spanName = document.getElementById('span-email');
const spanEmail = document.getElementById('span-name');
const spanNameCart = document.getElementById('span-name-cart');
const spanEmailCart = document.getElementById('span-email-cart');
const spanContador = document.getElementById('span-contador');

async function inicio () {
    getData()
    .then(data => {
        if (spanEmailCart) {
            spanNameCart.innerHTML = data.data.user.email
            spanEmailCart.innerHTML = data.data.user.user
        }
        spanName.innerHTML = data.data.user.email
        spanEmail.innerHTML = data.data.user.user
        renderProducts(data.prods)
    })
    .catch(err => {
        console.log(err);
    })
}

inicio()

// ACTIONS OF CHAT APP

const formChat = document.getElementById('form-chat');
if (formChat === null) {
} else {
    formChat.addEventListener('submit', e => {
        e.preventDefault();
    
        const hora = new Date();
    
        getData()
        .then(data => {
            const message = {
                author: {
                    id: data.data.user._id,
                    nombre: data.data.user.username,
                    email: data.data.user.email
                },
                text: document.getElementById('chat-msg').value,
                hora: '[' + hora.toLocaleString() + ']'
            }
    
            socket.emit('update-chat', message);
            document.getElementById('chat-msg').value = '';
        })
        .catch(err => {
            console.log(err);
        })
    })
}

socket.on('messages', renderMessages)
async function renderMessages(messages) {

    const father = document.getElementById('chat')

    if (father === null) {
        return
    } else {
        let div = document.createElement('div')

        messages.forEach(el => {
            div.innerHTML = `
            <p>
                <span class="chat-text-mail text-info"> ${el.author.email} </span>
                <span class="chat-text-hora text-primary"> ${el.hora} </span> :
                <span class="chat-text-msg"> ${el.text} </span>
            </p>
            `
    
            father.appendChild(div)
        });
    
        document.getElementById('chat').innerHTML = father.innerHTML;
    }
}

function renderProducts (prods) {
    let father = document.getElementById('products')

    if (father === null) {
        return
    } else {
        prods.products.forEach(el => {

            
            let div = document.createElement('div')
    
            div.classList.add('col-3')
    
            div.innerHTML = `
                <img class="row col-12" src="${el.url}">
                <span class="row col-12 text-light"> <a href="/products/${el.code}">${el.name}</a> </span>
                <p class="row col-12 text-light">Code: ${el.code}</p>
                <div class="row">
                    <p class="col-6 text-light">Stock: ${el.stock}</p>
                    <p class="col-6 text-light"><b>${el.price}$</b></p>
                </div>
                <button class="row col-12" onClick="addToCart(${el.code})">Add to cart</button>
            `
    
            father.appendChild(div)
        })
    }
}

socket.on('cart', renderCart)
function renderCart () {
    getData()
    .then(data => {
        let father = document.getElementById('mainCart')

        if (father === null) {
            return
        } else {
            father.innerHTML = ''

            if (data.cart.cart.length === 0) {
                return father.innerHTML = '<h2 class="text-light">No hay productos en el carrito, <a href="/products"><p>Ir a la tienda</p></a></h2>'
            }

            data.cart.cart.forEach(el => {
                let div = document.createElement('div')
        
                div.classList.add('row')
        
                div.innerHTML = `
                    <img class="col-2" src="${el.url}">
                    <span class="col-3 text-light"> ${el.name} </span>
                    <div class="col-6">
                        <p class="text-light">Stock: ${el.stock}</p>
                        <p class="text-light">Cantidad: ${el.cantidad}</p>
                        <p class="text-light"><b>${el.price}$</b></p>
                    </div>
                    <button class="row col-1" onClick="deleteCart(${el.code})">Delete</button>
                `
        
                father.appendChild(div)
            })
        }
    })
}

async function addToCart (code) {
    const postReq = await fetch('/products/'+code, {
        method: 'post'
    }).then(d => {
        socket.emit('update-cart')
        Swal.fire({
            position: 'bottom-end',
            width: '15em',
            height: '1em',
            icon: 'success',
            title: 'Producto añadido correctamente.',
            showConfirmButton: false,
            timer: 1000
          })
    })
}

async function deleteCart (code) {
    const deleteReq = await fetch('/products/'+code, {
        method: 'delete'
    }).then(d => {
        socket.emit('update-cart')
    })
}

async function makeOrder () {
    getData()
    .then(data => {
        if (data.cart.cart.length === 0) {
            return Swal.fire({
                icon: 'warning',
                title: `Necesitas por lo menos un producto para realizar un pedido `,
                showConfirmButton: false,
                timer: 1500
            });
        }

        Swal.fire({
            icon: 'success',
            title: `Orden realizada correctamente, se envio un email con la confirmación del pedido.`,
            showConfirmButton: false,
            timer: 2000
        });
    
        setInterval(() => {
            const postReq = fetch('/order', {
                method: 'post'
            }).then(d => {
                window.location.href = '/';
            })
        }, 2000);
    })
}

async function logout() {
    getData()
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: `Te desloguaste correctamente ${data.data.user.user}`,
            showConfirmButton: false,
            timer: 2000
        });
    })
    .catch(err => {
        console.log(err);
    })

    setInterval(() => {
        window.location.href = '/logout';
    }, 2000);
}
