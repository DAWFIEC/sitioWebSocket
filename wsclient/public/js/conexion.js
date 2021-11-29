//Establecer una conexión mediante un web socket
var socket = new WebSocket('ws://localhost:3000');


//Al recibir un mensaje del servidor
socket.onmessage = function(event) {

  //Procesa el resultado y muestra los datos según la plantilla
  let browsers = JSON.parse(event.data);

  document.getElementById('browsers').innerHTML = ''
  
  for(let browser of browsers) {

    let name = browser.shortName
    let browsername = browser.longName
    let percentage = browser.percentage
    let type = browser.type

    let plantilla = `
      <strong><input type="radio" name="browser" value="${name}"> ${browsername}</strong><span class="pull-right">${percentage}%</span>
      <div class="progress ${type} active">
          <div class="bar" style="width: ${percentage}%;"></div>
      </div>
    `

    document.getElementById('browsers').innerHTML += plantilla
  }

  
};


//Al estar establecida la conexión
socket.onopen = () => {

  //El botón "votar" envía el valor seleccionado mediante un socket
  document.getElementById('vote').addEventListener('click', () => {

    let selected = document.querySelector('input[name="browser"]:checked');

    if(selected) {
      socket.send(selected.value)
    }

  })
}
