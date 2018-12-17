const monsterContainer = document.querySelector('#monster-container')
const monsterFormContainer = document.querySelector('#create-monster');

// ON PAGE LOAD
document.addEventListener("DOMContentLoaded", function(){
    getAllMonsters()
    createForm()
});

// Fetch All Monsters
function getAllMonsters() {
    fetch('http://localhost:3000/monsters')
    .then(response => response.json())
    .then(data => {
        //data is an array
        data.slice(0, 50).forEach(monster => {
            renderMonster(monster)
        })
    })
}

// Form to create new monster
function createForm() {
    const monsterForm = document.createElement("form");
    monsterForm.setAttribute('id', 'monster-form')
    monsterForm.innerHTML = `
        First name: <input type="text" id="monster-name" placeholder="Name...">
        Age: <input type="text" id="monster-age" placeholder="Age...">
        Description: <input type="text" id="monster-description" placeholder="Description">
        <input type="submit" id="submit" value="Add Monster">`.trim()
    monsterForm.addEventListener('submit', postMonster)
    monsterFormContainer.append(monsterForm)
}

function postMonster(event) {
    event.preventDefault()
    let name = document.querySelector('#monster-name').value
        let age = document.querySelector('#monster-age').value
        let description = document.querySelector('#monster-description').value
        let monsterData = {
            name: name,
            age: age,
            description: description  
        }   
        
        addMonster(monsterData)
}

function addMonster(monsterData) {
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(monsterData)
    })
        .then(response => response.json())
        .then(monsterData => {
        console.log(monsterData)
    })
}

    

function renderMonster(monster) {
    console.log(monster)
    const monsterDetails = 
    `<div>
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
    </div>`

    monsterContainer.innerHTML += monsterDetails;
}





