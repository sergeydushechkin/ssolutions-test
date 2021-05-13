import * as React from "react";

interface Props{
  client: WebSocket;
  id: string;
}

const Quote:React.FunctionComponent<Props> = (props: Props) => {
  const {client, id} = props;

  const bidRef = React.useRef(null);
  const askRef = React.useRef(null);
  const highRef = React.useRef(null);
  const lowRef = React.useRef(null);
  const lastRef = React.useRef(null);

  const prevData = React.useRef({bid: 0, ask: 0, high: 0, low: 0, last: 0});
  const socketRef = React.useRef(null);

  React.useEffect(() => {
    socketRef.current = new WebSocket('wss://api.exchange.bitcoin.com/api/2/ws');
    socketRef.current.onopen = () => {
      socketRef.current.send(JSON.stringify({
        method: `subscribeTicker`,
        params: {
          symbol: id
        },
      }));
    }
  });

  React.useEffect(() => {
    socketRef.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.method === `ticker`) {
        const params = data.params;

        askRef.current.textContent = params.ask;
        bidRef.current.textContent = params.bid;
        highRef.current.textContent = params.high;
        lowRef.current.textContent = params.low;

        // setAsk((previous) => {
        //   prevData.current.ask = previous;
        //   console.log(params.ask);
        //   return params.ask;
        // });

        // setBid((previous) => {
        //   prevData.current.bid = previous;
        //   console.log(params.bid);
        //   return params.bid;
        // });

        // setHigh((previous) => {
        //   prevData.current.high = previous;
        //   console.log(params.high);
        //   return params.high;
        // });

        // setLow((previous) => {
        //   prevData.current.low = previous;
        //   console.log(params.low);
        //   return params.low;
        // });
      }
    }
  }, [socketRef, ]);

  const prev = prevData.current;

  return (
    <tr className="quotes__row">
      <td className="quotes__data">{id}</td>
      <td ref={bidRef} className="quotes__data"></td>
      <td ref={askRef} className="quotes__data"></td>
      <td ref={highRef} className="quotes__data"></td>
      <td ref={lowRef} className="quotes__data"></td>
      <td ref={lastRef} className="quotes__data">76319.4</td>
    </tr>
  );
};

export default Quote;
