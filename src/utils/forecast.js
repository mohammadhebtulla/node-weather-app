const request = require('request') ;

const forecast = (Latitude,Longitude,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=03aff854936c685952b009b31a8bd38b&query='+encodeURIComponent(Latitude)+','+encodeURIComponent(Longitude)+'&units=m' ;

  request({url,json:true},(error,{body}={})=>{
    if(error) {
          callback(`Unable to connect to weather service API!`,undefined) ;
        } else if (body.error) {
           callback(`${body.error.info}`,undefined) ;
        }else{
          callback(undefined,` ${body.current.weather_descriptions[0]} . It is currently ${body.current.temperature} degrees out . It feels like ${body.current.feelslike} degrees out .` )
        }
  })
}

module.exports = forecast