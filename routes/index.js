const express= require("express")
const router=express.Router()

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login',{ errorMessage: '' })
})

router.get('/signup',(req,res)=>{
    res.render('signup',{ errorMessage: '' })
})

// Home page after login
router.get('/home', (req, res) => {
    res.render('home');
});

module.exports=router;