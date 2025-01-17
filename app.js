if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models') // 引入資料庫
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000

// 設定 view engine 使用 handlebars
app.engine('hbs', handlebars(
  {
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./config/handlebars-helpers.js')
  }
)
)

// app.engine('handlebars', handlebars({defaultLayout: 'main', helpers: require('./config/handlebars-helpers.js')}))

app.set('view engine', 'hbs')

// body-parser
app.use(express.urlencoded({ extended: true }))

// setup session and flash
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))

// setup passport
// setup session
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))

app.use('/upload', express.static(__dirname + '/upload'))

// 把 req.flash 放到 res.locals 裡面
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// 引入 routes 並將 app 傳進去，讓 routes 可以用 app 這個物件來指定路由
require('./routes')(app, passport)// 把 passport 傳入 routes

module.exports = app
