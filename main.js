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
        if(coordCheck != users.volcanoLat){
            document.querySelector('#currentVal').innerText = users.volcanoLat
            document.querySelector('#long').innerText = 'Longitude: ' + users.volcanoLong
            document.querySelector('#lat').innerText = 'Latitude: ' + users.volcanoLat
            document.querySelector('#name').innerText = 'Name: ' + users.volcanoName
            mapIframe.src = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_KEY}&center=${users.volcanoLat},${users.volcanoLong}&zoom=10&maptype=satellite`
        }
    } catch (e){
        console.log(e)
    }
}

// populates chart
async function graphData(){
    try {
        frequentData = await fetchData()
        let top3 = frequentData.top3
        //ternary operator necessary for when heroku resets data and top3 gets reset to empty
        let top3First = top3[0] === null ? '' : top3[0][0].split(' ')
        let top3Second = top3[1] === null ? '' : top3[1][0].split(' ')
        let top3Third = top3[2] === null ? '' : top3[2][0].split(' ')

        let top3data1 = top3[0] === null ? 0 : top3[0][1]
        let top3data2 = top3[1] === null ? 0 : top3[1][1]
        let top3data3 = top3[2] === null ? 0 : top3[2][1]

        const ctx = document.getElementById('passedOverChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [top3First, top3Second, top3Third],
                datasets: [{
                    label: "",
                    data: [top3data1, top3data2, top3data3],
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
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: 'rgba(255,255,255, 0.95)'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'rgba(255,255,255, 0.95)'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
   
}

graphData()



function flicker1(){
    document.querySelector('#heading1').style.filter = 'none'
    setTimeout(() => {
        document.querySelector('#heading1').style.filter = 'drop-shadow(0 0 0.75rem rgba(51, 236, 193, 0.6))'
    }, 300);
}

function flicker2(){
    document.querySelector('#heading2').style.filter = 'none'
    setTimeout(() => {
        document.querySelector('#heading2').style.filter = 'drop-shadow(0 0 0.75rem rgba(51, 236, 193, 0.6))'
    }, 300);
}

function flicker3(){
    document.querySelector('#heading3').style.filter = 'none'
    setTimeout(() => {
        document.querySelector('#heading3').style.filter = 'drop-shadow(0 0 0.75rem rgba(51, 236, 193, 0.6))'
    }, 320);
}


const randomSecs = () => Math.random() * 9000

const timer1 = setTimeout(function repeated() {
    flicker1()
    flicker2()
    clearTimeout(timer1)
    setTimeout(repeated, randomSecs());
}, randomSecs());

const timer2 = setTimeout(function repeated() {
    flicker3()
    clearTimeout(timer2)
    setTimeout(repeated, randomSecs());
}, randomSecs());


setInterval(function() {
    printData()
}, 8000)

