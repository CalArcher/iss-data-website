let mapIframe = document.getElementById('mapIframe')
let users

window.addEventListener('load', printData)

async function fetchData(){
   const res = await fetch('https://iss-tweet-bot.herokuapp.com/data.json', {
       headers : {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
       }
   })
   const data = await res.json()
   return data
}

//gets api data from fetchData(). If the data has changed, it adds it to the DOM
async function printData(){
    try {
        users = await fetchData()
        let coordCheck = document.querySelector('#currentVal').innerText
        
        console.log(coordCheck, 'coordcheck')
        if(coordCheck != users.volcanoLat){
            document.querySelector('#currentVal').innerText = users.volcanoLat
            document.querySelector('#long').innerText = 'Longitude: ' + users.volcanoLong
            document.querySelector('#lat').innerText = 'Latitude: ' + users.volcanoLat
            document.querySelector('#name').innerText = 'Volcano Name: ' + users.volcanoName
            mapIframe.src = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_KEY}&center=${users.volcanoLat},${users.volcanoLong}&zoom=10&maptype=satellite`
        }else{
            console.log('no new data')
        }
        console.log(users)
    } catch (e){
        console.log(e)
    }
}

setInterval(function() {
    printData()
}, 8000)

