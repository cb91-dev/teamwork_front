// // Hosting URL
// const url = "https://bennettdesigns.dev/teamwork/api/api.php";

//----------------- LOGIN FETCH-------------------------

function login(evt) {
  evt.preventDefault();
  document.getElementById("loader").classList.remove("hidden");
  var loginData = new FormData();
  loginData.append(evt.target[0].name, evt.target[0].value);
  loginData.append(evt.target[1].name, evt.target[1].value);
  fetch(url + "?action=login", {
    method: "POST",
    body: loginData,
    credentials: "include",
  }).then(function (res) {
    if (res.status === 202) {
      hideAlert();
      setTimeout(function () {
        viewMyDetails();
      }, 2100);
      setTimeout(function () {
        viewMyAvail();
      }, 4100);
      setTimeout(function () {
        viewMySchedule();
      }, 5100);
      document.getElementById("TeamWork_APP_login").classList.add("hidden");
      showAlert("success", "You have logged in");
      document.getElementById("loader").classList.add("hidden");
      document.getElementById("menu5").classList.add("hidden");
      document.getElementById("menu5-btn").classList.add("hidden");
      document
        .getElementById("TeamWork_APP_logged_in")
        .classList.remove("hidden");
      document.getElementById("menu1").classList.remove("hidden");
    }
    if (res.status === 307) {
      hideAlert();
      setTimeout(function () {
        viewMyDetails();
      }, 2100);
      setTimeout(function () {
        viewMyAvail();
      }, 4100);
      setTimeout(function () {
        viewMySchedule();
      }, 5100);

      document.getElementById("TeamWork_APP_login").classList.add("hidden");
      showAlert("success", "You have logged in");
      document.getElementById("loader").classList.add("hidden");
      document
        .getElementById("TeamWork_APP_logged_in")
        .classList.remove("hidden");
      localStorage.setItem("Admin", "ok");
      document.getElementById("menu5").classList.remove("hidden");
      document.getElementById("menu5-btn").classList.remove("hidden");
    }
    if (res.status === 401) {
      showLoginAlert(
        "error",
        "Somthing has gone wrong, please make sure you have enter the correct details"
      );
      document.getElementById("loader").classList.add("hidden");
    }
    if (res.status === 501) {
      showLoginAlert("error", "Mmmm somthing has gone wrong");
      document.getElementById("loader").classList.add("hidden");
    }
    if (res.status === 429) {
      showLoginAlert("error", "OK........ stop pushing the submit button");
      document.getElementById("loader").classList.add("hidden");
    }
  });
}
// function myServiceGuy() {
//   navigator.serviceWorker.register("sw.js").then(
//     function (registration) {
//       // Registration was successful
//       console.log(
//         "ServiceWorker registration successful with scope: ",
//         registration.scope
//       );
//     },
//     function (err) {
//       // registration failed :(
//       console.log("ServiceWorker registration failed: ", err);
//     }
//   );
// }

setTimeout(function () {
  viewMyDetails();
}, 2100);
setTimeout(function () {
  viewMyAvail();
}, 4100);
setTimeout(function () {
  viewMySchedule();
}, 5100);

if (localStorage.getItem("Logged_In_Status", "True")) {
  document.getElementById("TeamWork_APP_login").classList.add("hidden");
  showAlert("success", "You have logged in");
  document.getElementById("TeamWork_APP_logged_in").classList.remove("hidden");
} else {
  document.getElementById("TeamWork_APP_login").classList.remove("hidden");
  showAlert("error", "Please log in");
  document.getElementById("TeamWork_APP_logged_in").classList.add("hidden");
}

///----------------- THEME----------------------
var stylesheet = document.getElementById("stylesheet");
function onloadtheme() {
  if (localStorage.getItem("DarkModeStatus", "css/dark.css")) {
    stylesheet.setAttribute("href", "css/dark.css");
  } else {
    stylesheet.setAttribute("href", "css/light.css");
  }
}
function setStyleSheet(url) {
  hideAlert();
  stylesheet.setAttribute("href", url);
  // // window.addEventListener('DOMContentloaded',)
  document.getElementById("loader-theme").classList.add("hidden");
  localStorage.setItem("DarkModeStatus", url);
}

///----------------------- CLOCK IN FETCH-----------------

