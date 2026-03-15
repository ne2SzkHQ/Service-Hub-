// =============================
// SERVICE HUB FULL SCRIPT
// =============================

// Load services from storage
let services = JSON.parse(localStorage.getItem("services")) || []

// =============================
// USER REGISTRATION
// =============================
function registerUser(event){

if(!event) return
event.preventDefault()

let name = document.getElementById("name")?.value
let email = document.getElementById("email")?.value
let password = document.getElementById("password")?.value
let type = document.getElementById("type")?.value

if(!name || !email || !password){
alert("Please fill all fields")
return
}

let user = {
name:name,
email:email,
password:password,
type:type
}

localStorage.setItem(email, JSON.stringify(user))

alert("Registration successful")

window.location.href="login.html"
}

// =============================
// USER LOGIN
// =============================
function loginUser(event){

if(!event) return
event.preventDefault()

let email = document.getElementById("email")?.value
let password = document.getElementById("password")?.value

let user = JSON.parse(localStorage.getItem(email))

if(user && user.password === password){

alert("Login successful")

localStorage.setItem("currentUser", email)

window.location.href="dashboard.html"

}else{

alert("Invalid email or password")
}
}

// =============================
// ADD SERVICE
// =============================
function addService(){

let serviceName = document.getElementById("serviceName")?.value
let providerName = document.getElementById("providerName")?.value
let location = document.getElementById("location")?.value

if(!serviceName || !providerName || !location){
alert("Please fill all fields")
return
}

let service = {
name: serviceName,
provider: providerName,
location: location,
rating: "⭐⭐⭐⭐"
}

services.push(service)

localStorage.setItem("services", JSON.stringify(services))

displayServices()

clearInputs()
}

// =============================
// DISPLAY SERVICES
// =============================
function displayServices(){

let list = document.getElementById("serviceList")

if(!list) return

list.innerHTML=""

services.forEach((service,index)=>{

list.innerHTML += `

<div class="card">

<h3>${service.name}</h3>

<p><b>Provider:</b> ${service.provider}</p>

<p><b>Location:</b> ${service.location}</p>

<p><b>Rating:</b> ${service.rating}</p>

<button onclick="bookService('${service.name}')">Book</button>

<button onclick="deleteService(${index})">Delete</button>
</div>

`
})
}

// =============================
// SEARCH SERVICES
// =============================
function searchService(){

let input = document.getElementById("search")?.value.toLowerCase()

let cards = document.querySelectorAll(".card")

cards.forEach(card => {

let text = card.innerText.toLowerCase()

if(text.includes(input)){
card.style.display="block"
}else{
card.style.display="none"
}
})
}

// =============================
// BOOK SERVICE
// =============================
function bookService(service){

alert("Booking confirmed for: " + service)
}

// =============================
// DELETE SERVICE
// =============================
function deleteService(index){

services.splice(index,1)

localStorage.setItem("services", JSON.stringify(services))

displayServices()
}

// =============================
// CLEAR INPUTS
// =============================
function clearInputs(){

let s = document.getElementById("serviceName")
let p = document.getElementById("providerName")
let l = document.getElementById("location")

if(s) s.value=""
if(p) p.value=""
if(l) l.value=""
}

// =============================
// LOGOUT
// =============================
function logout(){

localStorage.removeItem("currentUser")

window.location.href="login.html"
}

// =============================
// LOAD SERVICES WHEN PAGE OPENS
// =============================
displayServices()