var request = require('superagent')
var multiply = require('./service.js')()

var state = 1

// reducers
request.get('localhost:3000/log').then(res=>{
    res.body.map(reducer)
})

function reducer(message){
    state = state * message
}

// Routes
multiply.post('/receive', (req, res) => {
    console.log('multiply received:', req.body)
    reducer(req.body.event)
});

multiply.get('/state', (req, res) => {
    res.send(`\nmultiplier state: ${state}\n`)
})

module.exports = multiply;