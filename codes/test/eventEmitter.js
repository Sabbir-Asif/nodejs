const EventEmitter = require('events');

const emitter = new EventEmitter();


emitter.on('newUser', (name) => {
    console.log(`welcome ${name}`);
})

emitter.emit('newUser', 'Sabbir');