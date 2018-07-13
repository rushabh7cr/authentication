# Authentication
Session based user authentication using passport-js.

# Passport js
Passport is a module that provides and automates user authentication for Express. It is mostly used to support authentication sessions over HTTP.

Configuration
In app.js add the following require statement:

const passport = require('passport');<br>
To configure passport correctly, you need to provide three things:

1.An Authentication Strategy<br>
2.Application Middleware<br>
3.Sessions<br>

# passport-local-mongoose
passport-local-mongoose takes care of salting and hashing user passwords, serializing and deserializing your user model (for session storage), and authenticating the username and password credentials with their stored counterparts in the mongo database.

# passport serialize deserialize

```
passport.serializeUser(function(user, done) {
    done(null, user.id);
                 |
});              | 
                 |
                 |____________________> saved to session req.session.passport.user = {id:'..'}
                                   |
                                  \|/           
passport.deserializeUser(function(id, done) {
                   ________________|
                   |
                  \|/ 
    User.findById(id, function(err, user) {
        done(err, user);
                   |______________>user object attaches to the request as req.user

 });
  });
```
# Logging out
Passport includes a logout() function on request that can be called from a route handler. It removes the request.user property and clears the login session.

```
app.get('/logout', (request, response) => {
  request.logout();
  response.redirect('/');
});
```
