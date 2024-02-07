

// America/New_York -> New York, America
function getReadableTimezoneName(timezone) {
  let split = timezone.split("/");
  let country = split[0];
  let city = split[1];

  return city + ", " + country;
}

function getReadableTime(timezone) {
  let date = new Date();
  return date.toLocaleTimeString("en-US", { timeZone: `${timezone}` });
}

let clockIdCounter = 0;
// creates a div with the city name and the time in #clocks
function addClockDiv(timeZone) {
  // clone the template
  const template = document.getElementById("clock-template").cloneNode(true);
  template.style.display = "flex";
  // Remove the id 'clock-template' to avoid duplicate IDs
  template.removeAttribute('id');

  // Assign a unique ID to the clock div for deletion reference
  const clockDivId = "clock-" + clockIdCounter;
  template.id = clockDivId;

  // Set the text content for timezone and time
  template.querySelector(".timezone").textContent = getReadableTimezoneName(timeZone);
  template.querySelector(".time").textContent = getReadableTime(timeZone);

  // Check if the delete button already exists, if not, create it
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";
  deleteButton.onclick = function() { deleteCityTime(clockDivId); };
  template.appendChild(deleteButton);

  document.getElementById("clocks").appendChild(template);

  // Increment the counter after the clock is added
  clockIdCounter++;
}

function deleteCityTime(clockId) {
  const clockElement = document.getElementById(clockId);
  clockElement.remove();
}

// called when the user clicks the button "Add City"
function addCityTime() {
  const timeZone = document.getElementById("city-selector").value;
  addClockDiv(timeZone);
}

$(document).ready(function () {
  // initialize select2
  $(".js-example-basic-single").select2();

  // add every timezone possible
  let timezones = Intl.supportedValuesOf("timeZone");

  for (let i = 0; i < timezones.length; i++) {
    let name = getReadableTimezoneName(timezones[i]);

    $("#city-selector").append(
      $("<option></option>").attr("value", timezones[i]).text(name)
    );
  }

  // update clocks
  function updateClocks() {
    let clocks = document.getElementsByClassName("city-clock");

    for (let i = 0; i < clocks.length; i++) {
      if (clocks[i].style.display == "none") continue;

      let timeZone = clocks[i].getAttribute("value");
      let timeDiv = clocks[i].querySelector(".time");

      timeDiv.innerHTML = getReadableTime(timeZone);
    }
  }
  setInterval(updateClocks, 1000);
});

// add an exmaple clock
addClockDiv("America/New_York");

