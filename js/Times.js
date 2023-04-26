function getTimes(city, el) {
  let url = `http://api.aladhan.com/v1/timingsByCity/:date?city=${city}&country=Sudan`;
  axios
    .get(url)
    .then((response) => {
      let AllTimeAndName = response.data.data.timings;
      let times = Object.values(AllTimeAndName);
      let prayers = Object.keys(AllTimeAndName);
      let timesDiv = document.getElementById("times");
      timesDiv.innerHTML = "";
      let i = 0;
      for (prayr of prayers) {
        let content = `
        <div class="time">
          <span class = "icon"><i class="fa-regular fa-clock"></i></span>
          <span class = "prayer"> ${prayr}</span>
          <span class = "pray-time">${times[i]}</span>
        </div>
        `;
        timesDiv.innerHTML += content;
        i++;
      }
      let dayH = document.createElement("h5");
      dayH.innerHTML = `هجري : ${response.data.data.date.hijri.date}`;
      timesDiv.appendChild(dayH);
      let day = document.createElement("h5");
      day.innerHTML = `ميلادي : ${response.data.data.date.gregorian.date}`;
      timesDiv.appendChild(day);
      let selectedElments = document.getElementsByClassName("selected");
      for (element of selectedElments) {
        element.classList.remove("selected");
      }
      el.classList.add("selected");
    })
    .catch((error) => {
      console.log(error);
    });
}
getTimes("Khartoum");
