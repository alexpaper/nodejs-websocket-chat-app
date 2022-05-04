// 1 Select elements
const input = document.querySelector('input');
const textArea = document.querySelector('textarea');
const connected = document.querySelector('.connected');

// 2 WEBSOCKET CLIENT
const ws = new WebSocket('ws://localhost:8080');
// 3 OPEN EVENT LISTENER
ws.addEventListener('open', ()=>{
    console.log('Connection established!');
    connected.textContent = 'Connected 🛰️.';
    connected.classList.add('active');

    // ws.send(JSON.stringify({client: clientName, message: 'Hello from client!'}));
});
// 4 ON CLOSE EVENT LISTENER
ws.addEventListener('close', ()=>{
    connected.textContent = 'Disconnected 📡.'
    connected.classList.remove('active');
    console.log('Disconnected 📡');
});
// 5 MESSAGE EVENT LISTENER
ws.addEventListener('message', e =>{
    // console.log(e)
    let {data} = e;
    let newData = JSON.parse(data);
    // console.log(newData.message)
    // console.log(newData.time);
    // console.log('received: %s', newData);
    textArea.value = newData.time + ' ' + newData.message;
});

// 6 INPUT KEYPRESS EVENT LISTENER
input.addEventListener('keypress', e =>{
    if(e.code === 'Enter' && input.value !== ''){ 
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString();
        let datetime = ('⌚' + date + ' ' + time).toString();
        ws.send(JSON.stringify({time: datetime, message: `💬 ${input.value}`}));
        input.value = '';
    };
});
