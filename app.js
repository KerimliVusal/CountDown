const timesArr = ["hours", "minutes", "seconds"];

// input selectors
const hoursFirst = document.getElementById("hours-first");
const hoursSecond = document.getElementById("hours-second");
const minutesFirst = document.getElementById("minutes-first");
const minutesSecond = document.getElementById("minutes-second");
const secondsFirst = document.getElementById("seconds-first");
const secondsSecond = document.getElementById("seconds-second");

// default values
let def_hours = 23;
let def_minutes = 59;
let def_seconds = 59;

hoursFirst.textContent = def_hours.toString().padStart(2, '0')[0];
hoursSecond.textContent = def_hours.toString().padStart(2, '0')[1];
minutesFirst.textContent = def_minutes.toString().padStart(2, '0')[0];
minutesSecond.textContent = def_minutes.toString().padStart(2, '0')[1];
secondsFirst.textContent = def_seconds.toString().padStart(2, '0')[0];
secondsSecond.textContent = def_seconds.toString().padStart(2, '0')[1];

// btn selectors
const btnStart = document.querySelector(".btn_start");
const btnPause = document.querySelector(".btn_pause_resume");
const btnStop = document.querySelector(".btn_stop");
const btnReset = document.querySelector(".btn_reset");

let interval;
let isPause = false;
let message = document.querySelector(".message");
let initialTimeInSeconds;

// get current Total Time by seconds
function getCurrentTotalTime() {
  let hours_value = parseInt(hoursFirst.textContent + hoursSecond.textContent);
  let minutes_value = parseInt(minutesFirst.textContent + minutesSecond.textContent);
  let seconds_value = parseInt(secondsFirst.textContent + secondsSecond.textContent);

  let totalTimeSeconds =
    hours_value * 60 * 60 + minutes_value * 60 + seconds_value;

  initialTimeInSeconds = totalTimeSeconds;
  return totalTimeSeconds;
}

// start timer
btnStart.addEventListener("click", (event) => {
  totalTimeSeconds = getCurrentTotalTime();
  if (totalTimeSeconds === 0) {
    message.innerHTML = "<div class='red-text'>Time is not valid</div>";
    setTimeout(function () {
      message.innerHTML = "";
    }, 2000);

    return false;
  }

  btnStart.style.display = "none";
  btnPause.style.display = "block";
  btnPause.disabled = false;
  btnStop.style.display = "block";
  btnReset.style.display = "block";
  btnPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  isPause = false;
  startTimer(totalTimeSeconds);
});

// set countdown timer
function startTimer(totalTimeSeconds) {
  interval = setInterval(() => {
    if (totalTimeSeconds > 0 && !isPause) {
      totalTimeSeconds--;
      updateTimeInputs(totalTimeSeconds);
    } else if (totalTimeSeconds == 0) {
      clearInterval(interval);
      document.querySelectorAll(".btn").forEach((btn) => {
        btn.style.display = "none";
      });

      resetProgressBar();
      document.querySelectorAll(".time_input").forEach((input) => {
        input.disabled = false;
      });
    }
  }, 1000);
}

// update inputs value
function updateTimeInputs(totalTimeSeconds) {
  let hours_updated = Math.floor(totalTimeSeconds / 3600);
  let minutes_updated = Math.floor(Math.floor(totalTimeSeconds % 3600) / 60);
  let seconds_updated = Math.floor(Math.floor(totalTimeSeconds % 3600) % 60);

  hoursFirst.textContent = hours_updated.toString().padStart(2, '0')[0];
  hoursSecond.textContent = hours_updated.toString().padStart(2, '0')[1];

  minutesFirst.textContent = minutes_updated.toString().padStart(2, '0')[0];
  minutesSecond.textContent = minutes_updated.toString().padStart(2, '0')[1];

  secondsFirst.textContent = seconds_updated.toString().padStart(2, '0')[0];
  secondsSecond.textContent = seconds_updated.toString().padStart(2, '0')[1];
}

// pause event handler
btnPause.addEventListener("click", (event) => {
  isPause = !isPause;
  if (isPause) {
    btnPause.innerHTML = `<i class="fa-solid fa-play"></i>`;
  } else {
    btnPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }
});

// stop event handler
btnStop.addEventListener("click", () => {
  btnStart.style.display = "block";
  btnPause.style.display = "none";
  btnPause.disabled = false;
  btnStop.style.display = "none";
  btnReset.style.display = "none";

  isPause = true;

  hoursFirst.textContent = def_hours.toString().padStart(2, '0')[0];
  hoursSecond.textContent = def_hours.toString().padStart(2, '0')[1];
  minutesFirst.textContent = def_minutes.toString().padStart(2, '0')[0];
  minutesSecond.textContent = def_minutes.toString().padStart(2, '0')[1];
  secondsFirst.textContent = def_seconds.toString().padStart(2, '0')[0];
  secondsSecond.textContent = def_seconds.toString().padStart(2, '0')[1];

  clearInterval(interval);
});

// reset event handler
btnReset.addEventListener("click", () => {
  clearInterval(interval);
  btnPause.disabled = false;
  isPause = false;

  hoursFirst.textContent = def_hours.toString().padStart(2, '0')[0];
  hoursSecond.textContent = def_hours.toString().padStart(2, '0')[1];
  minutesFirst.textContent = def_minutes.toString().padStart(2, '0')[0];
  minutesSecond.textContent = def_minutes.toString().padStart(2, '0')[1];
  secondsFirst.textContent = def_seconds.toString().padStart(2, '0')[0];
  secondsSecond.textContent = def_seconds.toString().padStart(2, '0')[1];

  totalTimeSeconds = getCurrentTotalTime();
  startTimer(totalTimeSeconds);
});