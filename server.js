const express = require('express')
      , cors = require('cors')
      , session = require('express-session')
      , bodyParser = require('body-parser')
      , massive = require('massive')
      , passport = require('passport')
      , Strategy = require('passport-facebook').Strategy
      , app = express()


const config = require('./config')
const serverCtrl = require('./server/serverCtrl')


// verify conncection to the server
massive(config.connectionString)
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
   secret: config.secret,
   saveUninitialized: true,
   resave: false
}))

// for passport
app.use(passport.initialize());
app.use(passport.session())

passport.use(new Strategy( config.Strategy ,
	function(accessToken, refreshToken, profile, cb) {
    app.get('db')
      .run("select * from stylist_table where fb_id = $1", [profile.id])
      .then(function(user) {
        if (!user.length) {
          app.get('db').run('insert into stylist_table (name, lastname, fb_id) values ($1, $2, $3)',
          [profile.displayName.split(" ")[0], profile.displayName.split(" ")[1], profile.id])
        }
        else {
          console.log(user);
        }
      })

    return cb(null, profile);
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



// updating the server with data
app.post('/api/stylists', serverCtrl.createStylist)
// app.get('/api/logout'), serverCtrl.     )



app.listen(3000, () => {
  console.log('Hairbook Server Listening on port 3000')
})