function punchClock() {
  let formDate = new FormData();
  const num = document.getElementById("clockInNumber").value;
  formDate.append("clockInNumber", num);
  fetch(
    url + "?action=clockIn",

    {
      method: "POST",
      body: formDate,
      credentials: "include",
    }
  ).then(function (headers) {
    if (headers.status === 201) {
      showAlert("success", "You have clocked in");
    }
    if (headers.status === 202) {
      showAlert("success", "You have clocked out");
    }
    if (headers.status === 204) {
      showAlert("warning", "You are not currently clocked on");
    }
    if (headers.status === 401) {
      showAlert("warning", "Please make sure you have used your own number");
    }
    if (headers.status === 501) {
      showAlert("error", "Mmmm somthing has gone wrong");
    }
    if (headers.status === 429) {
      showAlert("error", "OK........ stop pushing the submit button");
    }

    headers.text().then(function (body) {
      // document.getElementById('insert_box_msg').innerHTML = body;
    });
  });
  setTimeout(function () {
    clearNums();
  }, 500);
}
///  LIVE RUNNING CLOCK
const Lclock = document.getElementById("live_Clock");
function time() {
  let d = new Date();
  let s = d.getSeconds();
  let m = d.getMinutes();
  let h = d.getHours();
  Lclock.textContent =
    ("0" + h).substr(-2) +
    ":" +
    ("0" + m).substr(-2) +
    ":" +
    ("0" + s).substr(-2);
}
setInterval(time, 1000);

/// Show last time clocked in

function display_last_punch() {
  // var url = "http://localhost:8888/api/api.php";
  fetch(url + "?action=viewClock", { credentials: "include" }).then(function (
    response
  ) {
    if (response.status == 200) {
      response.json().then((data) => {
        document.getElementById("display_last_punch").innerHTML =
          "You last clocked on at" + data.clockIn.substr(10, 6);
      });
    }
  });
}

// Taking values from keys pressed
function btnKey(id) {
  let preValue = document.getElementById("clockInNumber").value;
  let key = document.getElementById(id).innerHTML;
  document.getElementById("clockInNumber").value = preValue + key;
}

// Deleting Values
function clearNums() {
  document.getElementById("clockInNumber").value = "";
}

///REGISTER Fetch
function clearRegister(e) {
  document.getElementById(e).reset();
}
function register(evt) {
  hideAlert();
  // document.getElementById("loader").classList.remove("hidden");
  evt.preventDefault();
  var postFormData = new FormData();
  postFormData.append(evt.target[0].name, evt.target[0].value);
  postFormData.append(evt.target[1].name, evt.target[1].value);
  postFormData.append(evt.target[2].name, evt.target[2].value);
  postFormData.append(evt.target[3].name, evt.target[3].value);
  postFormData.append(evt.target[4].name, evt.target[4].value);
  postFormData.append(evt.target[5].name, evt.target[5].value);
  postFormData.append(evt.target[6].name, evt.target[6].value);
  postFormData.append(evt.target[7].name, evt.target[7].value);
  postFormData.append(evt.target[8].name, evt.target[8].value);
  fetch(url + "?action=register", {
    method: "POST",
    body: postFormData,
    credentials: "include",
  }).then(function (headers) {
    document.getElementById("loader").classList.add("hidden");
    if (headers.status === 201) {
      document.getElementById("register_form").classList.add("hidden");
      document.getElementById("login_box").classList.remove("hidden");
      showLoginAlert("success", "Welcome to the party now login");
      clearRegister("login_form");
    }
    if (headers.status === 200) {
      showLoginAlert("Error", "Try another email please");
    }
    if (headers.status === 401) {
      showLoginAlert(
        "warning",
        "Please ensure you have all fields correctly filled out"
      );
    }
    if (headers.status === 501) {
      showLoginAlert("error", "Mmmm somthing has gone wrong");
    }
    if (headers.status === 429) {
      showLoginAlert("error", "OK........ stop pushing the submit button");
    }
  });
}

/// My Schedule FETCH
function viewMySchedule() {
  fetch(url + "?action=viewMySchedule", {
    method: "POST",
    credentials: "include",
  }).then(function (response) {
    if (response.status === 202) {
      response.json().then((response) => {
        formattedSchedule(response);
      });
    } else {
      showAlert("warning", "nope");
    }
  });
}

function formattedSchedule(res) {
  for (let i = 0; i < res.length; i++) {
    const formattedSchedule = {
      employees_idNumber: res[i].employees_idNumber,
      department: res[i].Department,
      startTime: res[i].startDate_Time,
      finishTime: res[i].finishDate_Time,
      shiftMsg: res[i].ShiftMsg,
      shiftid: res[i].schedule_id,
    };

    renderScheduleList(formattedSchedule);
  }
}

