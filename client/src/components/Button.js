export default function Button({ title, onClickFunc, btnFor = "" }) {
  return (
    <button data-player={btnFor} onClick={onClickFunc}>
      {title}
    </button>
  );
}
