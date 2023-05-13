let typing = new Typed(".job", {
  strings: [
    "أنا مبرمج",
    "I'm a developer",
    "Je suis un développeur",
    "Soy un desarrollador",
    "Ich bin ein Entwickler",
    "私は開発者です",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
});

let el = document.querySelector(".scroller");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

console.log(document.documentElement.scrollHeight);
console.log(document.documentElement.clientHeight);
console.log(height);

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  el.style.width = `${(scrollTop / height) * 100}%`;
});

document.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 38 || event.keyCode === 40) {
    event.preventDefault();
  }
});

let skills = document.getElementById("learned");
function getSkills() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let mySkills = JSON.parse(this.responseText);
      shuffle(mySkills);
      for (let i = 0; i < mySkills.length; i++) {
        skills.firstElementChild.firstElementChild.innerHTML += `
        <div class="skill-progress">
        <div class="skill-outer">
          <div class="skill-inner">${mySkills[i]["icon"]}</div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="160px"
          height="160px"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stop-color="#0075ff" />
              <stop offset="100%" stop-color="#fcb711" />
            </linearGradient>
          </defs>
          <circle data-style = 'progress${mySkills[i].level} 2s linear forwards'
            cx="80"
            cy="80"
            r="75"
            stroke-linecap="round"
          />
        </svg>
      </div>`;
      }
      myProgesses = document.querySelectorAll("circle");
      window.addEventListener("scroll", () => {
        myProgesses.forEach((element) => {
          const bounding = element.getBoundingClientRect();
          if (bounding.top < window.innerHeight && bounding.bottom >= 0) {
            element.style.animation = element.dataset.style;
          } else {
            element.style.animation = "none";
          }
        });
      });
    }
  };
  myRequest.open("GET", "jsons/mySkills.json", true);
  myRequest.send();
}

getSkills();

function getLangs() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let myLangs = JSON.parse(this.responseText);
      shuffle(myLangs);
      for (let i = 0; i < myLangs.length; i++) {
        skills.firstElementChild.lastElementChild.innerHTML += `
        <div class="lang">
        <h3>${myLangs[i].name} <span>${myLangs[i].level}</span></h3>
        <div class="the-progress">
          <span style="width: ${myLangs[i].level}" data-width = " ${myLangs[i].level}"></span>
        </div>
      </div>`;
      }
      myLangProgesses = document.querySelectorAll(".lang .the-progress span");
      window.addEventListener("scroll", () => {
        myLangProgesses.forEach((element) => {
          const bounding = element.getBoundingClientRect();
          if (bounding.top < window.innerHeight && bounding.bottom >= 0) {
            element.style.width = element.dataset.width;
          } else {
            element.style.width = 0;
          }
        });
      });
    }
  };
  myRequest.open("GET", "jsons/myLangs.json", true);
  myRequest.send();
}

getLangs();

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function getProjects() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let myProjects = JSON.parse(this.responseText);
      shuffle(myProjects);
      for (let i = 0; i < 6; i++) {
        document.querySelector(".projects .container").innerHTML += `
        <a href="https://marwane-m7b.github.io/${myProjects[i].name}/" target="_blank"><img src="https://api.screenshotmachine.com?key=e10806&url=https://marwane-m7b.github.io/${myProjects[i].name}/&dimension=1024x768" alt="" id="website-img1"></a>
        `;
      }
    }
  };
  myRequest.open("GET", "https://api.github.com/users/marwane-m7b/repos", true);
  myRequest.send();
}

getProjects();

function educationBar() {
  //DOM Elements
  const circles = document.querySelectorAll(".circle"),
    progressBar = document.querySelector(".indicator"),
    buttons = document.querySelectorAll("button");

  let currentStep = 1;

  // function that updates the current step and updates the DOM
  const updateSteps = (e) => {
    // update current step based on the button clicked
    currentStep = e.target.id === "next" ? ++currentStep : --currentStep;

    // loop through all circles and add/remove "active" class based on their index and current step
    circles.forEach((circle, index) => {
      circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
    });

    // update progress bar width based on current step
    progressBar.style.width = `${
      ((currentStep - 1) / (circles.length - 1)) * 100
    }%`;

    // check if current step is last step or first step and disable corresponding buttons
    if (currentStep === circles.length) {
      buttons[1].disabled = true;
    } else if (currentStep === 1) {
      buttons[0].disabled = true;
    } else {
      buttons.forEach((button) => (button.disabled = false));
    }
  };

  // add click event listeners to all buttons
  buttons.forEach((button) => {
    button.addEventListener("click", updateSteps);
  });
}

educationBar();