function renderScheduleList(res) {
  var date = res.startTime;
  var readable_date = new Date(date).toDateString();
  let startTime = res.startTime;
  let finishTime = res.finishTime;
  let sT = startTime.substr(11, 5);
  let fT = finishTime.substr(11, 5);

  // Save the current contents of #ShiftList
  let inner = document.getElementById("shiftList").innerHTML;
  // Add to contents
  inner =
    inner +
    `
<a class="panel-block is-active is-flex is-justify-content-space-between" onclick="OpenShiftView(event, '${res.shiftid}')">
${readable_date}<i class="fas fa-chevron-down"></i>
</a>
<article class="message p-2 is-info shiftViewer hidden" id=${res.shiftid}>

  Department:
  ${res.department}<br>
  Start Time:
  ${sT}<br>
  Finish Time:
  ${fT}<br>
  Shift Team Message:
  ${res.shiftMsg}<br>

  <div class="is-flex is-justify-content-center">
  <button class="delete shiftCloser" aria-label="delete" onclick="CloseShiftView(event)"></button>
</div>
</article>`;
  // Insert back into DOM
  document.getElementById("shiftList").innerHTML = inner;
}
function OpenShiftView(evt, shiftID) {
  let a = document.getElementById(shiftID); //evt.target;
  a.classList.remove("hidden");
}
function CloseShiftView(evt) {
  let a = evt.target.parentNode.parentNode;
  a.classList.add("hidden");
}

//-------ONLOAD HIDE MAIN APP FACE---
function hide_main_app() {
  ////------ONLOAD ISLOGGED IN

  fetch(url + "?action=isLoggedin", { credentials: "include" }).then(function (
    headers
  ) {
    if (headers.status === 202) {
      document.getElementById("TeamWork_APP_login").classList.add("hidden");
      showAlert("success", "Welcome Back");

      document
        .getElementById("TeamWork_APP_logged_in")
        .classList.remove("hidden");
      localStorage.setItem("Logged_In_Status", "True");
    }
    if (headers.status === 307) {
      document.getElementById("TeamWork_APP_login").classList.add("hidden");
      showAlert("success", "Welcome Back");
      document
        .getElementById("TeamWork_APP_logged_in")
        .classList.remove("hidden");
      localStorage.setItem("Admin", "ok");
    }
    if (headers.status === 401) {
      document.getElementById("TeamWork_APP_login").classList.remove("hidden");
      document.getElementById("TeamWork_APP_logged_in").classList.add("hidden");
      localStorage.setItem("Logged_In_Status", "False");
    }
    if (headers.status === 501) {
      showAlert("error", "Computer says no");
    }
    if (headers.status === 429) {
      showAlert("error", "OK........ stop pushing the submit button");
    }
  });
}

//--------------------- LOGOUT FETCH--------------------

function logOut(evt) {
  document.getElementById("navHambuger").classList.toggle("is-active");
  document.getElementById("navbarBasicExample").classList.toggle("is-active");
  evt.preventDefault();
  fetch(url + "?action=logout", {
    credentials: "include",
  }).then(function (headers) {
    if (headers.status === 202) {
      localStorage.setItem("Admin", "no");
      document.getElementById("shiftList").innerHTML = " ";
      document.getElementById("TeamWork_APP_login").classList.remove("hidden");
      showAlert("success", "You have logged out");
      document.getElementById("TeamWork_APP_logged_in").classList.add("hidden");
      localStorage.setItem("Logged_In_Status", "False");
    }
    if (headers.status === 500) {
      showAlert("warning", "Mmmm somthing has gone wrong");
    }
  });
}
// / login Errors box
function showLoginAlert(msgtype, msg) {
  document.getElementById("alertLogin").removeAttribute("hidden");
  document.getElementById("alertMsgLogin").innerHTML = msg;
  window.setTimeout(function () {
    hideLoginAlert();
  }, 10000);
  if (msgtype === "success") {
    document.getElementById("alertLogin").style.backgroundColor =
      "rgb(41, 109, 219)";
    document.getElementById("alertLogin").style.color = "rgb(255, 255, 255)";
  }
  if (msgtype === "warning") {
    document.getElementById("alertLogin").style.backgroundColor =
      "rgb(255, 221, 87)";
  }
  if (msgtype === "error") {
    document.getElementById("alertLogin").style.backgroundColor =
      "rgb(255, 56, 96)";
    document.getElementById("alertLogin").style.color = "rgb(255, 255, 255)";
  }
}
function hideLoginAlert() {
  document.getElementById("alertLogin").setAttribute("hidden", "hidden");
}
///--------------------------------ERRORS BOXS---------------------
function showAlert(msgtype, msg) {
  document.getElementById("alertbox").removeAttribute("hidden");
  document.getElementById("alertmsg").innerHTML = msg;
  window.setTimeout(function () {
    hideAlert();
  }, 10000);
  if (msgtype === "success") {
    document.getElementById("alertbox").style.backgroundColor =
      "rgb(41, 109, 219)";
    document.getElementById("alertbox").style.color = "rgb(255, 255, 255)";
  }
  if (msgtype === "warning") {
    document.getElementById("alertbox").style.backgroundColor =
      "rgb(255, 221, 87)";
  }
  if (msgtype === "error") {
    document.getElementById("alertbox").style.backgroundColor =
      "rgb(255, 56, 96)";
    document.getElementById("alertbox").style.color = "rgb(255, 255, 255)";
  }
}
function hideAlert() {
  document.getElementById("alertbox").setAttribute("hidden", "hidden");
  document.getElementById("alertLogin").setAttribute("hidden", "hidden");
}

