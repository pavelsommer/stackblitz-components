import { value, setValue } from "./../../state/Store1";

export default (props) => {
  const onInput = (event) => {
    setValue(event.target.value);
  };

  return <input type="text" value={props.text} onInput={onInput} />;
};
