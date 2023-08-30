let users = [];

const addUser = (userId, socketId) => {
  if (!userId){
    console.log('não inseriu')
    return
  }
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
    console.log("inseriu", userId);
  } else {
    console.log("nao inseriu pois já estava dentro");
  }
};

const removeUser = (socketId) => {
  console.log('removeu', socketId);
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log('pegou', userId);
  return users.find((user) => user.userId === userId);
};

module.exports = { addUser, removeUser, getUser, users}