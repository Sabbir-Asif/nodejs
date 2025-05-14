const EventEmitter = require('events');

const emitter = new EventEmitter();


emitter.on('newUser', (name) => {
    console.log(`welcome ${name}`);
})

emitter.emit('newUser', 'Sabbir');

const filePath = __filename.split('\\');
const fileName = filePath[filePath.length-1]
const dirName = filePath[filePath.length-2];

console.log('directory path: ',__dirname);
console.log('directory name: ',dirName);
console.log('file path: ',__filename);
console.log('file name: ',fileName);

console.log('current working directory: ',process.cwd());