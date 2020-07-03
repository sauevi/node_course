const socket = io();
/*
 * Elements
 */
const messageForm = document.querySelector('.message_form');
const messageFormInput = document.querySelector('.message_field');
const shareLocationBtn = document.querySelector('.location__btn');
const messagesWrapper = document.querySelector('.chat__messages');
const chatSideBar = document.querySelector('.chat__sidebar');

/*
 * Options
 */
const { username, roomName } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

socket.emit('join', { username, roomName }, (error) => {
  if (error) {
    alert(error.message);
    location.href = '/';
  }
});

const formatTime = (rawTime) => moment(rawTime).format('h:mm a');

/*
 * Recive messages
 */

const autoScroll = () => {
  const newMessage = messagesWrapper.lastElementChild;

  const newMessageStyles = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);

  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  const visibleHeight = messagesWrapper.offsetHeight;

  const contentHeight = messagesWrapper.scrollHeight;

  const scrollOffSet = messagesWrapper.scrollTop + visibleHeight;

  if (contentHeight - newMessageHeight <= scrollOffSet) {
    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
  }
};

socket.on('message', (message) => {
  const { data, user } = message;

  const markUp = `
  <div class="message">
    <p>
      <span class="message__name">${user?.name}</span>
      <span class="message__meta">${formatTime(data?.createdAt)}</span>
    </p>
    <p>${data?.text}</p>
  </div>
  `;

  messagesWrapper.insertAdjacentHTML('beforeend', markUp);
  autoScroll();
});

socket.on('locationMessage', (locationMessage) => {
  const { url, createdAt } = locationMessage;
  const markUp = `
  <div class="message">
    <p>
      <span class="message__name">User name</span>
      <span class="message__meta">${formatTime(createdAt)}</span>
    </p>
    <p><a href="${url}" target="_blank">My current location</a></p>
  </div>
  `;
  messagesWrapper.insertAdjacentHTML('beforeend', markUp);
  autoScroll();
});

/*
 * Room Data
 */

const renderUser = (user) => `<li>${user.name}</li>`;

socket.on('roomdata', (room) => {
  const { name, users } = room;
  const markUp = `
  <h2 class="room-title">${name}</h2>
  <h3 class="list-title">Users</h3>
  <ul class="users">
  ${users.map(renderUser).join('')}
  </ul>
  </div>
  `;

  chatSideBar.innerHTML = markUp;
});

/*
 * Share Location
 */
const toggleShareBtn = (isDisabled) => {
  shareLocationBtn.disabled = isDisabled;
};

const geoSuccess = (position) => {
  const { coords } = position;
  socket.emit(
    'sendLocation',
    {
      latitude: coords.latitude,
      longitude: coords.longitude
    },
    () => {
      toggleShareBtn(false);
    }
  );
};
const geoError = () => {
  alert('Unable to retrieve your location');
};

const getLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }
};

shareLocationBtn.addEventListener('click', () => {
  getLocation();
  toggleShareBtn(true);
});

/*
 * Send messages
 */
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  socket.emit('sendMessage', { text: messageFormInput.value });
  messageFormInput.value = '';
  messageFormInput.focus();
});
