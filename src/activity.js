function displayActivity() {
    var dataWeather = JSON.parse(localStorage.getItem("dataWeather"));
    if (dataWeather) {
        var { condition, max_temp, min_temp, wind, humidity } = dataWeather;
        var suggestion = getActivitySuggestion(condition, max_temp, min_temp, wind, humidity);

        document.getElementById('suggestion-output').innerHTML = `
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                    <th style="border: 1px solid #ccc; padding: 8px;">Condition</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Max Temp (°C)</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Min Temp (°C)</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Wind (kph)</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Humidity (%)</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">${condition}</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">${max_temp}</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">${min_temp}</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">${wind}</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">${humidity}</td>
                </tr>
            </table>
        `;

        let activityButtons = ''; // Create string for buttons
        for (let i = 0; i < suggestion.length; i++) {
            activityButtons += `<button class="activity-button" onclick="storeActivity('${suggestion[i]}')">${suggestion[i]}</button>`;
        }

        document.getElementById("activity-container").innerHTML = activityButtons; // Set buttons in innerHTML
    } else {
        document.getElementById('suggestion-output').innerHTML = `
        <p>Oops, sorry! There's no data available.</p>`;
    }
}

function getActivitySuggestion(condition, max_temp, min_temp, wind, humidity) {
    let suggestion = [];
    if ((max_temp >= 20 && max_temp <= 30) && (min_temp >= 15 && min_temp <= 25) && (wind >= 0 && wind <= 15) && (humidity >= 30 && humidity <= 60)) {
        suggestion.push("Beach Volleyball", "Hiking", "Cycling", "Park Visit");
    } 
    else if ((max_temp >= 10 && max_temp <= 20) && (min_temp >= 5 && min_temp <= 15) && (wind >= 0 && wind <= 10) && (humidity >= 30 && humidity <= 70)) {
        suggestion.push("Nature Walking", "Bird Watching", "Guided Hiking", "Outdoor Yoga");
    } 
    else if ((max_temp >= 30 && max_temp <= 40) && (wind >= 0 && wind <= 10) && (humidity >= 20 && humidity <= 50)) {
        suggestion.push("Water Sports", "Beach Games","Sunset Walk");
    } 
    else if ((wind >= 20 && wind <= 40) && (humidity >= 20 && humidity <= 60)) {
        suggestion.push("Kite Flying", "Outdoor Photography", "Wind Surfing", "Nature Trails");
    } 
    else if ((max_temp >= 0 && max_temp <= 10) && (wind >= 0 && wind <= 10) && (humidity >= 50 && humidity <= 80)) {
        suggestion.push("Outdoor Ice Skating", "Winter Hiking", "Building Snowmen");
    } 
    else if ((max_temp >= -10 && max_temp <= 5) && (humidity >= 40 && humidity <= 70)) {
        suggestion.push("Nature Walks", "Outdoor Yoga", "Gardening", "Snowball Fights");
    } 
    else if ((humidity >= 60 && humidity <= 90)) {
        suggestion.push("Outdoor Pool Day", "WaterSport", "Fishing", "Nature Walk");
    } 
    else if ((max_temp >= 20 && max_temp <= 30) && (humidity >= 70 && humidity <= 100)) {
        suggestion.push("Water Parks", "Swimming", "Shaded Hiking Trails");
    } 
    else if ((max_temp >= 0 && max_temp <= 15) && (humidity >= 80 && humidity <= 100)) {
        suggestion.push("Nature", "Winter Hiking");
    }
    return suggestion;
}

function storeActivity(activity) {
    // Retrieve the existing selected activities from localStorage, or initialize as an empty array if not found
    let storedActivities = JSON.parse(localStorage.getItem("selectedActivities")) || [];
    
    // Add the new activity to the array
    storedActivities.push(activity);
    
    // Save the updated array back to localStorage
    localStorage.setItem("selectedActivities", JSON.stringify(storedActivities));
    
    // Provide feedback to the user
    alert(`"${activity}" has been saved!`); // Popup message indicating activity has been saved
}

window.onload = displayActivity;
