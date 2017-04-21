// First we’ll use our service factory and pull in super agent:
var request = require('superagent');
var eventStore = require('./service.js')();

// here we've set up an in memory array to serve as our event log. In a real app you would want to persist these events. 
var log = [1,1,1,1,2];

// we're going to use a super simple port based service registration. I've opted to use a set to guarantee we avoid pushing events to a service multiple times.
var listeners = new Set([]);

// Routes
eventStore.get('/log', (req, res) => res.send(log));

// Routes
eventStore.get('/subscribers', (req, res) => {
    listenersList = [...listeners];
    res.send([...listeners])
});

// this allows services to register themselves with our event store
eventStore.post('/subscribe/:port', (req, res) => {
    listenersList = [...listeners];
    listeners.add(req.params.port);
    res.send([...listeners])
});

// this iterates through each of our services and notifies them of the new event 
eventStore.post('/push', (req, res) => {
    // grab the event off the request body
    event = req.body.event;
    // add it to our event log
    log.push(event);
    // create an array from our es6 set so we can map over it
    listenersList = [...listeners];
    // push event to each of our services by triggering the agreed upon endpoint.
    listenersList.map(port=>{
        request.post(`localhost:${port}/receive`)
            .send({event})
            .end();
    })
    // return the updated log to confirm it was received correctly - would not do it real app for obvious performance reasons.
    res.send(log)
})

module.exports = eventStore;