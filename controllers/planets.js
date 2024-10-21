const planet = require('../models/planet.js')

const index = async (req, res) => {
  const allplanets = await planet.find({})
 
  res.render('planets/index.ejs', { planets: allplanets })
}

const newplanet = (req, res) => {
  res.render('planets/new.ejs')
}

const create = async (req, res) => {
   
    const formData = req.body
    if (req.body.isReadyToSee === 'on') {
      formData.isReadyToSee = true
    } else {
      formData.isReadyToSee = false
    }
  
  
    await planet.create(formData)
  

    res.redirect('/planets')
  }

const show = async (req, res) => {
    const foundplanet = await planet.findById(req.params.planetId)
    res.render('planets/show.ejs', { planet: foundplanet })
  }

const deleteplanet = async (req, res) => {
    await planet.findByIdAndDelete(req.params.planetId)
    res.redirect('/planets')
  }

const edit = async (req, res) => {
    const foundplanet = await planet.findById(req.params.planetId)
    console.log(foundplanet)
    res.render('planets/edit.ejs', { planet: foundplanet })
  }

const update = async (req, res) => {
  
    const formData = req.body
    if (req.body.isReadyToSee === 'on') {
      formData.isReadyToSee = true
    } else {
      formData.isReadyToSee = false
    }
    await planet.findByIdAndUpdate(req.params.planetId, formData)
    res.redirect(`/planets/${req.params.planetId}`)
  }

module.exports = {
  index,
  new: newplanet,
  create,
  show,
  delete: deleteplanet,
  edit, 
  update,
}