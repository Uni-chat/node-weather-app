
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messgaeOne = document.querySelector('#message-one')
const messgaeTwo = document.querySelector('#message-two')



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const locationInput = search.value
    
    //console.log(location);
    messgaeOne.textContent = 'Loading...'
    messgaeTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + locationInput).then((response) => {
        response.json().then((data) => {

            if (data.error) {

                messgaeOne.textContent = data.error

            } else {

                messgaeOne.textContent = data.forecast
                messgaeTwo.textContent = data.location
            }  
        })
    })
    
})