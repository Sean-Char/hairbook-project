
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
  },

  createSale: function(req, res, next){
    const db = req.app.get('db')
    // console.log(req.session);
    const {fname, lname, service, product, sale, tips, date, note} = req.body;
    db.run('select id from stylist_table where fb_id = $1', [req.session.passport.user.id])
    .then(function(idResponse){
        id = idResponse.pop().id;
        db.createSale([fname, lname, service, product, Number(sale), Number(tips), date, note, Number(id)])
        .then( results => {
          return res.status(200).json(results)
        })
          .catch( err => {
            console.log(err);
            return res.status(500).json(err)
          })

    }).catch(function(err){
      console.log(err);
      return res.status(500).json(err);
    })
  },

  createPortfolio: function(req, res, next){
    const db = req.app.get('db')
    const {image, description, product, notes} = req.body;

    db.createPortfolio([image, description, product, notes]).then(function(results){
      return res.status(200).json(results)
    })
    .catch(function(err){
      return res.status(500).json(err)
    })
  },

  getSalesSum:function(req, res, next){
    const db = req.app.get('db')
    db.getSalesSum().then(function(results){
      return res.status(200).json(results[0].sum)
    })
    .catch(function(err){
      return res.status(500).json(err)
    })
  }

}
