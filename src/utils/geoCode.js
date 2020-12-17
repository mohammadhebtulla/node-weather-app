const request = require('request') ;

const geoCode = (address,callback)=>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXNsYW1yb25uaWUxNDciLCJhIjoiY2tpZnh0ZGJoMWh5dzJxcGVpaGtuM3lwbCJ9.wPapKVn5V5OlESyLXtI0ng&limit=1' ;

  request({url,json:true},(error,{body}={})=>{
    if(error) {
          callback(`Unable to connect to Geocoding API service. `,undefined) ;
        } else if (body.message) {
           callback(`Enter a location as part of query param.`,undefined) ;
        }else if (body.features.length === 0) {
          callback(`Entered location isn't correct.please enter a genuine location .`,undefined) ;
        } else{
          callback(undefined,{Latitude : body.features[0].center[1],
        Longitude: body.features[0].center[0] ,
      Location:body.features[0].place_name} )
        }
  })
}

module.exports = geoCode