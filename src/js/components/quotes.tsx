import * as React from "react";
import {ThemeColors} from "../types";
import {createSocket} from "../api";

import Quote from "./quote";

interface Props{
  theme: ThemeColors;
}

// const client = new WebSocket('wss://api.exchange.bitcoin.com/api/2/ws');

const Quotes:React.FunctionComponent<Props> = (props: Props) => {
  const {theme} = props;
  const [symbols, setSymbols] = React.useState(null);
  const [digit, setDigit] = React.useState(0);

  React.useEffect(() => {
    createSocket(`wss://api.exchange.bitcoin.com/api/2/ws`, setDigit);

    // client.onopen = () => {
    //   console.log(`open`);

    //   client.send(JSON.stringify({"method": "getSymbols", "id": "123",}));
    // }

    // client.onmessage = (message) => {
    //   console.log(`message`);

    //   const data = JSON.parse(message.data);
    //   if (data.id === "123") {
    //     const tickers = data.result.map((it) => {
    //       return it.id;
    //     });
    //     setSymbols(tickers);
    //   }
    // }

  }, [])

  return (
    <table className={`main-page__quotes quotes${theme === ThemeColors.DARK ? ` quotes--dark` : ``}`}>
      <thead className="quotes__section quotes__section--head">
        <tr className="quotes__row quotes__row--headers">
          <th className="quotes__header"><span className="quotes__header-name">Ticker</span></th>
          <th className="quotes__header"><span className="quotes__header-name">Bid</span></th>
          <th className="quotes__header"><span className="quotes__header-name">Ask</span></th>
          <th className="quotes__header"><span className="quotes__header-name">High</span></th>
          <th className="quotes__header"><span className="quotes__header-name">Low</span></th>
          <th className="quotes__header"><span className="quotes__header-name quotes__header-name--sort-asc">Last</span></th>
        </tr>
      </thead>
      <tbody className="quotes__section">
        <tr><td>{digit}</td></tr>
        {/* {symbols ? <Quote client={client} id={symbols[0]} /> : null} */}
        {/* {symbols ? symbols.map((it) => {
             return <Quote key={it} client={client} id={it}/>
           })
         : null
        } */}
      </tbody>
    </table>
  );
};

export default Quotes;
