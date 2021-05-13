import * as React from "react";

import {ThemeColors} from "../types";

import Options from "../components/options";
import Quotes from "../components/quotes";

const App:React.FunctionComponent = () => {
  const [theme, setTheme] = React.useState(ThemeColors.LIGHT);

  React.useEffect(() => {
    document.body.style.backgroundColor = theme === ThemeColors.DARK ? `#000000` : `#ffffff`;
  }, [theme]);

  React.useEffect(() => {
    console.log(`create`)

    return () => {
      console.log(`delete`)
    }
  }, [])

  return (
    <main className={`main-page${theme === ThemeColors.DARK ? ` main-page--dark` : ``}`}>
      <h1 className="main-page__header">Exchange Quotes</h1>

      <Options theme={theme} onThemeChange={setTheme}/>

      <Quotes theme={theme}/>

    </main>
  );
};

export default App;
