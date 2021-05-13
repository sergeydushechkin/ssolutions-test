import * as React from "react";

interface Props{
  client: WebSocket;
  id: string;
}

const Quote:React.FunctionComponent<Props> = (props: Props) => {
  const {client, id} = props;

  const [bid, setBid] = React.useState(null);
  const [ask, setAsk] = React.useState(null);
  const [high, setHigh] = React.useState(null);
  const [low, setLow] = React.useState(null);
  const [last, setLast] = React.useState(null);

  const prevData = React.useRef({bid: 0, ask: 0, high: 0, low: 0, last: 0})

  React.useEffect(() => {
    client.send(JSON.stringify({
      method: `subscribeTicker`,
      params: {
        symbol: id
      },
      id: `456`
    }))

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.method === `ticker`) {
        const params = data.params;

        if (params.ask) {
          setAsk((previous) => {
            prevData.current.ask = previous;
            console.log(params.ask);
            return params.ask;
          });
        }
      }
    }
  }, []);

  const prev = prevData.current;

  return (
    <tr className="quotes__row">
      <td className="quotes__data">{id}</td>
      <td className="quotes__data">76319.3</td>
      <td className={`quotes__data${ask > prev.ask ? ` quotes__data--up` : ``}${ask < prev.ask ? ` quotes__data--down` : ``}`}>{ask}</td>
      <td className="quotes__data">94507.9</td>
      <td className="quotes__data">73603.6</td>
      <td className="quotes__data">76319.4</td>
    </tr>
  );
};

export default Quote;
