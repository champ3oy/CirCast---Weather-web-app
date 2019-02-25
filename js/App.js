/*Welcome to my first javascript project with is a weather app for showing wheather conditions
developer is Akoto Selorm Jonathan (Cirlorm)
javascript developer*/
var isOnline = window.navigator.onLine;
if (isOnline) {
    console.log(isOnline);
    window.addEventListener("load", () => {
        let long;
        let lat;
        let temperatureDescription = document.querySelector(
            ".temperature-description"
        );
        //get date from user pc
        var nowDate = new Date();
        let temperatureDegree = document.querySelector(".temperature-degree");
        let locationTimezone = document.querySelector(".location-timezone");
        let temperatureSection = document.querySelector(".temperature");
        let humiDity = document.querySelector(".humidity");
        let presSure = document.querySelector(".pressure");
        let winDSpeed = document.querySelector(".wind-speed");
        let CuDate = document.querySelector(".date");
        let CuHour = document.querySelector(".hour");
        let CuMunite = document.querySelector(".munite");
        const temperatureSpan = document.querySelector(".temperature span");

        if (navigator.geolocation) {
            navigator.permissions.query({name: "geolocation"})
                .then(action => {
                    console.log(action);
                    const CuState = action.state;
                    if (CuState === "denied") {
                        let mainBodyLoc = document.querySelector(".body");
                        let errorMsgLoc = "Please enable your location...";
                        mainBodyLoc.textContent = errorMsgLoc;

                        //adding css to display error-img
                        var LocCss = document.createElement("style");
                        LocCss.type = "text/css";
                        LocCss.innerHTML =
                            ".error-loc {display: block; align-items: center; display:flex; width: 20vh; margin-bottom: 20p}";
                        document.body.appendChild(LocCss);
                  };
                });
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position);
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = "http://cors-anywhere.herokuapp.com/";
                const api = `${proxy}https://api.darksky.net/forecast/3522ec4cfa5e5e8cf324813d63f2ac4c/${lat},${long}`;

                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const {
                            temperature,
                            summary,
                            icon,
                            humidity,
                            pressure,
                            windSpeed,
                            time
                        } = data.currently;
                        //get date from user pc
                        var sysDate = new Date();
                        //set DOM from API
                        temperatureDegree.textContent = temperature;
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        let humUnit = "(g/m3)";
                        let preunit = "(Pa)";
                        let wsUnit = "(m/s)";
                        humiDity.textContent = humidity + humUnit;
                        presSure.textContent = pressure + preunit;
                        winDSpeed.textContent = windSpeed + wsUnit;
                        CuDate.textContent = nowDate.toDateString();
                        CuHour.textContent = nowDate.getHours();
                        CuMunite.textContent = nowDate.getMinutes();

                        // formula for C
                        let celcius = (temperature - 32) * (5 / 9);

                        // set icons
                        setIcons(icon, document.querySelector(".icon"));
                        setIcons(icon, document.querySelector(".icon2"));

                        //change F to C
                        temperatureSection.addEventListener("click", () => {
                            if (temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = Math.floor(
                                    celcius
                                );
                            } else {
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = temperature;
                            }
                        });
                    });
            });
        } else {
            let mainBodyLoc = document.querySelector(".body");
            let errorMsgLoc = "Please enable your locatio...";
            mainBody.textContent = errorMsgLoc;

            //adding css to display error-img
            var offlineCss = document.createElement("style");
            LocCss.type = "text/css";
            LocCss.innerHTML =
                ".error-loc {display: block; align-items: center}";
            document.body.appendChild(LocCss);
        }

        function setIcons(icon, iconID) {
            const skycons = new Skycons({
                color: "white"
            });
            const currenticon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currenticon]);
        }
        console.log(setIcons);
    });
} else {
    let mainBody = document.querySelector(".body");
    let errorMsg = "Sorry, you are offline...";
    mainBody.textContent = errorMsg;

    //adding css to display error-img
    var offlineCss = document.createElement("style");
    offlineCss.type = "text/css";
    offlineCss.innerHTML = ".error-icon {display: block; align-items: center, display:flex; width: 20vh; margin-bottom: 20px}";
    document.body.appendChild(offlineCss);
}
// Cirlorm
