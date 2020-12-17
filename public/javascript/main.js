const addressForm =document.querySelector('form') ;
const messageOne =document.querySelector('#m-1') ;
const messageTwo =document.querySelector('#m-2') ; 

addressForm.addEventListener('submit',(e)=>{
  e.preventDefault() ;
  const location = document.querySelector('input').value ;
  messageOne.textContent = 'Loading ....'
  messageTwo.textContent = '' ;
  fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response)=>{
  response.json().then((data)=>{
    messageOne.textContent = '' ;
    if (!data.error) {
      messageOne.textContent =` ${data.Location}` ;
      messageTwo.textContent = `${data.forecast}`
      
      console.log(data.forecast,data.Location) ;
    } else {
      
      messageTwo.textContent = data.error ;
      console.log(data.error) ;
    }

  })
})


})