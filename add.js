// initialize express and dependencies
var request = require('superagent')
var add = require('./service.js')()

// we'll start our initial state at zero
var state = 0

// ... and build up our current state from the event log every time the service starts up
// in a real app we would store these 'snapshots' and apply an auditing strategy to maintain performance and correctness.
request.get('localhost:3000/log').then(res=>{
    res.body.map(reducer)
})

// reducers
// this is the world's simplest reducer - more complicated app states can be built up with nested reducers controlling branches of a state tree - this is the more 'reduxy' strategy but other methods could conceivably be used.
function reducer(message){
    state += message
}

// Routes
// these routes are required to satisfy our communication protocol and are almost identical between add.js and multiply.js
add.post('/receive', (req, res) => {
    console.log('add received:', req.body)
    reducer(req.body.event)
});

add.get('/state', (req, res) => {
    res.send(`\nadder state: ${state}\n`)
})

module.exports = add;