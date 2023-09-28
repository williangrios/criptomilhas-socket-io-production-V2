let users = [];

const addUser = (userId, socketId) => {
  if (!userId) return
  removeUserByUserId(userId)
  users.push({ userId, socketId });
  // console.log('adicionado add user', users);
};

const removeUserBySocketId = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  // console.log('remove user remove user', users);
};

const removeUserByUserId = (userId) => {
  users = users.filter((user) => user.userId !== userId);
};

const getUser = (userId) => {
  // console.log('todos get user', users);
  return users.find((user) => user.userId === userId);
};

module.exports = { addUser, removeUserBySocketId, getUser, users}