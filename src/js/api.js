const SYMBOLS_ID = `SYMBOLS_ID`;

const createSocket = (addr, cb) => {
  const socket = new WebSocket(addr);
  let tickersQueue = {};
  let subscribes = [];
  let lastIndex = 0;

  function debugSend(message) {
    console.log(`Invoke send`);
    socket.send(message);
  }

  socket.onopen = function() {
    console.log(`onopen`);
    // cb("onopen");
    debugSend(JSON.stringify({method: `getSymbols`, id: SYMBOLS_ID}));
  };

  function subscribe() {
    for (const ticker in tickersQueue) {
      debugSend(JSON.stringify({method: `subscribeTicker`, params: {symbol: ticker}, id: ticker}));
    }
    // debugSend(JSON.stringify({method: `subscribeTicker`, params: {symbol: `HEDGBCH`/*ticker*/}, id: `HEDGBCH`/*ticker*/}));
    // debugSend(JSON.stringify({method: `subscribeTicker`, params: {symbol: `EOSETH`/*ticker*/}, id: `EOSETH`/*ticker*/}));
    console.log(`subscribe complete!`);
  }

  socket.onmessage = function(message) {
    const data = JSON.parse(message.data);

    // console.log(`onmessage`);
    // console.log(data);
    // cb(JSON.stringify(data));

    if (data.method === `ticker`) {
      // console.log(`subscribes=`);
      // console.log(subscribes);
      let index = tickersQueue[data.params.symbol].index;
      subscribes = [].concat(...subscribes.slice(0, index), Object.assign(subscribes[tickersQueue[data.params.symbol].index], data.params), ...subscribes.slice(index + 1, subscribes.length));
      // subscribes[tickersQueue[data.params.symbol].index] = Object.assign(subscribes[tickersQueue[data.params.symbol].index], data.params);
      // console.log(`subscribes2=`);
      // console.log(`subscribes`);
      cb(subscribes);
    } else if (`id` in data) {
      if (data.id ===  SYMBOLS_ID) {
        // console.log(`id = ${SYMBOLS_ID}`);
        tickersQueue = data.result.reduce((obj, it) => {
          return Object.assign(obj, {[it.id]: {symbol: it.id, pair: `${it.baseCurrency} / ${it.feeCurrency}`, index: null}});
        }, {});
        // console.log(tickersQueue);
        subscribe();
      } else {
        // console.log(`id=${data.id}`);
        tickersQueue[data.id].index = lastIndex++;
        subscribes.push(tickersQueue[data.id]);
        // console.log(`tickersQueue=`);
        // console.log(tickersQueue);
        // console.log(`subscribes=`);
        // console.log(subscribes);
      }
      // cb(JSON.stringify(data));
    } else {
      // console.log(`!id`);
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
