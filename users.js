let users = [];

const addUser = (userId, socketId) => {
  if (!userId){
    console.log('não inseriu')
    return
  }
  if (!users.some((user) => user.userId === userId)) {
    console.log("inseriu", userId);
    users.push({ userId, socketId });
    console.log("todos", users);
  } else {
    console.log("nao inseriu pois já estava dentro", userId);
  }
};

const removeUser = (socketId) => {
  console.log('removeu', socketId);
  console.log("todos", users);
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

module.exports = { addUser, removeUser, getUser, users}