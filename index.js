const resultButton = document.querySelector(".result-btn");
const dateLastShift = document.querySelector(".date-last-shift");
const dateWantKnow = document.querySelector(".date-want-know");
const calendarDate=document.querySelector(".calendar-date");
const rebootButton = document.querySelector(".reboot-btn");
const resultMessage=document.querySelector(".result-message");
const intervalNumber = document.querySelector(".interval-number");
const workDayNumber = document.querySelector(".workday-number");
const arrayOfMonths = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
const arrayOfMonthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const toggleLangButton=document.querySelector('.toggle-lang-btn')
const popupCloseButton=document.querySelector(".popup-close-btn")
let intervalValue = parseInt(intervalNumber.value);
let workDayValue = parseInt(workDayNumber.value=1);
let currentLanguage = 'uk';

// button for updating ------------------------------------------------------------------
rebootButton.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
//get input value----------------------------------------------------------------------------------
intervalNumber.addEventListener("change", function () {
  intervalValue = parseInt(intervalNumber.value);
});

workDayNumber.addEventListener("change", function () {
  workDayValue = parseInt(workDayNumber.value);
});

function getInputValue(date) {
  return new Date(date.value);
}

//get date and create calendar----------------------------------------------------------------------
function createCalendar(dateWant, dateShift) {
  const elem = document.querySelector(".calendar");
  const targetInputValue = getInputValue(dateWantKnow);
  const targetDayLastShift = getInputValue(dateLastShift);
  const seachDate = targetInputValue.getDate();

  let year = targetInputValue.getFullYear();
  let month = targetInputValue.getMonth();
  let dayYM = new Date(year, month);
  calendarDate.textContent=arrayOfMonths[month]+" "+year
  // if(currentLanguage==='uk') {
    let table =
    "<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>нд</th></tr><tr>";
  // }
  // else {
  //   table =
  //   "<table><tr><th>mo</th><th>tu</th><th>we</th><th>th</th><th>fr</th><th>st</th><th>su</th></tr><tr>";
  // }
  
  const arrayOfShifts = getDatesInMonth(
    targetDayLastShift,
    intervalValue,
    targetInputValue
  );
  for (let i = 0; i < getDay(dayYM); i++) {
    table += "<td></td>";
  }

  while (dayYM.getMonth() == month) {
    if (
      arrayOfShifts.includes(dayYM.getDate()) &&
      dayYM.getDate() === seachDate
    ) {
      table += `<td class="same-date">${dayYM.getDate()}</td>`;
      resultMessage.textContent="Твій робочий день"}
    else if (dayYM.getDate() === seachDate)
      {table += `<td class="seach-date">${dayYM.getDate()}</td>`;
      resultMessage.textContent="Твій неробочий день"}
    else if (arrayOfShifts.includes(dayYM.getDate()))
      table += `<td class="shift-date">${dayYM.getDate()}</td>`;
    else {
      table += `<td>${dayYM.getDate()}</td>`;
    }

    if (getDay(dayYM) % 7 == 6) {
      table += "</tr><tr>";
    }

    dayYM.setDate(dayYM.getDate() + 1);
  }

  if (getDay(dayYM) != 0) {
    for (let i = getDay(dayYM); i < 7; i++) {
      table += "<td></td>";
    }
  }

  table += "</tr></table>";

  elem.innerHTML = table;
}

function getDay(dateWant) {
  let day = dateWant.getDay();
  if (day == 0) day = 7;
  return day - 1;
}

function getDatesInMonth(date, interval, dateW) {
  let currentDate = new Date(date);
  let wantDate = new Date(dateW);
  const targetYear = wantDate.getFullYear();
  const targetMonth = wantDate.getMonth();
  const dates = [];
  if (currentDate <= wantDate) {
    while (
      currentDate.getFullYear() <= targetYear ||
      currentDate.getMonth() === targetMonth
    ) {
      if (
        currentDate.getMonth() === targetMonth &&
        currentDate.getFullYear() === targetYear
      ) {
        for (let i = 0; i < workDayValue; i++) {
          dates.push(currentDate.getDate() - i);
        }
      }    
      currentDate.setDate(currentDate.getDate() + interval + workDayValue);
    }
  } else if (currentDate > wantDate) {
    while (
      currentDate.getFullYear() >= targetYear ||
      currentDate.getMonth() <= targetMonth
    ) {
      if (
        currentDate.getMonth() === targetMonth &&
        currentDate.getFullYear() === targetYear
      ) {
        for (let i = 0; i < workDayValue; i++) {
          dates.push(currentDate.getDate() - i);
        }
      }   
      currentDate.setDate(currentDate.getDate() - interval - workDayValue);
    }
  }
  return dates;
}

function handleClick() {
  const targetInputValue = getInputValue(dateWantKnow);
  const targetlastShift = getInputValue(dateLastShift);
  if (targetInputValue != "Invalid Date" && targetlastShift != "Invalid Date" && !isNaN(intervalValue)) {
    createCalendar(targetInputValue, targetlastShift);
    resultButton.removeEventListener("click", handleClick);
    document.querySelector(".input-container").style.display = "none";
  } else {
    openPopup();
  }
}

resultButton.addEventListener("click", handleClick);

//change language---------------------------------------------------------------------------------------------
const translations = {
  'header-title': {
    en: 'Are you working on this day?',
    uk: 'Чи працюєш в цей день?'
  },
  'questions-last-shift': {
    en: 'Enter the date of your last shift:',
    uk: 'Введіть дату останнього чергування:'
  },
  'questions-interval': {
    en: 'Enter the number of days between shifts:',
    uk: 'Введіть кількість днів між чергуванням:'
  },
  'questions-date-want-know': {
    en: 'Enter the date you want to find:',
    uk: 'Введіть дату, яку потрібно знайти:'
  },
  'questions-workday-number': {
    en: 'Enter the number of consecutive working days:',
    uk: 'Введіть кількість робочих днів підряд:'
  },
  'result-btn': {
    en: 'Result',
    uk: 'Результат'
  },
  'reboot-btn': {
    en: 'Reset',
    uk: 'Оновити'
  },
  'popup-text': {
    en: 'Not all data is entered',
    uk: 'Не всі дані введені'
  },
  'popup-close-btn': {
    en: 'Ok',
    uk: 'Ok'
  }
};

function changeLanguage() {
  const elements = document.querySelectorAll('[data-translate]');

  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[key] && translations[key][currentLanguage]) {
      element.textContent = translations[key][currentLanguage];
    }
  });
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'uk' : 'en';
  toggleLangButton.textContent= toggleLangButton.textContent==="uk"?"en":"uk";
  changeLanguage();
}

//toggleLangButton.addEventListener('click', toggleLanguage);

//popup--------------------------------------------------------------------------------------------------------------
function openPopup() {
  document.querySelector(".popup").classList.toggle("target");
}

popupCloseButton.addEventListener("click",openPopup)