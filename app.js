const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { urlencoded } = require('express');

const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongo db 
const mongoDBURi = 'mongodb+srv://reydel:reydel123@practicemongo.1tl6n.mongodb.net/node-practice?retryWrites=true&w=majority'


mongoose.connect(mongoDBURi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sand box routes 
// app.get('/add-blog', (req, res) => {
   
//   const blog = new Blog({
//     title: 'Test Blog 2',
//     snippet: 'This is a test blog snippet',
//     body: 'This is a test blog body'
//   })

//   blog.save()
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// });


// get all blogs 
// app.get('/all-blog', (req, res) => {
//   Blog.find()
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

// get single blog 
// app.get('/single-blog/:id', (req, res) => {
//   Blog.findById(req.params.id)
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

// routes


app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  // console.log('in the next middleware');
  next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// blogs 
app.get('/', (req, res) => {
  res.redirect('/blogs');
});


// about
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });

});
