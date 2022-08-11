//Registro de Usuarios

class Usuario {
    constructor(username, email, password) {
        this.u = username
        this.e = email
        this.p = password
    }
}

let usuarios = []

if (localStorage.getItem("usuarios")) {
    usuarios = JSON.parse(localStorage.getItem("usuarios"))
} else {
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

const form = document.getElementById("idForm")
const divUsers = document.getElementById("divUsers")
const botonUsers = document.getElementById("botonUsers")

form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event.target)

    let datForm = new FormData(event.target)

    console.log(datForm.get("user"), datForm.get("email"), datForm.get("password"))

    const usuario = new Usuario(datForm.get("user"), datForm.get("email"), datForm.get("password"))

    usuarios.push(usuario)
    console.log(usuarios)

    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    form.reset()
})

botonUsers.addEventListener("click", () => {
    let arrayStorage = JSON.parse(localStorage.getItem("usuarios"))
    divUsers.innerHTML = ""

    arrayStorage.forEach((usuario, indice) => {
        divUsers.innerHTML += `
        <div class="card border-dark mb-3" id ="usuario ${indice}" style="max-width: 20rem; margin: 4px;">
            <div class="card-header"><h2></h2>${usuario.u}</h2></div>
            <div class="card-body"> 
                <p class="card-title">${usuario.e}</p>
                <button class = "btn btn-danger">Eliminar Usuario</button>
            </div>
        </div>`
    })

    arrayStorage.forEach((usuario, indice) => {
        let botonCard = document.getElementById(`usuario ${indice}`).lastElementChild.lastElementChild

        botonCard.addEventListener("click", () => {
            document.getElementById(`usuario ${indice}`).remove()
            usuarios.splice(indice, 1)
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
            console.log(`${usuario.u} Eliminado/a`)
        })
    })
})

//Tema

const botonDarkMode = document.getElementById("botonDarkMode")
const botonLightMode = document.getElementById("botonLightMode")

let darkMode

(localStorage.getItem("theme")) ? darkMode = localStorage.getItem("theme") : localStorage.setItem("theme", "light")

if (darkMode == "dark") {
    document.body.classList.add('darkMode')
}

botonDarkMode.addEventListener("click", () => {

    document.body.classList.add('darkMode')
    localStorage.setItem('theme', "dark")
})

botonLightMode.addEventListener("click", () => {

    document.body.classList.remove('darkMode')
    localStorage.setItem('theme', "light")
})