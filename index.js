let city;
async function getWeather() {
  try {
    city = document.querySelector("#city").value;
    let respose = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da1de6ea55bd1a35ca6697fad73464ab&units=metric&lang=ru`
    );
    let sevenUrl = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=da1de6ea55bd1a35ca6697fad73464ab&units=metric&lang=ru`
    );
    let array = await sevenUrl.json();
    let data = await respose.json();
    // console.log("data:", data);

    append(data, array.list);
  } catch (error) {
    alert("Enter a valid City Name");
  }
}
function append(data, arr) {
  document.querySelector("#data").innerText = "";
  document.querySelector("#map").innerHTML = "";
  city = document.querySelector("#city").value;
  // console.log("data:", data);
  let div = document.createElement("div");

  let today = document.createElement("h1");
  today.innerText = "Погода сегодня";

  let temp = document.createElement("p");
  temp.innerHTML = "Температура:" + " " + data.main.temp + "° C";

  let minTemp = document.createElement("p");
  minTemp.innerText = "Минимальная темп.:" + " " + data.main.temp_min + "° C";

  let maxTemp = document.createElement("p");
  maxTemp.innerText = "Максимальная темп:" + " " + data.main.temp_max + "° C";

  let cloud = document.createElement("p");
  cloud.innerText = "Облачность:" + " " + data.clouds.all;

  let wind = document.createElement("p");
  wind.innerText = "Скорость ветра:" + " " + data.wind.speed;

  let sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString("ru-RU", {
  hour: "2-digit",
  minute: "2-digit"
  });

  let sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString("ru-RU", {
  hour: "2-digit",
  minute: "2-digit"
  });

  let sunrise = document.createElement("p");
  sunrise.innerText = "Рассвет:" + " " + sunriseTime;

  let sunset = document.createElement("p");
  sunset.innerText = "Закат:" + " " + sunsetTime;

  div.append(today, temp, minTemp, maxTemp, cloud, wind, sunrise, sunset);
  document.querySelector("#data").append(div);

  let x = document.createElement("iframe");
  x.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCSX44DcZpgB-cha4ZV3n04WN_NRBdPHWY&q=${city}`;

  document.querySelector("#map").append(x);

  document.querySelector("#seven").innerHTML = "";

arr.forEach(elem => {
  if (elem.dt_txt.includes("12:00:00")) {
    let div = document.createElement("div");

    let date = new Date(elem.dt_txt);
    let days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];

    let dayHead = document.createElement("h2");
    dayHead.innerText = days[date.getDay()];

    let img = document.createElement("img");
    img.src = `https://openweathermap.org/img/wn/${elem.weather[0].icon}.png`;

    let temp = document.createElement("h2");
    temp.innerText = elem.main.temp + "° C";

    let desc = document.createElement("p");
    desc.innerText = elem.weather[0].description;

    div.append(dayHead, img, temp, desc);
    document.querySelector("#seven").append(div);
  }
});

}
