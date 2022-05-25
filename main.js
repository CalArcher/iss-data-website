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

// populates chart
async function graphData(){
    try {
        frequentData = await fetchData()
        let top3 = frequentData.top3
        const ctx = document.getElementById('passedOverChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [top3[0][0], top3[1][0], top3[2][0]],
                datasets: [{
                    label: "",
                    data: [top3[0][1], top3[1][1], top3[2][1]],
                    backgroundColor: [
                        'rgba(230, 131, 255, .2)',
                        'rgba(148, 218, 255, .2)',
                        'rgba(153, 254, 255, .2)'
                    ],
                    borderColor: [
                        'rgb(185, 131, 255)',
                        'rgb(148, 218, 255)',
                        'rgb(153, 254, 255)'
                    ],
                    borderWidth: 2.75
                }]
            },
            options: {

                animation: {
                    maintainAspectRatio: false,
                    animations: {
                        y: {
                          easing: 'easeInOutElastic',
                          }
                        }
                    },
                plugins: {
                    legend: {
                    display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
   
}

graphData()



setInterval(function() {
    printData()
    graphData()
}, 8000)

