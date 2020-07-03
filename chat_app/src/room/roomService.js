/* eslint-disable implicit-arrow-linebreak */
const rooms = [];

const saveRoom = (room) => {
  const foundRoom = rooms.find(
    (element) => element.getName() === room.getName()
  );
  if (!foundRoom) {
    rooms.push(room);
  }
};

const getRoomByName = (roomName) =>
  rooms.find((room) => room.getName() === roomName);

const getAllRooms = () => rooms;

// eslint-disable-next-line import/no-commonjs
module.exports = {
  saveRoom,
  getAllRooms,
  getRoomByName
};
