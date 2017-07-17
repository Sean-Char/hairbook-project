require('dotenv').config()
const express = require('express')
      , cors = require('cors')
      , session = require('express-session')
      , bodyParser = require('body-parser')
      , massive = require('massive')
      , passport = require('passport')
      , Strategy = require('passport-facebook').Strategy
      , aws = require('aws-sdk')

aws.config.update({
   accessKeyId: process.env.ACCESS_KEY_ID,
   secretAccessKey: process.env.SECRET_ACCESS_KEY,
   region: process.env.REGION,
   signatureVersion: process.env.SIGNATURE_VERSION
})


const app = express()
const serverCtrl = require('./server/serverCtrl')


// verify conncection to the server
massive(process.env.DATABASE_URL)
.then(function(db){
  app.set('db', db)
  // db.createStylist(["name", "lastname", "email", "password"]).then(results => {
  //   console.log(results);
  //})
})



app.use(cors())
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/public'));
app.use(session({
   secret: process.env.SECRET,
   saveUninitialized: true,
   resave: false
}))

// for passport
app.use(passport.initialize());
app.use(passport.session())

passport.use(new Strategy( {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
} ,
	function(accessToken, refreshToken, profile, cb) {
    app.get('db')
      .run("select * from stylist_table where fb_id = $1", [profile.id])
      .then(function(user) {
        if (!user.length) {
          app.get('db').run('insert into stylist_table (name, lastname, fb_id) values ($1, $2, $3) returning *',
          [profile.displayName.split(" ")[0], profile.displayName.split(" ")[1], profile.id])
          .then(function(user) {
            return cb(null, user[0])
          })
        }
        else {
          return cb(null, user[0])
        }
      })
  }));

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/#!/summary",
  failureRedirect: "/auth/facebook"
}));
passport.serializeUser(function(user, cb) {
  cb(null, user);
});



passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



// endpoints
app.get('/api/salons', serverCtrl.getSalons)
app.get('/api/sales', serverCtrl.getSalesSum)
app.get('/api/images', serverCtrl.getImages)
app.post('/api/stylists', serverCtrl.createStylist)
app.post('/api/sales', function(req, res, next) {console.log("At submit sale", req.body); next()}, serverCtrl.createSale)
app.post('/api/portfolios', serverCtrl.createPortfolio)



app.get('/api/s3', function(req, res, next) {
   const s3 = new aws.S3()
   const s3Config = {
      Bucket: process.env.BUCKET_NAME,
      Key: req.query.file_name,
      Expires: 60,
      ContentType: req.query.file_type,
      ACL: 'public-read'
   }
   s3.getSignedUrl('putObject', s3Config, function(err, response) {
      if (err) {
         return next(err)
      }
      const data = {
         signed_request: response,
         url: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${req.query.file_name}`
      }
      return res.status(200).json(data)
   })

})



app.listen(process.env.PORT, () => {
  console.log('Hairbook Server Listening on port 3000')
})
