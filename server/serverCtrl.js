
module.exports = {

  createStylist: function(req, res, next){
    const db = req.app.get('db')
    // const {name, lastname, email, password} = req.body
    const name = req.body.name
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    console.log(req.body)
    db.createStylist([name, lastname, email, password]).then(results => {
      res.status(200).json(results)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }


}
