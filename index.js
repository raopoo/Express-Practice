const express = require('express')
const bcrypt = require('bcryptjs');
const app = express()

const PORT = process.env.PORT || 3000
const data = require('./data')
//const {users,posts} = require('./data')-can be done this way too

//Set view engine as EJS
app.set('view engine', 'ejs')
//Set our static folder
app.use(express.static('public'))

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//Home page
app.get('/',(req,res) =>{
    res.render('index',{
        name:"Pooja"
    })
})
//Display all users
app.get('/users',(req,res) =>{
    res.json(data.users)
})
//Display all posts
app.get('/posts',(req,res) =>{
    res.json(data.posts)
})
//Add a new user
app.post('/users', (req,res) => {
    const {firstname, lastname, email, password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = {
        firstname,
        lastname,
        email,
        password:hash
    }
    data.users.push(newUser)
    res.json(data.users)
})

//Display a single post
app.get('/posts/:id',(req,res) =>{
    const found = data.posts.some(post => 
    post.id === Number(req.params.id))
    if(found){
    // res.send(data.posts[req.params.id])use this for project
    //  Other way of doing the same
     const post = data.posts.filter(post => post.id === Number(req.params.id))
     res.send(post[0])
    }else{
        res.send('Post not found')
    }
    //res.send(req.params.id)
})

app.listen(PORT, () => {
    console.log('App is listening at http://localhost:3000')
})