//----------------------------LOGIN REGISTER-------------------------

const reg_show = document.getElementById("reg_show");
reg_show.addEventListener("click", function () {
  document.getElementById("register_form").classList.remove("hidden");
  document.getElementById("login_box").classList.add("hidden");
});
//------------------"BACK_TO_LOGIN_BTN--------------------"

function back_to_login_btn() {
  document.getElementById("register_form").classList.add("hidden");
  document.getElementById("login_box").classList.remove("hidden");
}

// //--------- View My Details------------
function viewMyDetails() {
  hideAlert();
  document.getElementById("loader").classList.remove("hidden");
  fetch(url + "?action=viewMyDetails", { credentials: "include" }).then(
    function (response) {
      if (response.status === 202) {
        document.getElementById("loader").classList.add("hidden");
        response.json().then((data) => {
          document.getElementById("employees_idNumber").value =
            data.employees_idNumber;
          document.getElementById("first_name").value = data.firstName;
          document.getElementById("last_name").value = data.lastName;
          document.getElementById("preferred_name").value = data.firstName;
          document.getElementById("DOB").value = data.DOB;
          document.getElementById("email").value = data.email;
          document.getElementById("clock_Number").value = data.clock_Number;
          document.getElementById("phone_number").value = data.phone_number;
          document.getElementById("loader").classList.add("hidden");
        });
      }
      if (response.status === 400) {
        showAlert("error", "Whoops");
        document.getElementById("loader").classList.add("hidden");
      }
      if (response.status === 429) {
        showAlert("error", "Whoops");
        document.getElementById("loader").classList.add("hidden");
      }
      if (response.status === 500) {
        showAlert("error", "Whoops");
        document.getElementById("loader").classList.add("hidden");
      }
    }
  );
}

/// ---------------------MY DETAILS--------------------------//////

///--------------View MY DETAILS for updating-------
function updateMyDetailsViewForm() {
  hideAlert();
  document.getElementById("loader").classList.remove("hidden");
  fetch(url + "?action=viewMyDetails", { credentials: "include" }).then(
    function (response) {
      if (response.status === 202) {
        response.json().then((data) => {
          document.getElementById("update_first_name").value = data.firstName;
          document.getElementById("update_last_name").value = data.lastName;
          document.getElementById("update_DOB").value = data.DOB;
          document.getElementById("update_department").value = data.department;
          document.getElementById("update_email").value = data.email;
          document.getElementById("update_phone_number").value =
            data.phone_number;
          document.getElementById("update_clock_Number").value =
            data.clock_Number;
          document.getElementById("loader").classList.add("hidden");
        });
        if (response.status === 400) {
          showAlert("error", "Error loading those results");
          document.getElementById("loader").classList.add("hidden");
        }
        if (response.status === 401) {
          showAlert("error", "Error loading those results");
          document.getElementById("loader").classList.add("hidden");
        }
        if (response.status === 429) {
          showAlert("error", "Error loading those results");
          document.getElementById("loader").classList.add("hidden");
        }
        if (response.status === 500) {
          showAlert("error", "Error loading those results");
          document.getElementById("loader").classList.add("hidden");
        }
      }
    }
  );
}
// -------------Action to Up Date My Details-------------------------------///
function upDateMyDetails(event) {
  hideAlert();
  document.getElementById("loader").classList.remove("hidden");
  event.preventDefault(event);
  var postFormData = new FormData();
  postFormData.append(event.target[0].name, event.target[0].value);
  postFormData.append(event.target[1].name, event.target[1].value);
  postFormData.append(event.target[2].name, event.target[2].value);
  postFormData.append(event.target[3].name, event.target[3].value);
  postFormData.append(event.target[4].name, event.target[4].value);
  postFormData.append(event.target[5].name, event.target[5].value);
  postFormData.append(event.target[6].name, event.target[6].value);
  postFormData.append(event.target[7].name, event.target[7].value);
  fetch(url + "?action=upDateMyDetails", {
    method: "POST",
    body: postFormData,
    credentials: "include",
  }).then(function (headers) {
    document.getElementById("loader").classList.add("hidden");
    if (headers.status === 201) {
      showAlert("success", "Your details have been updated");
    }
    if (headers.status === 401) {
      showAlert(
        "warning",
        "Your details never updated, make sure you have changed details to update them"
      );
      document.getElementById("loader").classList.add("hidden");
    }
    if (headers.status === 500) {
      showAlert("error", "What ever your doing is not cool");
      document.getElementById("loader").classList.add("hidden");
    }
    if (headers.status === 429) {
      showAlert("error", "That is not cool Stop");
      document.getElementById("loader").classList.add("hidden");
    }
  });
}

