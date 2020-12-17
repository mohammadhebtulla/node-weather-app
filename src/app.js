const path = require('path') ;

const express = require('express') ;
const hbs = require('hbs') ;

const geoCode = require('./utils/geoCode') ; 
const forecast = require('./utils/forecast') ; 

const app = express() ;
console.log( path.join(__dirname,'../public')) ;

//paths for static and partials 
const publicDirectoryPath = path.join(__dirname,'../public') ;
const templatesPath = path.join(__dirname,'../templates/views') ;
const partialsPath = path.join(__dirname,'../templates/partials') ;



//config express setting for views and engine
app.set('view engine','hbs') ;
app.set('views',templatesPath) ;

//config for hbs partilas 
hbs.registerPartials(partialsPath) ;

//config for serving static directory 
app.use(express.static(publicDirectoryPath)) ;


app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'Aslam Khan Hebtulla'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'Weather',
    name:'Aslam Khan Hebtulla'
  }) 
})

app.get('/help',(req,res)=>{
  res.render('help',{
   helpmsg:'This is a help page .Plz contact below No for further assistance.',
   title:'Weather',
   name:"Aslam Khan Hebtulla"
  })
})

app.get('/weather',(req,res)=>{
  if (!req.query.address) {
    return res.send({
      error:'Please provide an address.'
    })
  }

  geoCode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
    if (error){
     res.send({error}) ;
      return ;
    }
   
    forecast(Latitude,Longitude, (error, foreCastData) => {
      if (error){
        res.send({error}) ;
        return ;
      }
      res.send({
        forecast: foreCastData,
        Location : Location,
        address : req.query.address
      }) ;
      console.log(Location) ;
      console.log(foreCastData) ;  
    })
  })
 
 })

app.get('/help/*',(req,res)=>{
  res.render('404_pages',{
    ErrorDesc:'Help article not found.',
    name:'Mohammad Hebtulla Khan'
  })
})

app.get('*',(req,res)=>{
  res.render('404_pages',{
    ErrorDesc:'Page not found.',
    name:'Mohammad Hebtulla Khan'
  })
})

app.listen(3000,()=>{
  console.log('Server started and running at port 3000!') ; 
})