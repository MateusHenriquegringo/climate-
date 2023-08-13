const key = "7bc25f1a96c016c7727af19aca13dbb5";

const UKey = "gYc2PSdRTKuXq0o6rIkSAmX5QQnnltIYxCSEss67uew";

const body = document.querySelector("body");

const button = document.getElementById("button");
const city = document.getElementById("city");
const output = document.getElementById("output");
const spin = document.getElementById("spin");

const fetchClimate = async (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${key}&units=metric`
  );
};

const fetchUnsplash = async (query) => {
  return fetch(
    `https://api.unsplash.com/search/photos?per_page=1&&query=${query.value}&client_id=${UKey}`
  );
};
const submit = async (city) => {
  try {
    const fetchResponse = await fetchClimate(city);
    const data = await fetchResponse.json();
    output.innerHTML = `<div class="bg-zinc-100 rounded-lg p-8">
    
        <h2 class="text-xl font-semibold mb-4">Weather in <span class="text-blue-600">${data.name},${data.sys.country}</span></h2>
    
        <div class="bg-blue-600 text-zinc-100 rounded flex items-center text-4xl font-bold mb-1">${data.main.temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"></div>
        <div class="text-lg font-bold mb-4">feels like ${data.main.feels_like}°C</div>
        <div class="text-base text-gray-600">${data.weather[0].main}, ${data.weather[0].description}
        </div>
        <div class="mt-2">humidity ${data.main.humidity}%</div>
        </div>`;
  } catch (e) {
    output.innerHTML = `<div class="bg-zinc-100 rounded-lg p-8">
        Not Found </div>`;
  }
  try {
    const fetchUResponse = await fetchUnsplash(city);
    const dataU = await fetchUResponse.json();
    body.style.backgroundImage = `url('${dataU.results[0].urls.raw}')`;
    body.style.backgroundSize = `cover`;
    body.style.backgroundRepeat = "no-repeat";
  } catch (e) {
    body.style.backgroundImage = `url('https://www.infoescola.com/wp-content/uploads/2008/04/planeta-terra_585359906.jpg')`;
    body.style.backgroundSize = `cover`;
    body.style.backgroundRepeat = "no-repeat";
  }
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  output.innerHTML = `<div id="spin" class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    </div>`;
  submit(city);
});