////// -------------Availabilities

/// First Availabilities Form

var monday_yes = document.getElementById("Monday_btn1");
var monday_no = document.getElementById("Monday_btn2");
var tuesday_yes = document.getElementById("Tuesday_btn1");
var tuesday_no = document.getElementById("Tuesday_btn2");
var wednesday_yes = document.getElementById("Wednesday_btn1");
var wednesday_no = document.getElementById("Wednesday_btn2");
var thursday_yes = document.getElementById("Thursday_btn1");
var thursday_no = document.getElementById("Thursday_btn2");
var friday_yes = document.getElementById("Friday_btn1");
var friday_no = document.getElementById("Friday_btn2");
var saturday_yes = document.getElementById("Saturday_btn1");
var saturday_no = document.getElementById("Saturday_btn2");
var sunday_yes = document.getElementById("Sunday_btn1");
var sunday_no = document.getElementById("Sunday_btn2");

monday_yes.addEventListener("click", function () {
  document.getElementById("Monday_input").value = "Yes";
  document.getElementById("Monday_btn1").classList.add("is-link");
  document.getElementById("Monday_btn2").classList.remove("is-link");
});

monday_no.addEventListener("click", function () {
  document.getElementById("Monday_input").value = "No";
  document.getElementById("Monday_btn2").classList.add("is-link");
  document.getElementById("Monday_btn1").classList.remove("is-link");
});

tuesday_yes.addEventListener("click", function () {
  document.getElementById("Tuesday_input").value = "Yes";
  document.getElementById("Tuesday_btn1").classList.add("is-link");
  document.getElementById("Tuesday_btn2").classList.remove("is-link");
});
tuesday_no.addEventListener("click", function () {
  document.getElementById("Tuesday_input").value = "No";
  document.getElementById("Tuesday_btn2").classList.add("is-link");
  document.getElementById("Tuesday_btn1").classList.remove("is-link");
});
wednesday_yes.addEventListener("click", function () {
  document.getElementById("Wednesday_input").value = "Yes";
  document.getElementById("Wednesday_btn1").classList.add("is-link");
  document.getElementById("Wednesday_btn2").classList.remove("is-link");
});
wednesday_no.addEventListener("click", function () {
  document.getElementById("Wednesday_input").value = "No";
  document.getElementById("Wednesday_btn2").classList.add("is-link");
  document.getElementById("Wednesday_btn1").classList.remove("is-link");
});
thursday_yes.addEventListener("click", function () {
  document.getElementById("Thursday_input").value = "Yes";
  document.getElementById("Thursday_btn1").classList.add("is-link");
  document.getElementById("Thursday_btn2").classList.remove("is-link");
});
thursday_no.addEventListener("click", function () {
  document.getElementById("Thursday_input").value = "No";
  document.getElementById("Thursday_btn2").classList.add("is-link");
  document.getElementById("Thursday_btn1").classList.remove("is-link");
});
friday_yes.addEventListener("click", function () {
  document.getElementById("Friday_input").value = "Yes";
  document.getElementById("Friday_btn1").classList.add("is-link");
  document.getElementById("Friday_btn2").classList.remove("is-link");
});
friday_no.addEventListener("click", function () {
  document.getElementById("Friday_input").value = "No";
  document.getElementById("Friday_btn2").classList.add("is-link");
  document.getElementById("Friday_btn1").classList.remove("is-link");
});
saturday_yes.addEventListener("click", function () {
  document.getElementById("Saturday_input").value = "Yes";
  document.getElementById("Saturday_btn1").classList.add("is-link");
  document.getElementById("Saturday_btn2").classList.remove("is-link");
});
saturday_no.addEventListener("click", function () {
  document.getElementById("Saturday_input").value = "No";
  document.getElementById("Saturday_btn2").classList.add("is-link");
  document.getElementById("Saturday_btn1").classList.remove("is-link");
});
sunday_yes.addEventListener("click", function () {
  document.getElementById("Sunday_input").value = "Yes";
  document.getElementById("Sunday_btn1").classList.add("is-link");
  document.getElementById("Sunday_btn2").classList.remove("is-link");
});
sunday_no.addEventListener("click", function () {
  document.getElementById("Sunday_input").value = "No";
  document.getElementById("Sunday_btn2").classList.add("is-link");
  document.getElementById("Sunday_btn1").classList.remove("is-link");
});

/// ---------------Second Availabilities Form

