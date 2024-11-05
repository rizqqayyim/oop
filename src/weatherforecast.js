function searchWeather() {
    var city = document.getElementById("location").value;
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            var info = data;
            var forecast = info.forecast.forecastday[0].day;

            // Hide the input container
            document.querySelector('.container').style.display = 'none';

            // Show the video
            document.getElementById('weatherVideo').style.display = 'block';

            
            // Display output
            document.getElementById('output').innerHTML = `
                <hr>
                <br>
                <div class="header-forecast">
                    <p style="font-size: 18px; text-align:center;">Location: ${info.location.name}, ${info.location.country}</p>
                    <p style="font-size: 18px; text-align:center;">Time: ${info.location.localtime}</p>
                    <p style="font-size: 18px; text-align:center;">Region: ${info.location.region}</p>
                </div>
                <br>
                <hr>
                <table style="width: 100%; border: none; margin-top: 20px;">
                    <thead>
                        <tr>
                            <th style=" padding: 15px; font-size: 20px; background-color: #f0f0f0; width: 50%;">Current Situation</th>
                            <th style=" padding: 15px; font-size: 20px; background-color: #f0f0f0; width: 50%;">Forecast Situation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 20px; vertical-align: top; font-size: 16px; text-align: center;">
                                <p style="margin-bottom: 10px;">Temperature: ${info.current.temp_c} °C</p>
                                <p style="margin-bottom: 10px;"><img src="https:${info.current.condition.icon}" alt="Weather Icon" style="width: 50px; height: auto;"></p>
                                <p style="margin-bottom: 10px;">Wind Speed: ${info.current.wind_mph} mph</p>
                                <p style="margin-bottom: 10px;">Humidity: ${info.current.humidity}%</p>
                                <p style="margin-bottom: 10px;">Cloud: ${info.current.cloud}</p>
                                <p style="margin-bottom: 10px;">Weather Condition: ${info.current.condition.text}</p>
                            </td>
                            <td style="padding: 20px; vertical-align: top; font-size: 16px; text-align: center;">
                                <p style="margin-bottom: 10px;">Forecast Temperature (Max): ${forecast.maxtemp_c} °C</p>
                                <p style="margin-bottom: 10px;">Forecast Temperature (Min): ${forecast.mintemp_c} °C</p>
                                <p style="margin-bottom: 10px;"><img src="https:${forecast.condition.icon}" alt="Forecast Icon" style="width: 50px; height: auto;"></p>
                                <p style="margin-bottom: 10px;">Wind Speed (Max): ${forecast.maxwind_mph} mph</p>
                                <p style="margin-bottom: 10px;">Humidity (Avg): ${forecast.avghumidity}%</p>
                                <p style="margin-bottom: 10px;">Weather Condition: ${forecast.condition.text}</p>
                                <p style="margin-bottom: 10px;">Chances to Rain: ${forecast.daily_chance_of_rain}</p>
                                <p style="margin-bottom: 10px;">Chances to Snow: ${forecast.daily_chance_of_snow}</p>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;

            // Save data for activity
            localStorage.setItem("dataWeather", JSON.stringify({
                condition: forecast.condition.text,
                max_temp: forecast.maxtemp_c,
                min_temp: forecast.mintemp_c,
                wind: forecast.maxwind_mph,
                humidity: forecast.avghumidity
            }));

            document.getElementById("suggestionButton").style.display = "block";

            // Set video source based on current temperature
            setTemperatureVideo(info.current.temp_c);
        })
        .catch((error) => {
            console.log("Sorry, your place is too deep :", error);
            document.getElementById('output').innerHTML = `
            <h1>Sorry, your place is too deep :(</h1>`;
        });
}

function setTemperatureVideo(temperature) {
    const videoElement = document.getElementById('weatherVideo');
    const videoSource = document.getElementById('videoSource');

    // Set the video source based on the current temperature
    if (temperature > 30) {
        videoSource.src = "hot.mp4"; // Replace with your hot weather video
    } else if (temperature >= 20 && temperature <= 30) {
        videoSource.src = "warm.mp4"; // Replace with your warm weather video
    } else if (temperature < 20) {
        videoSource.src = "cold.mp4"; // Replace with your cold weather video
    } else {
        videoElement.style.display = "none"; // Hide the video if no match
    }

    videoElement.load(); // Load the new video source
}



function goToSuggestion(){
    window.location.href="activity.html";
}