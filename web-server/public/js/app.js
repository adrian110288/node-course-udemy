console.log('Client side javascript file is loaded!')

fetch('http://localhost:3000/weather?address=!').then((res) => {
    res.json().then((data) => {

        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})