/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */

const weatherForm = document.querySelector('.location__form');
const search = document.querySelector('.search__field');
const regexpr = new RegExp('^[A-Za-z]+$');

const responseForm = document.querySelector('.response');

const clearSearch = () => (search.value = '');

const createErrorRes = (error) => {
  const { info } = error;
  responseForm.style.visibility = 'visible';
  const markup = `
    <div class="response__fail">
    <p class="error">Error: </p>
    <p class="error">${info}</p>
    </div>
    `;
  clearSearch();
  responseForm.insertAdjacentHTML('beforeend', markup);
};

const createSuccRes = (response) => {
  // eslint-disable-next-line object-curly-newline
  const { place, temperature, icon, description, localTime } = response;

  responseForm.style.visibility = 'visible';
  const markup = `
    <div class="response__succes">
    <img class="image" src="${icon}"></img>
    <p class="place">Place: ${place}</p>
    <p class="temperature">Temperature: ${temperature}</p>
    <p class="description">Current Weather: ${description}</p>
    <p class="localtime">Date and Time:${localTime}</p>
    <div>
    `;
  clearSearch();
  responseForm.insertAdjacentHTML('beforeend', markup);
};

const getResponse = async (city) => {
  try {
    const response = await fetch(`http://localhost:3000/weather/api/${city}`);
    const jsonRes = await response.json();

    if (jsonRes.error) {
      createErrorRes(jsonRes);
    } else {
      createSuccRes(jsonRes);
    }
  } catch (error) {
    console.error(error);
  }
};

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = search.value;

  if (!city || !regexpr.test(city)) {
    alert(`${city}, it is not valid`);
    return;
  }

  responseForm.innerHTML = '';
  getResponse(city);
});
