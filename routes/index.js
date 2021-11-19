const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

module.exports = (app, passport) => {
  //一般使用者認證
  const authenticated = (req, res, next) => {
    console.log('00:', req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    console.log('01')
    res.redirect('/signin')
  }
  //系統管理員認證
  const authenticatedAdmin = (req, res, next) => {
    console.log('1')
    if (req.isAuthenticated()) {
      console.log('2')
      if (req.user.isAdmin) { return next() }
      return res.redirect('/')
    }
    console.log('3')
    res.redirect('/signin')
  }


  // app.get('/', (req, res) => { res.send('Hello World!')  })

  // app.get('/restaurants', restController.getRestaurants)

  // 連到 /admin 頁面就轉到 /admin/restaurants
  // app.get('/admin', (req, res) => res.redirect('/admin/restaurants'))

  // 在 /admin/restaurants 底下則交給 adminController.getRestaurants 處理
  // app.get('/admin/restaurants', adminController.getRestaurants)
  
  app.get('/', authenticated, (req, res) => res.redirect('/restaurants'))
  app.get('/restaurants', authenticated, restController.getRestaurants)
  
  //註冊
  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)

  //登入
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)


  app.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))
  app.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
  app.get('/admin/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
  app.post('/admin/restaurants', authenticatedAdmin, upload.single('image'), adminController.postRestaurant)
  app.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)
  app.get('/admin/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)
  app.put('/admin/restaurants/:id', authenticatedAdmin, upload.single('image'), adminController.putRestaurant)
  app.delete('/admin/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant)
}