var view_monday_yes = document.getElementById("View_Monday_btn1");
var view_monday_no = document.getElementById("View_Monday_btn2");
var view_tuesday_yes = document.getElementById("View_Tuesday_btn1");
var view_tuesday_no = document.getElementById("View_Tuesday_btn2");
var view_wednesday_yes = document.getElementById("View_Wednesday_btn1");
var view_wednesday_no = document.getElementById("View_Wednesday_btn2");
var view_thursday_yes = document.getElementById("View_Thursday_btn1");
var view_thursday_no = document.getElementById("View_Thursday_btn2");
var view_friday_yes = document.getElementById("View_Friday_btn1");
var view_friday_no = document.getElementById("View_Friday_btn2");
var view_saturday_yes = document.getElementById("View_Saturday_btn1");
var view_saturday_no = document.getElementById("View_Saturday_btn2");
var view_sunday_yes = document.getElementById("View_Sunday_btn1");
var view_sunday_no = document.getElementById("View_Sunday_btn2");

view_monday_yes.addEventListener("click", function () {
  document.getElementById("View_Monday1_input").value = "Yes";
  document.getElementById("View_Monday_btn1").classList.add("is-link");
  document.getElementById("View_Monday_btn2").classList.remove("is-link");
});

view_monday_no.addEventListener("click", function () {
  document.getElementById("View_Monday1_input").value = "No";
  document.getElementById("View_Monday_btn2").classList.add("is-link");
  document.getElementById("View_Monday_btn1").classList.remove("is-link");
});

view_tuesday_yes.addEventListener("click", function () {
  document.getElementById("View_Tuesday1_input").value = "Yes";
  document.getElementById("View_Tuesday_btn1").classList.add("is-link");
  document.getElementById("View_Tuesday_btn2").classList.remove("is-link");
});
view_tuesday_no.addEventListener("click", function () {
  document.getElementById("View_Tuesday1_input").value = "No";
  document.getElementById("View_Tuesday_btn2").classList.add("is-link");
  document.getElementById("View_Tuesday_btn1").classList.remove("is-link");
});
view_wednesday_yes.addEventListener("click", function () {
  document.getElementById("View_Wednesday1_input").value = "Yes";
  document.getElementById("View_Wednesday_btn1").classList.add("is-link");
  document.getElementById("View_Wednesday_btn2").classList.remove("is-link");
});
view_wednesday_no.addEventListener("click", function () {
  document.getElementById("View_Wednesday1_input").value = "No";
  document.getElementById("View_Wednesday_btn2").classList.add("is-link");
  document.getElementById("View_Wednesday_btn1").classList.remove("is-link");
});
view_thursday_yes.addEventListener("click", function () {
  document.getElementById("View_Thursday1_input").value = "Yes";
  document.getElementById("View_Thursday_btn1").classList.add("is-link");
  document.getElementById("View_Thursday_btn2").classList.remove("is-link");
});
view_thursday_no.addEventListener("click", function () {
  document.getElementById("View_Thursday1_input").value = "No";
  document.getElementById("View_Thursday_btn2").classList.add("is-link");
  document.getElementById("View_Thursday_btn1").classList.remove("is-link");
});
view_friday_yes.addEventListener("click", function () {
  document.getElementById("View_Friday1_input").value = "Yes";
  document.getElementById("View_Friday_btn1").classList.add("is-link");
  document.getElementById("View_Friday_btn2").classList.remove("is-link");
});
view_friday_no.addEventListener("click", function () {
  document.getElementById("View_Friday1_input").value = "No";
  document.getElementById("View_Friday_btn2").classList.add("is-link");
  document.getElementById("View_Friday_btn1").classList.remove("is-link");
});
view_saturday_yes.addEventListener("click", function () {
  document.getElementById("View_Saturday1_input").value = "Yes";
  document.getElementById("View_Saturday_btn1").classList.add("is-link");
  document.getElementById("View_Saturday_btn2").classList.remove("is-link");
});
view_saturday_no.addEventListener("click", function () {
  document.getElementById("View_Saturday1_input").value = "No";
  document.getElementById("View_Saturday_btn2").classList.add("is-link");
  document.getElementById("View_Saturday_btn1").classList.remove("is-link");
});
view_sunday_yes.addEventListener("click", function () {
  document.getElementById("View_Sunday1_input").value = "Yes";
  document.getElementById("View_Sunday_btn1").classList.add("is-link");
  document.getElementById("View_Sunday_btn2").classList.remove("is-link");
});
view_sunday_no.addEventListener("click", function () {
  document.getElementById("View_Sunday1_input").value = "No";
  document.getElementById("View_Sunday_btn2").classList.add("is-link");
  document.getElementById("View_Sunday_btn1").classList.remove("is-link");
});

///Set My Availabilities Fetch

