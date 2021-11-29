import WebSocket, { WebSocketServer } from 'ws';

//Servidor que escucha peticiones de web socket, en el puerto 3000
const wss = new WebSocketServer({ port: 3000 });

//Datos
let browsers = [
  {'longName':'Mozilla', 'shortName':'mozilla', 'votes':30, 'percentage':30, 'type': 'progress-danger'},
  {'longName':'Chrome', 'shortName':'chrome', 'votes':40, 'percentage':40, 'type': 'progress-info'},
  {'longName':'Edge', 'shortName':'edge', 'votes':10 , 'percentage':10, 'type': 'progress-striped'},
  {'longName':'Opera', 'shortName':'opera', 'votes':20, 'percentage':20, 'type': 'progress-success'}
]

//Al establecer la conexión
wss.on('connection', function connection(ws) {

  //Para un cliente nuevo: Envía los datos actuales
  console.log('cliente conectado')
  ws.send(JSON.stringify(browsers));

  //Al recibir un mensaje del cliente
  ws.on('message', (data) => {
    console.log('shortName: %s', data);

    let total = 0

    //Suma un voto al navegador correspondiente
    for(let browser of browsers) {
      if(browser.shortName == data) {
        browser.votes += 1
      }
      total += browser.votes
    }

    for(let browser of browsers) {
      browser.percentage = parseInt(browser.votes * 100 / total)
    }

    //Envía los nuevos datos a todos los clientes registrados
    wss.clients.forEach( (client) => {
      client.send(JSON.stringify(browsers));
    });

  });

  
});