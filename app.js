const characters = []
let currentPosition = 0


async function getCharacters() {
  characters.push(...(await (await fetch('https://www.breakingbadapi.com/api/characters')).json()))
  createPresentation()
  configurePresentation()
  setPresentation(characters[currentPosition])
  createTaskBar()
  createLeftButton()
  createRightButton()
  lBtn = document.getElementById('left')
  rBtn = document.getElementById('right')
  rBtn.addEventListener('click', setNextCharacter)
  lBtn.addEventListener('click', setLastCharacter)
}

function createPresentation() {
  let presentation = document.createElement("div");
  presentation.classList.add("presentation");
  document.body.appendChild(presentation)
}

function createDivInPresentation(divClass) {
  div = document.createElement('div')
  div.classList.add(divClass)
  presentation = document.getElementsByClassName("presentation")
  presentation[0].appendChild(div)
}

function configurePresentation() {
  createDivInPresentation('img')
  createDivInPresentation('description')
}

function setPresentation(character) {
  try {
    let description = document.getElementsByClassName('description')[0]
    let img = document.getElementsByClassName('img')[0]
    image = document.createElement('img')
    image.src = character.img
    image.style.width = '100%'
    image.style.height = '80%'
    img.appendChild(image)
    let title = document.createElement('h1')
    title.innerHTML = character.name
    let birthday = document.createElement('p')
    birthday.innerHTML = "data de nascimento: " + character.birthday
    let occupation = document.createElement('p')
    occupation.innerHTML = "Ocupações: " + '<br/>' + buildString(character.occupation)
    let nickname = document.createElement('p')
    nickname.innerHTML = "Apelido: " + character.nickname
    let actor = document.createElement('p')
    actor.innerHTML = "Ator: " + character.portrayed
    let appearance = document.createElement('p')
    appearance.innerHTML = "Aparece nas temporadas" + '<br/>' + buildString(character.appearance)
    description.appendChild(title)
    description.appendChild(birthday)
    description.appendChild(occupation)
    description.appendChild(nickname)
    description.appendChild(actor)
    description.appendChild(appearance)
  }catch(err){console.log(err)}
}


function buildString(array) {
  let string = '<ul>'
  for (let i = 0; i < array.length; i++) {
    string += '<li>' + array[i] + '</li>'
  }
  string += '</ul>'
  return string
}

function createTaskBar() {
  let taskBar = document.createElement('div')
  taskBar.classList.add('taskBar')
  document.body.appendChild(taskBar)
}

function createLeftButton() {
  let presentation = document.getElementsByClassName('taskBar')
  let btn = document.createElement('button')
  btn.innerHTML = 'left'
  btn.id = 'left'
  btn.onclick = 'changeCharacter()'
  presentation[0].appendChild(btn)
}
function createRightButton() {
  let presentation = document.getElementsByClassName('taskBar')
  let btn = document.createElement('button')
  btn.innerHTML = 'right'
  btn.id = 'right'
  btn.onclick = 'changeCharacter()'
  presentation[0].appendChild(btn)
}

function setNextCharacter() {
  console.log('next')
  console.log(currentPosition)
  let presentation = document.getElementsByClassName('presentation')[0]
  let charName = document.getElementsByTagName('h1')[0].innerHTML
  currentPosition += 1
  presentation.parentNode.removeChild(presentation)
  createPresentation()
  configurePresentation()
  setPresentation(characters[currentPosition])
  if(currentPosition === characters.length-1) {
    currentPosition = 0
    console.log(currentPosition)
  }
}

function setLastCharacter() {
  let presentation = document.getElementsByClassName('presentation')[0]
  let charName = document.getElementsByTagName('h1')[0].innerHTML
  if(currentPosition === 0) currentPosition = characters.length - 1
  else currentPosition -= 1
  presentation.parentNode.removeChild(presentation)
  createPresentation()
  configurePresentation()
  setPresentation(characters[currentPosition])
}
