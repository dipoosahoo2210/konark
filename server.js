const express = require('express');
const hbs = require('hbs');
const  fs = require('fs');
var  app = express();



hbs.registerPartials(__dirname +'/views/partials');

app.set('view engine', hbs);



app.use(express.static(__dirname +  '/public'));
app.use((req,res, next)=>{

    var now = new Date().toString();
    var log = `${ now } : ${req.method} :${req.url}`;
    console.log(log);

    fs.appendFile('server.log',log +'/n',(err)=>{
        if(err){
            console.log(" ther e are some  error in the file");
        }
    })
    next();
})


hbs.registerHelper('getcurrentyear', ()=>{
    return new  Date().getFullYear();
})

hbs.registerHelper("screamit",(text)=>{
    return text.toUpperCase();
})


app.get('/',(req , res) => {


    res.render('home.hbs',{
        pagetitle:"home page",
        welcomemessage:"you ar ein the  ooooookk home",


    })

})

app.get('/about',(req,res)=>{
    res.render('about.hbs' ,{
        pagetitle:"about the page " + new Date().getUTCMonth(),

    });
})

app.get('/bad' , (req , res)=>{
    res.send({
        errorpase:"their is aerror"
    })
})

app.listen(3000 ,()=>{
    console.log('server is on port 3000 ');
});
