const express = require('express')
const passport = require('passport')
const router = express.Router()

if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`)
      else
        next()
    })
  }
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