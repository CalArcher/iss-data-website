let mapIframe = document.getElementById('mapIframe')
let users
let frequentData

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
            document.querySelector('#name').innerText = 'Name: ' + users.volcanoName
            mapIframe.src = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_KEY}&center=${users.volcanoLat},${users.volcanoLong}&zoom=10&maptype=satellite`
        }else{
            console.log('no new data')
        }
        console.log(users)
    } catch (e){
        console.log(e)
    }
}

//populates chart
// async function graphData(){
//     frequentData = await fetchData()
// }

const ctx = document.getElementById('passedOverChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: "Most frequent volcanos",
            data: [19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

setInterval(function() {
    printData()
}, 8000)

