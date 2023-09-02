let users = [];

const addUser = (userId, socketId) => {
  if (!userId){
    console.log('não inseriu pois veio sem id/wallet')
    return
  }
  removeUserByUserId(userId)
  users.push({ userId, socketId });
  console.log("todos", users);
};

const removeUserBySocketId = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log("todos", users);
};

const removeUserByUserId = (userId) => {
  users = users.filter((user) => user.userId !== userId);
  console.log("todos", users);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

module.exports = { addUser, removeUserBySocketId, getUser, users}