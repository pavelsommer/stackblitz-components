import TextBox from "./../TextBox";

export default (props) => {
  return (
    <>
      <h1>{props.text}</h1>
      <hr />
      <TextBox text={props.text} />
    </>
  );
};