function setMy_Avail(event) {
  hideAlert();
  event.preventDefault();
  document.getElementById("loader").classList.remove("hidden");
  var postFormData = new FormData();
  postFormData.append(event.target[0].name, event.target[0].value);
  postFormData.append(event.target[1].name, event.target[1].value);
  postFormData.append(event.target[2].name, event.target[2].value);
  postFormData.append(event.target[3].name, event.target[3].value);
  postFormData.append(event.target[4].name, event.target[4].value);
  postFormData.append(event.target[5].name, event.target[5].value);
  postFormData.append(event.target[6].name, event.target[6].value);
  fetch(url + "?action=insertMy_Avail", {
    method: "POST",
    body: postFormData,
    credentials: "include",
  }).then(function (headers) {
    document.getElementById("loader").classList.add("hidden");
    if (headers.status === 201) {
      showAlert("success", "Thank You!!! ");
      document.getElementById("ShowInsertguy").classList.add("hidden");
      document.getElementById("ShowUpdate-Viewguy").classList.remove("hidden");
      document.getElementById("loader").classList.add("hidden");
    }
    if (headers.status === 204) {
      showAlert("warning", "Please make sure you have selected all days.");
      document.getElementById("ShowInsertguy").classList.remove("hidden");
      document.getElementById("ShowUpdate-Viewguy").classList.add("hidden");
      document.getElementById("loader").classList.add("hidden");
    }
    if (headers.status === 401) {
      showAlert("warning", "Mmmm somthing has gone wrong");
      document.getElementById("loader").classList.add("hidden");
    }
    if (headers.status === 500) {
      showAlert("error", "Mmmm somthing has gone wrong");
      document.getElementById("loader").classList.add("hidden");
    }
    if (headers.status === 429) {
      showAlert("error", "OK........ stop pushing the submit button");
      document.getElementById("loader").classList.add("hidden");
    }
  });
}

///---- View My Availabilities

function checkMyAvailabilities() {
  viewMyAvail();
}

function viewMyAvail() {
  hideAlert();
  let myJSON;
  // var url = "http://localhost:8888/api/api.php";
  document.getElementById("loader").classList.remove("hidden");
  fetch(url + "?action=viewMyAvail", { credentials: "include" })
    .then(function (response) {
      if (response.status === 202) {
        document
          .getElementById("ShowUpdate-Viewguy")
          .classList.remove("hidden");
        document.getElementById("ShowInsertguy").classList.add("hidden");
        document.getElementById("loader").classList.add("hidden");
        response.json().then((data) => {
          document.getElementById("View_Monday1_input").value = data.Monday;
          document.getElementById("View_Tuesday1_input").value = data.Tuesday;
          document.getElementById("View_Wednesday1_input").value =
            data.Wednesday;
          document.getElementById("View_Thursday1_input").value = data.Thursday;
          document.getElementById("View_Friday1_input").value = data.Friday;
          document.getElementById("View_Saturday1_input").value = data.Saturday;
          document.getElementById("View_Sunday1_input").value = data.Sunday;
          myJSON = data;

          for (let item in myJSON) {
            if (item !== "availabilities_Id" && item !== "Employees_ID") {
              // Do thing with buttons here, ya f***
              if (myJSON["Monday"] === "Yes") {
                document
                  .getElementById("View_Monday_btn1")
                  .classList.add("is-link");
              }
              if (myJSON["Monday"] === "No") {
                document
                  .getElementById("View_Monday_btn2")
                  .classList.add("is-link");
              }
              if (myJSON["Tuesday"] === "Yes") {
                document
                  .getElementById("View_Tuesday_btn1")
                  .classList.add("is-link");
              }
              if (myJSON["Tuesday"] === "No") {
                document
                  .getElementById("View_Tuesday_btn2")
                  .classList.add("is-link");
              }
              if (myJSON["Wednesday"] === "Yes") {
                document
                  .getElementById("View_Wednesday_btn1")
                  .classList.add("is-link");
              }
              if (myJSON["Wednesday"] === "No") {
                document
                  .getElementById("View_Wednesday_btn2")
                  .classList.add("is-link");
              }
              if (myJSON["Thursday"] === "Yes") {
                document
                  .getElementById("View_Thursday_btn1")
                  .classList.add("is-link");
              }
              if (myJSON["Thursday"] === "No") {
                document
                  .getElementById("View_Thursday_btn2")
                  .classList.add("is-link");
              }
              if (myJSON["Friday"] === "Yes") {
                document
                  .getElementById("View_Friday_btn1")
                  .classList.add("is-link");
              }
              if (myJSON["Friday"] === "No") {
                document
                  .getElementById("View_Friday_btn2")
                  .classList.add("is-link");
              }
              if (myJSON["Saturday"] === "Yes") {
                document
                  .getElementById("View_Saturday_btn1")
                  .classList.add("is-link");
              }
              if (myJSON["Saturday"] === "No") {
                document
                  .getElementById("View_Saturday_btn2")
                  .classList.add("is-link");
              }
              if (myJSON["Sunday"] === "Yes") {
                document
                  .getElementById("View_Sunday_btn1")
                  .classList.add("is-link");
              }
              if (myJSON["Sunday"] === "No") {
                document
                  .getElementById("View_Sunday_btn2")
                  .classList.add("is-link");
              }
            }
          }
        });
      }

      if (response.status == 307) {
        document.getElementById("ShowUpdate-Viewguy").classList.add("hidden");
        showAlert("warning", "You gotta put them in first");
        document.getElementById("ShowInsertguy").classList.remove("hidden");
        document.getElementById("loader").classList.add("hidden");
      }
      if (response.status == 401) {
        document.getElementById("ShowUpdate-Viewguy").classList.add("hidden");
        document.getElementById("ShowInsertguy").classList.add("hidden");
        document.getElementById("loader").classList.add("hidden");
      }
    })
    .catch(function (err) {
      console.log(err);
      document.getElementById("loader").classList.add("hidden");
    });
}

