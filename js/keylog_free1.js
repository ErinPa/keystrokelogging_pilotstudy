// Author: Taylor Arnold (tarnold2@richmond.edu)
// Date: 2022-02-22

// Create a global variable that stores all of the output data; initialize it
// with the header row fror a CSV file
var startRecord = {
  'e': 's',
  'language': navigator.language,
  'useragent': navigator.userAgent,
  'starttime':  Date.now()
};
var dset = [startRecord];
var delay = 1000;
var next_saved = delay;
ibox = document.getElementById('lname');
ibox.value = '';

// Add a record when a key is pressed when focused on the textbox element.
ibox.addEventListener('keydown', (res) => {
  var nline = {
    't': res.timeStamp,
    'e': 'd',
    'k': res.key,
    'c': res.code,
    'ss': res.target.selectionStart,
    'se': res.target.selectionEnd
  };

  if (res.altKey) { nline.ak = true; }
  if (res.ctrlKey) { nline.ck = true; }
  if (res.metaKey) { nline.mk = true; }
  if (res.shiftKey) { nline.sk = true; }
  if (res.repeat) { nline.r = true; }

  dset.push(nline);
});

// Add a record when a key is released when focused on the textbox element.
ibox.addEventListener('keyup', (res) => {
  var nline = {
    't': res.timeStamp,
    'e': 'u',
    'k': res.key,
    'c': res.code,
    'ss': res.target.selectionStart,
    'se': res.target.selectionEnd
  };

  if (res.altKey) { nline.ak = true; }
  if (res.ctrlKey) { nline.ck = true; }
  if (res.metaKey) { nline.mk = true; }
  if (res.shiftKey) { nline.sk = true; }
  if (res.repeat) { nline.r = true; }

  dset.push(nline);
});

// Add a record when the mouse is clicked in the textbox element.
ibox.addEventListener('click', (res) => {
  var nline = {
    't': res.timeStamp,
    'e': 'm',
    'ss': res.target.selectionStart,
    'se': res.target.selectionEnd
  };

  if (res.altKey) { nline.ak = true; }
  if (res.ctrlKey) { nline.ck = true; }
  if (res.metaKey) { nline.mk = true; }
  if (res.shiftKey) { nline.sk = true; }
  if (res.repeat) { nline.r = true; }

  dset.push(nline);
});

// Add a record when there is an input.
ibox.addEventListener('input', (res) => {
  var nline = {
    't': res.timeStamp,
    'e': 'i',
    'v':  ( res.data || "" ),
    'ss': res.target.selectionStart,
    'se': res.target.selectionEnd
  };

  // If it has been a while, store the current text as well:
  if (res.timeStamp > next_saved)
  {
    next_saved = res.timeStamp + delay;
    dset.push({
      't': res.timeStamp,
      'e': 'c',
      'v': ibox.value
    });
  }

  dset.push(nline);
});

// Download the current dataset from the DOM as a JSON file
downloadLink = document.getElementById("downloadAnchorElem");
downloadLink.addEventListener('click', (res) => {
  // add one last record of the full final text
  dset.push({
    't': res.timeStamp,
    'e': 'c',
    'v': ibox.value
  });

  // collapse records to a string
  var dataStr = "data:application/json;charset=utf-8," +
                encodeURIComponent(JSON.stringify(dset));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');


  //Handle unique identifier
  let user = checkCookie();
  // Copy the records into the DOM
  let today = Date.now();
  downloadLink.setAttribute("href", dataStr);
  downloadLink.setAttribute("download", "keylogs-"+ user+ "_"+ today +"_free1" + ".json");
});




function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("typing_experiment_unique_id");
  if (user != "") {
    // alert("Welcome again " + user);
    console.log(user);
    return user;
  } else {
    // alert("New user created " + user);
    random_id = Math.random()
    var things = ['Rock', 'Paper', 'Scissor', 'Water', 'Earth','Cookie','Bear','Bird','Cat','Dog','Music','River','Beach','Clock','Minute','Fish','Wave',"Coffee",'Tea','Screen','Bottle','Mouse','Lamp','Table','Piano','Guitar','Note','Pencil','Sweater','Baseball','Hat'];
    var thing = things[Math.floor(random_id*things.length)];

    var numbers = ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35']
    var number = numbers[Math.floor(random_id*numbers.length)];
    user = thing+number;
    console.log("creating user");
    console.log(user);
    setCookie("typing_experiment_unique_id", user, 10);//set for 10 days

    return user;
  }
}

