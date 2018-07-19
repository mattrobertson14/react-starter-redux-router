var router = require('express').Router();
// var router = require('express-promise-router')();
// var bodyParser = require('body-parser');

// router.use('/', require('./'));

router.get('/', (req, res, next) => {
  let txt = "Welcome to the api for this application. To start using this and making enpoints, go into the api/index.js file and remove this message. Afterwards you can start creating all of the endpoints you will ever need to be able to get your application up and running."
  res.json(txt);
})

// API 404 handler
router.use((req,res,next)=>{
  let error = new Error("Not found");
  error.status = 404;
  return next(error);
})

// API error handler
router.use(function(err, req, res, next){
  let error;
  if(err instanceof Error)
    error = {
      error: err.message,
      status: err.status
    }
  else
    error = err;

  // Potentially add the stack trace to it
  if(process.env.NODE_ENV === 'development'){
    error.trace = err.stack;
  }

  // Set status and send it back
  res.status(error.status || 500);
  if(error.status)
    delete error.status;
  res.json(error);
})

module.exports = router;