function updateMyAvail(evt) {
  evt.preventDefault(evt);
  hideAlert();
  // document.getElementById("loader").classList.remove("hidden");
  var postFormData = new FormData();
  postFormData.append(evt.target[0].name, evt.target[0].value);
  postFormData.append(evt.target[1].name, evt.target[1].value);
  postFormData.append(evt.target[2].name, evt.target[2].value);
  postFormData.append(evt.target[3].name, evt.target[3].value);
  postFormData.append(evt.target[4].name, evt.target[4].value);
  postFormData.append(evt.target[5].name, evt.target[5].value);
  postFormData.append(evt.target[6].name, evt.target[6].value);
  fetch(url + "?action=updateMyAvail", {
    method: "POST",
    body: postFormData,
    credentials: "include",
  }).then(function (headers) {
    document.getElementById("loader").classList.add("hidden");
    if (headers.status === 201) {
      showAlert("success", "You gotta put them in first");
    }
    if (headers.status === 401) {
      showAlert("success", "You gotta put them in first");
    }
  });
  return null;
}

function deleteMyAvailabilities() {
  hideAlert();
  // document.getElementById("loader").classList.remove("hidden");
  // var url = "http://localhost:8888/api/api.php?action=deletemyAvail";
  fetch(url + "?action=deletemyAvail", { credentials: "include" }).then(
    function (response) {
      if (response.status === 200) {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("ShowUpdate-Viewguy").classList.add("hidden");
        document.getElementById("ShowInsertguy").classList.remove("hidden");
        showAlert("success", "You deleted");
      }
      if (response.status === 401) {
        document.getElementById("loader").classList.add("hidden");
        showAlert("Error", "That didn't work");
      }
      if (response.status === 500) {
        document.getElementById("loader").classList.add("hidden");
        showAlert("Error", "That didn't work");
      }
    }
  );
}

///-------------------------------MENU----------------------

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger")
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

//// MENU TARGETS

function toggleVisibility(e) {
  document.getElementById("navHambuger").classList.toggle("is-active");
  document.getElementById("navbarBasicExample").classList.toggle("is-active");
  var pages = Array.from(document.getElementsByClassName("page"));
  pages.forEach(function (element) {
    if (element === document.getElementById(e)) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });
}

//---------------------- View Detials sub page

function toggle_update(x) {
  var tab = document.querySelectorAll(".detail_tab");
  for (var i = 0; i < tab.length; i++) {
    tab[i].classList.add("hidden");
    if (i === x) {
      tab[i].classList.remove("hidden");
    }
  }
}
// Get the container element
var btnContainer = document.getElementById("update_tabs_list");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("update_tabs");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName(" is-active");
    current[0].className = current[0].className.replace("is-active", " ");
    this.className += " is-active";
  });
}

/*Footer & nav*/
end.innerHTML = `
<div class="py-6">
<div class="navbar is-flex is-justify-content-space-evenly is-fixed-bottom" role="navigation">
    <a class="has-text-white navbar-item" onclick="toggleVisibility('menu1')">
    <i class="fas fa-user-clock"></i>
    </a>
    <a class="has-text-white navbar-item" onclick="toggleVisibility('menu2')">
    <i class="fas fa-history"></i>
    </a>
    <a class="has-text-white navbar-item" onclick="toggleVisibility('menu3')">
        <i class="fas fa-user"></i>
    </a>
    <a class="has-text-white navbar-item" onclick="toggleVisibility('menu4')">
        <i class="far fa-calendar-alt"></i>
    </a>
</div>`;
