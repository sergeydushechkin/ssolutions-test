import * as React from "react";

import {ThemeColors} from "../types";

import Choice from "../components/choice";

interface Props{
  theme: ThemeColors;
  onThemeChange: (ThemeColors) => void;
}

const Options:React.FunctionComponent<Props> = (props: Props) => {
  const {theme, onThemeChange} = props;
  const selectRef = React.useRef(null);

  return (
    <ul className={`main-page__options options${theme === ThemeColors.DARK ? ` options--dark` : ``}`}>
      <li className="options__item">
        <label className="options__label" htmlFor="theme-select">Choose theme: </label>
        <select ref={selectRef} onChange={() => {onThemeChange(selectRef.current.value)}} className="options__select" name="theme" id="theme-select">
          <option value={ThemeColors.LIGHT}>Light</option>
          <option value={ThemeColors.DARK}>Dark</option>
        </select>
      </li>
      <li className="options__item">
        <Choice theme={theme}/>
      </li>
    </ul>
  );
};

export default Options;
