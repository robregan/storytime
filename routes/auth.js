const express = require('express')
const passport = require('passport')
const router = express.Router()
const app = express()
app.get('*',function(req,res,next){
    if(req.headers['x-forwarded-proto']!='https')
      res.redirect("https://" + req.hostname + req.url)
    else
      next() /* Continue to other routes if we're not redirecting */
  })


// auth with google
// GET /auth/google

router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// Google auth callback
// GET /auth/google/callback

router.get(
    '/google/callback',
 passport.authenticate('google', { failureRedirect: '/'}),
 (req,res)=>{
    res.redirect('/dashboard')
})

// Logout user
// /auth/logout
router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
})


module.exports = router