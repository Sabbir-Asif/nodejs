const path = require('node:path');

const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt


path.basename(notes, path.extname(notes)); // notes

const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'

path.resolve('joe.txt'); // '/Users/joe/joe.txt' if run from my home folder

path.resolve('tmp', 'joe.txt'); // '/Users/joe/tmp/joe.txt' if run from my home folder

path.resolve('/etc', 'joe.txt'); // '/etc/joe.txt'

path.normalize('/users/joe/..//test.txt'); // '/users/test.txt'
