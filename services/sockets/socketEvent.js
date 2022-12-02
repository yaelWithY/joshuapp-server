const userService = require("../../src/services/userService");

events = (socket) => {
  
    console.log({ Clientsocket: socket.id });
    socket.emit("new_user", socket.id);

    //Update acolyte values
    socket.on('update_acolyte_values', async data => {
      try {
        console.log(`EMAIL: ${data.email}`)
        const updatedUser = await userService.updateOneUser(data.email, data.body);
        console.log(`UPDATED: ${updatedUser}`)
        socket.broadcast.emit('update_acolyte_values', updatedUser);
      } catch (error) {
        console.log(error);
        socket.emit('update_acolyte_valuesError', error);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected: ', socket.id);      
    });
  
}
  
exports.socketEvents = events;