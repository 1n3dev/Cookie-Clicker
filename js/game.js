var cookies = 0;
var cursors = 0;
var farms = 0;

window.onload = function (e) {
  load();
  update();
};

window.onbeforeunload = function (e) {
  save();
};

function add() {
  cookies = cookies + 1;
  update();
}

function buyCursor() {
  if (cookies >= (cursors + 1) * 12) {
    cookies = cookies - ((cursors+1) * 12);
    cursors = cursors + 1;
    update();
  }
}
function buyFarm() {
  if (cookies >= (farms + 1) * 15) {
    cookies = cookies - ((farms + 1) * 15);
    farms = farms + 1;
    update();
  }

}

function cursorTimer() {
  cookies = cookies + cursors + (farms * 2);
  update();
}

setInterval(cursorTimer, 5000);

function update() {
  document.getElementById('cookiestext').innerHTML = "У вас есть <span id=\"cookies\">" + cookies + "</span> " + declOfNum(cookies, ["печенька.", "печеньки.", "печенек."]);
  document.getElementById('cursors').innerHTML = "У вас есть " + cursors + " " + declOfNum(cursors, ["курсор.", "курсора.", "курсоров."]);
  document.getElementById('cursor-cost').innerHTML = "Стоймость курсора: " + ((cursors + 1) * 12) + " " + declOfNum(((cursors + 1) * 12), ["печенька.", "печеньки.", "печенек."]);
  document.getElementById('farms').innerHTML = "У вас есть " + farms + " " + declOfNum(cursors, ["ферма.", "фермы.", "ферм."]);
  document.getElementById('farm-cost').innerHTML = "Стоймость фермы: " + ((farms + 1) * 15) + " " + declOfNum(((farms + 1) * 15), ["печенька.", "печеньки.", "печенек."]);
}


function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function save() {
  localStorage.setItem("cookies", cookies);
  localStorage.setItem("cursors", cursors);
  localStorage.setItem("farms", farms);
}

function load() {
  if(localStorage.getItem("cookies") == null) {
    cookies = 0;
    if (localStorage.getItem("cursors") == null) {
      cursors = 0;
    }
    if (localStorage.getItem("farms") == null) {
      farms = 0;
    }
    update();
  } else {
    cookies = parseInt(localStorage.getItem("cookies"));
    cursors = parseInt(localStorage.getItem("cursors"));
    farms = parseInt(localStorage.getItem("farms"))
    update();
  }
}
