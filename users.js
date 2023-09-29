let users = [];

const addUser = (userId, socketId) => {
  if (!userId) return
  removeUserByUserId(userId)
  users.push({ userId, socketId });
};

const removeUserBySocketId = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const removeUserByUserId = (userId) => {
  users = users.filter((user) => user.userId !== userId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

module.exports = { addUser, removeUserBySocketId, getUser, users}