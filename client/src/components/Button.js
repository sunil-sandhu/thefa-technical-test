export default function Button({ title, onClickFunc }) {
  return <button onClick={onClickFunc}>{title}</button>;
}
