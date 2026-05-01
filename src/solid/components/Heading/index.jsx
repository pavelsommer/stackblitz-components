import { value, setValue } from "./../../state/Store1";
import TextBox from "./../TextBox";

export default (props) => {
  return (
    <>
      <h1>{value()}</h1>
      <hr />
      <TextBox text={props.text} />
    </>
  );
};
