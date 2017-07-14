
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
    console.log(req.session);
    const {fname, lname, service, product, sale, tips, note} = req.body;
    db.createSale([fname, lname, service, product, Number(sale), Number(tips), note, req.user.id])
    .then( results => {
      return res.status(200).json(results)
    })
      .catch( err => {
        console.log(err);
        return res.status(500).json(err)
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
    if (!req.user || !req.user.id) {
      return res.status(401).json("Unauthorized")
    }
    const db = req.app.get('db')
    const sales = {}
    return Promise.all([
      db.getMonthlySales(req.user.id)
        .then(function(results){
          console.log(results)
          sales.monthly = results[0].monthly
        }),
      db.getWeeklySales(req.user.id)
        .then(function(results){
          console.log(results)
          sales.weekly = results[0].weekly
        }),
      db.getDailySales(req.user.id)
        .then(function(results){
          console.log(results)
          sales.daily = results[0].daily
        }),
      db.getTipSum(req.user.id)
        .then(function(results){
          console.log(results)
          sales.tips = results[0].tips
        }),
      db.getSaleCount(req.user.id)
        .then(function(results){
          console.log(results)
          sales.count = results[0].count
        })
    ])
    .then(results => {
      console.log(sales)
      return res.status(200).json(sales)
    })
    .catch(function(err) {
      console.log(err)
      return res.status(500).json(err)
    })
  },

  getImages: function(req, res, next){
    const db = req.app.get('db')
    db.getImages()
      .then(function(results){
        console.log(results)
        res.status(200).json(results)
      })
      .catch(function(err){
        res.status(500).json(err)
      })

  }


}
