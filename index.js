const API_KEY = "7be2c2868446ae4bbd62c80755021199"

function render() {
    const searchingCity = document.querySelector('.search__city').value
    if(searchingCity) {getWeatherData(searchingCity, API_KEY, dataInsert)}
}


function getWeatherData(city, apiKey, callback) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru`)
    .then(res => {
        if(!res.ok){
            alert('Проблема с получение данных. Введен не существующий город или отсутствует подключение.')
            throw new Error('Проблема с получение данных. Введен не существующий город или отсутствует подключение.')
        }
        else return res.json()
    })
    .then(data => callback(data))
    
}


function dataInsert(jsonData) {
    const { name } = jsonData
    const { description, icon } = jsonData.weather[0]
    const { humidity, temp } = jsonData.main
    const { speed } = jsonData.wind

    document.querySelector('.weather__title').innerHTML = `Погода в городе ${name}`
    document.querySelector('.weather__icon').src = `https://openweathermap.org/img/wn/${icon}.png`
    document.querySelector('.weather__description').innerHTML = description.charAt(0).toUpperCase() + description.slice(1)
    document.querySelector('.weather__humidity').innerHTML = `Влажность ${humidity}%`
    document.querySelector('.weather__temperature').innerHTML = `Температура воздуха ${(temp - 273.15).toFixed(2)} °C`
    document.querySelector('.weather__wind').innerHTML = `Скорость ветра ${speed} км/ч или ${(speed/3.6).toFixed(2)} м/с`
}

function changeTheme() {
    document.querySelector('.wrapper').classList.toggle('night__theme')
    document.querySelector('.search__city').classList.toggle('search__city-night')
    document.querySelector('.search__button').classList.toggle('search__button-night')
}