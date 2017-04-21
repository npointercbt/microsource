var eventStore = require('./eventstore.js');
var adder = require('./add.js');
var multiplier = require('./multiply.js');

eventStore.listen(3000, ()=>console.log('es started on port 3000'));
adder.listen(3001, ()=>console.log('adder started on port 3001'));
multiplier.listen(3002, ()=>console.log('multiplier started on port 3002'));