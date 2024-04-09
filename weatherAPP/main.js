const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDeatails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

//監聽具有 id 為 "search" 的 HTML 元素的點擊事件
search.addEventListener("click", ()=>{
    const APIKey="4dd4cae5f67f9a59abe6c3433257a4d7";
    //獲取user所輸入的文字
    const city = document.querySelector(".search-box input").value;
    if(city == "") return;

    //把變數改成你自己設定的!!
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    //將返回的 response 物件轉換為 JSON 格式
    ).then((response) =>response.json())
    //處理解析後的 JSON 資料
     .then((json) =>{

        if(json.cod == "404"){  //.cod到openweather查找
            // classList像是一個工具箱，裡面有add. remove等操作
            cityHide.textContent = city;
            container.style.height = "400px";
            weatherBox.classList.remove("active");
            weatherDeatails.classList.remove("active");
            error404.classList.add("active");
            return;
        }else{
            container.style.height = "555px";
            weatherBox.classList.remove("active");
            weatherDeatails.classList.remove("active");
            error404.classList.remove("active");
        }


        //這些是API會回傳的，然後我去取得他們並存在我設置的const內
        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .decription");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");


        if(cityHide.textContent == city){
            return;
        }else{
            cityHide.textContent == city
            container.style.height = "555px";
            container.classList.add("active");
            weatherBox.classList.add("active");
            weatherDeatails.classList.add("active");
            error404.classList.remove("active");

            setTimeout(()=>{
                container.classList.remove("active");
            }, 2500);


        // json格式中weather[0]代表城市的天氣狀態
        switch (json.weather[0].main) {
            case "Clear":
              image.src = "/Assets/images/clear.png";
              break;
            case "Rain":
              image.src = "/Assets/images/rain.png";
              break;
            case "Snow":
              image.src = "/Assets/images/snow.png";
              break;
            case "Clouds":
              image.src = "/Assets/images/cloud.png";
              break;
            case "Mist":
              image.src = "/Assets/images/mist.png";
              break;
            case "Haze":
              image.src = "/Assets/images/mist.png";
              break;
            default:
              image.src = "/Assets/images/cloud.png";
        }
        

        //將API傳回的資料顯示在網頁上
        //parseInt()將字符串轉換為整數
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${(parseInt(json.wind.speed) / 0.28).toFixed(2)}Km/h`;

        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");
        //copy( https://www.runoob.com/try/try.php?filename=tryjsref_node_clonenode )
        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        // 通過 id 在 DOM 中找到這個複製的元素
        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");

        elCloneInfoHumidity.id = "clone-info-humidity";
        elCloneInfoHumidity.classList.add("active-clone");

        elCloneInfoWind.id = "clone-info-wind";
        elCloneInfoWind.classList.add("active-clone");


        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
            infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
            infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll(".info-weather.active-clone");
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll(".info-humidity.active-clone");
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll(".info-wind.active-clone");
        const cloneInfoWindFirst = cloneInfoWind[0];


        //儲存複製的天氣資訊元素的總數量。若>0，表示存在複製的元素。
        //避免介面重複顯示： 如果不刪除之前的複製元素，會導致介面上出現多個相同的天氣資訊
        //導致介面混亂和不必要的重複。所以，每次新增新的複製元素時，都需要先刪除之前的複製元素，以確保介面的一致性
        if(totalCloneInfoWeather > 0){
          cloneInfoWeatherFirst.classList.remove("active-clone");
          cloneInfoHumidityFirst.classList.remove("active-clone");
          cloneInfoWindFirst.classList.remove("active-clone");

          setTimeout(()=>{
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWeatherFirst.remove();
          }, 2200);
        }
      }
    });
});

/*
document.querySelector：此方法用於選擇符合 CSS 選擇器的第一個元素。
                        它會返回匹配的第一個元素，如果沒有找到匹配的元素則返回 null。

document.querySelectorAll：此方法用於選擇符合 CSS 選擇器的所有元素。
                        它會返回一個 NodeList 對象，其中包含所有匹配的元素，如果沒有找到匹配的元素則返回一個空的 NodeList。
*/



/*
{
  "coord": {
    "lon": 10.99,
    "lat": 44.34
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 298.48,
    "feels_like": 298.74,
    "temp_min": 297.56,
    "temp_max": 300.05,
    "pressure": 1015,
    "humidity": 64,
    "sea_level": 1015,
    "grnd_level": 933
  },
  "visibility": 10000,
  "wind": {
    "speed": 0.62,
    "deg": 349,
    "gust": 1.18
  },
  "rain": {
    "1h": 3.16
  },
  "clouds": {
    "all": 100
  },
  "dt": 1661870592,
  "sys": {
    "type": 2,
    "id": 2075663,
    "country": "IT",
    "sunrise": 1661834187,
    "sunset": 1661882248
  },
  "timezone": 7200,
  "id": 3163858,
  "name": "Zocca",
  "cod": 200
}                        
*/

/*
介紹-

首先，它選取了各種 HTML 元素，如 .container、.search-box button、.weather-box、.weather-details、.not-found 等，並將它們存儲在對應的變數中，以便稍後操作。
當使用者點擊搜尋按鈕時，會觸發 click 事件。在事件處理函式中，它首先獲取了使用者輸入的城市名稱，並檢查是否為空。如果是空的，則立即返回，不做任何操作。

接著，它使用 fetch 函式向 OpenWeatherMap API 發送請求，獲取該城市的天氣資訊。一旦得到回應，它會將回應解析為 JSON 格式。
接下來，它檢查回傳的 JSON 中是否存在 cod 屬性，並檢查其值是否為 "404"。如果是，則表示找不到該城市的天氣資訊，它會將相應的 HTML 元素的顯示狀態進行調整，以顯示 "城市未找到" 的訊息。
如果找到了天氣資訊，則會將相應的 HTML 元素的顯示狀態進行調整，以顯示該城市的天氣資訊。同時，它會將天氣資訊的圖片、溫度、描述、濕度和風速等內容填充到對應的 HTML 元素中。

接著，它使用 cloneNode 方法將天氣資訊的各個元素進行複製。複製的元素將被添加上一個額外的 active-clone 類別，以便稍後的操作。
使用 setTimeout 函式設置一個定時器，在一定的時間後，將複製的元素插入到 HTML 中。
接著，它會檢查複製的天氣資訊是否存在。如果存在，則會移除第一個複製元素的 active-clone 類別，然後再次使用 setTimeout 函式設置定時器，在一定的時間後，將這些複製元素從 HTML 中移除。

這段程式碼的主要作用是根據使用者輸入的城市名稱，從 OpenWeatherMap API 中獲取天氣資訊，並將其顯示在網頁上。同時，它還會複製和移除一些 HTML 元素，以實現顯示效果。
*/