import * as React from "react";

import {ThemeColors} from "../types";

interface Props{
  theme: ThemeColors;
}

const Choice:React.FunctionComponent<Props> = (props: Props) => {
  const {theme} = props;
  return (
    <div className={`options__choice choice${theme === ThemeColors.DARK ? ` choice--dark` : ``}`}>
      <span className="choice__name">Show: </span>
      <ul className="choice__list">
        <li className="choice__item">
          <a className="choice__link choice__link--active" href="">All</a>
        </li>
        <li className="choice__item">
          <a className="choice__link" href="">Top 50</a>
        </li>
      </ul>
    </div>
  );
};

export default Choice;
