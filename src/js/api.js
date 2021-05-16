const SYMBOLS_ID = `SYMBOLS_ID`;

const createSocket = (addr, cb) => {
  const socket = new WebSocket(addr);
  let tickersQueue = [];
  let subscribes = [];

  function debugSend(message) {
    console.log(`Invoke send`);
    socket.send(message);
  }

  socket.onopen = function() {
    console.log(`onopen`);
    cb("onopen");
    debugSend(JSON.stringify({method: `getSymbols`, id: SYMBOLS_ID}));
  };

  function subscribe() {
    for(const ticker of tickersQueue) {
      console.log(ticker);
      debugSend(JSON.stringify({method: `subscribeTicker`, params: {symbol: ticker.id}, id: ticker.id}));
      console.log
    }

    console.log(`subscribe complete!`);
    console.log(tickersQueue);
  }

  socket.onmessage = function(message) {
    const data = JSON.parse(message.data);

    console.log(`onmessage`);
    console.log(data);
    cb(JSON.stringify(data));

    if (data.method === `ticker`) {
      cb(JSON.stringify(data));
    } else if (`id` in data) {
      if (data.id ===  SYMBOLS_ID) {
        console.log(`id = ${SYMBOLS_ID}`);
        tickersQueue = data.result.map((it) => {
          return {
            id: it.id,
            pair: `${it.baseCurrency} / ${it.feeCurrency}`
          }
        });
        subscribe();
      } else {
        console.log(`id`);
      }
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
