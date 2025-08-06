// http://api.weatherapi.com/v1/current.json?key=06e1902cbebd4f04bcf02933251605&q=Innisfil&aqi=no

const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".location-name");
const dateAndTimeField = document.querySelector(".date-time");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);

let target = "Lucknow";

const fetchResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=06e1902cbebd4f04bcf02933251605&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Could not retrieve weather data. Please try again.");
    }
};

function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(" ")[0];
    let splitTime = time.split(" ")[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateAndTimeField.innerText = `${splitDate} - ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();
    if (target) {
        fetchResults(target);
    }
}

fetchResults(target);

function getDayName(number) {
    switch (number) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
    }
}    
                        

    }
}
