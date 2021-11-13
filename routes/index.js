const restController = require('../controllers/restController.js')

module.exports = (app) => {

  app.get('/', (req, res) => { 
    res.send('Hello World!') 
  }),
  app.get('/restaurants', restController.getRestaurants)
}
