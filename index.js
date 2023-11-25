let cardContainers = document.querySelectorAll(".card-container");
let today = new Date();

cardContainers.forEach((container) => {
  let card = container.querySelector(".card");
  let specialCard = container.querySelector(".special-card");

  card.addEventListener("mouseover", () => {
    specialCard.style.display = "block"; // special-card를 보이게 설정
    card.style.display = "none";
  });

  card.addEventListener("mouseout", () => {
    specialCard.style.display = "none"; // special-card를 숨김
    card.style.display = "block";
  });
});

let year = today.getFullYear();
let month = today.getMonth() + 1; // JavaScript에서 월은 0-11로 표현됨
let day = today.getDate();

let formattedMonth = month < 10 ? `0${month}` : month;
let formattedDay = day < 10 ? `0${day}` : day;

let dateString = `🗓️ ${year}.${formattedMonth}.${formattedDay}`;

document.getElementById("Topdiv").textContent = dateString;

// 사용자의 위치를 얻는 함수
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// 위치 정보를 받았을 때 실행되는 함수
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getCityKakao(latitude, longitude); // 올바른 함수 이름으로 수정
}

// 지오코딩 API를 사용하여 도시 이름을 얻는 함수
function getCityKakao(latitude, longitude) {
  let geocodingAPI =
    "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" +
    longitude +
    "&y=" +
    latitude;
  let headers = {
    Authorization: "KakaoAK a32e4b600b4b34cb0413f2f68b542223",
  };

  fetch(geocodingAPI, { headers: headers })
    .then((response) => response.json())
    .then((data) => {
      var city = data.documents[0].address.region_1depth_name; // 도시 이름 추출
      updateCityName(city);
    })
    .catch((error) => console.log(error));
}

// HTML 요소의 내용을 업데이트하는 함수
function updateCityName(cityName) {
  document.getElementById("location").textContent = cityName;
}

// 오류 처리 함수
function showError(error) {
  // 오류 처리 로직
}

function updateDustLevelStatus() {
  var dustLevel = parseInt(document.getElementById("dustLevel").textContent);
  var dustLevelStatus = document.getElementById("dustLevelStatus");

  if (dustLevel >= 10 && dustLevel <= 30) {
    dustLevelStatus.textContent = "좋음";
    dustLevelStatus.className = "good";
    window.location.href = "https://akns27.github.io/network_backup/"; // 여기를 수정하세요
  } else if (dustLevel >= 31 && dustLevel <= 80) {
    dustLevelStatus.textContent = "보통";
    dustLevelStatus.className = "moderate";
    window.location.href = "https://akns27.github.io/network_backup/"; // 여기를 수정하세요
  } else if (dustLevel >= 81 && dustLevel <= 150) {
    dustLevelStatus.textContent = "나쁨";
    dustLevelStatus.className = "poor";
  } else if (dustLevel >= 161) {
    dustLevelStatus.textContent = "매우 나쁨";
    dustLevelStatus.className = "very-poor";
  }
}

window.onload = function () {
  getLocation();
  updateDustLevelStatus();
};


window.onload = function () {
  getLocation();
  updateDustLevelStatus();
};
