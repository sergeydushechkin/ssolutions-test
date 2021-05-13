const SERVER = `wss://api.exchange.bitcoin.com/api/2/ws`;

interface createFunc {
  (): void;
}

interface ApiInterface {
  create: createFunc;
  socket: WebSocket;
}

const createAPI = (onError: (err: Error) => void) => {
  const socket = new WebSocket("wss://api.exchange.bitcoin.com/api/2/ws");

  socket.onopen = (e) => {
    console.log(`Opened!`);

    socket.send(JSON.stringify(e));
  }

  socket.onerror = () =>
    console.log(`Error!`);

  socket.onmessage = (e) => {
    console.log(e.data);
  }


  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if (err.response && err.response.config.method === `post`) {
      throw err;
    }

    onError(err);

    throw err;
  };

  // api.interceptors.response.use(onSuccess, onFail);

  // return api;
};

export {createAPI};
