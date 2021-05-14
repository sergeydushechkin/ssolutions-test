const createSocket = (addr, cb) => {
  const socket = new WebSocket(addr);

  socket.onopen = function() {
    console.log(`onopen`);
    cb("onopen");
    socket.send(JSON.stringify({"method": "getSymbols", "id": "555",}));
  };

  socket.onmessage = function(message) {
    const data = JSON.parse(message.data);

    console.log(`onmessage`);
    console.log(data);
    cb(JSON.stringify(data));

    if (data.method === `ticker`) {
      cb(JSON.stringify(data));
    } else if (`id` in data) {
      console.log(`id`);
      socket.send(JSON.stringify({
        method: `subscribeTicker`,
        params: {
          symbol: `BTCUSD`
        },
      }));

      cb(JSON.stringify(data));
    } else {
      console.log(`!id`);
      console.log(data);
      // cb(JSON.stringify(data));
    }
  }

  return {
    close: function() {
      socket.close();
    },

  }
};

export {createSocket};
