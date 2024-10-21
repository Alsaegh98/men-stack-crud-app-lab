

const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')

const app = express()

const PlanetCtrl = require('./controllers/planets')


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))


mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.get('/', async (req, res) => {
  res.render('index.ejs')
})


app.get('/planets', PlanetCtrl.index)


app.get('/planets/new', PlanetCtrl.new)


app.delete('/planets/:planetId', PlanetCtrl.delete)


app.get('/planets/:planetId', PlanetCtrl.show)


app.post('/planets', PlanetCtrl.create)


app.get('/planets/:planetId/edit', PlanetCtrl.edit)

app.put('/planets/:planetId', PlanetCtrl.update)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})