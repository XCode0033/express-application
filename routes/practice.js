const express = require("express");
const router = express.Router();

//MIDDLEWARE

router.use((req, res, next) => {
  console.log('Middleware Active!')
  next();
})

router.use((req, res, next) => {
  req.requestTime = 'Now';
  next()
})

const checkPassword = (req, res, next) => {
  if(req.query.pass === "123") {
    next();
  }else{
    res.json({error: 'Access Denied'})
  }
}



//==================
router.get('/', (req, res) => {
  console.log('router')
})

router.get('/ping', (req, res) => {
  console.log('pong')
  res.json({pong:'pont'});
})

router.get('/greet/:name', (req, res)=>{
  const name = req.params.name;
  res.json({introduction:`Hello ${name}!`})
})

router.post('/echo', (req,res)=>{
  //when u wanna just send what the user sent
  const echo = req.body;
  res.json(echo)
})

router.post('/add', (req, res)=>{
  const {a, b} = req.body;
  const sum = a + b;
  res.json({result:sum});
})


router.post('/login', (req,res)=>{
  
  const {password} = req.body;
  console.log('attempting password...')
  if(password === 'secret') {
    console.log(`User input: '${password}'. Correct!`)
    res.json({access: 'Granted!'})
  }else {
    console.log(`User input '${password}'. Incorrect.`)
    res.json({access: 'denied!'})
  }
})

router.get('/profile/:username/:role', (req, res) => {
  const {username, role} = req.params;
  res.json({user: username, position: role})
})


router.get('/time', (req, res) => {
  res.json({"time": req.requestTime})
})

router.get('/secret', checkPassword, (req, res) => {
  console.log("secret area accessed!")
  res.json({message: 'Hello! Welcome to the secret area!'})
})


router.get('/user/:id', (req, res) => {
    res.json({userId: req.params.id})
})


router.get('/flights/:from/:to', (req, res) => {
  const {from, to} = req.params;
  res.json({"route": `Flying from ${from} to ${to}`})
})


router.get('/item/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID must be a number" });
    }
    
    res.json({ item: `Item ${id}` });
});

router.get('/store/:category', (req, res) => {
  const { category } = req.params;
  const { sort } = req.query;

  res.json({
    category: category,
    sortBy: sort
  })
})

router.get('/bad-request', (req, res,next )=> {
  const error = new Error('Missing Data')
  error.status = 400;
  next(error); // Passes control ot the global error handler in app.js
})



































//confirm that global handler defaults to 500 when no status is provided
router.get('/crash', (req, res, next) => {
  const error = new Error('Database failed')
  next(new Error("database Failed"))
})

router.use((err, req, res, next) => {
  console.log("Router-level error caught!")
  res.status(err.status || 500).json({
    router_error: err.message
  })
})
module.exports = router;
