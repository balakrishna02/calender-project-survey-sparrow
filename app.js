let currentDate = new Date();
let selectedDate = null;
const events = {};

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const selectedDateLabel = document.getElementById("selectedDateLabel");

function renderCalendar() {
  calendar.innerHTML = "";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  days.forEach(day => {
    const dayCell = document.createElement("div");
    dayCell.className = "day-name";
    dayCell.innerText = day;
    calendar.appendChild(dayCell);
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  monthYear.innerText = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month);
  let startDay = (firstDay.getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.innerText = day;

    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add("highlight");
    }

    const dateKey = `${String(day).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}-${year}`;



    if (events[dateKey] && events[dateKey].length > 0) {
    const summary = document.createElement("div");
    summary.className = "events-summary";

  // Combine all titles into one string
    summary.innerText = events[dateKey].map(e => e.title).join(', ');
    cell.appendChild(summary);
}


    cell.addEventListener("click", () => {
      document.querySelectorAll(".calendar div").forEach(div => div.classList.remove("selected"));
      cell.classList.add("selected");

      selectedDate = dateKey;
      selectedDateLabel.innerText = selectedDate;
      renderEventList();
    });

    calendar.appendChild(cell);
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function addEvent() {


  
  // --------------------------------------------------------

  const title = document.getElementById("eventInput").value.trim();
  const time = document.getElementById("eventTime").value.trim();
  const duration = document.getElementById("eventDuration").value.trim();

  if (!title || !selectedDate) return;

  if (!events[selectedDate]) events[selectedDate] = [];

  events[selectedDate].push({ title, time, duration });

  // const hasConflict = events[selectedDate].some(event => event.time === time);

  // if (hasConflict) {
  //   alert(`Conflict: An event is already scheduled at ${time} on ${selectedDate}`);
  //   return;
  // }


  // Clear inputs
  document.getElementById("eventInput").value = "";
  document.getElementById("eventTime").value = "";
  document.getElementById("eventDuration").value = "";

  renderCalendar();
  renderEventList();


}

function renderEventList() {
  const list = document.getElementById("allEventsList");
  list.innerHTML = "";

  const dayEvents = events[selectedDate] || [];

  if (dayEvents.length === 0) {
    list.innerHTML = "<li>No events for this day.</li>";
    return;
  }

  dayEvents.forEach(event => {
    const li = document.createElement("li");
    li.innerText = `${event.title} — ${event.time} (${event.duration})`;
    list.appendChild(li);
  });
}

renderCalendar();


