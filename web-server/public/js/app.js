console.log('Client side javascript file is loaded!')

const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('p#message-one')
const message2 = document.querySelector('p#message-two')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {

            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})