export default function Button({
  title,
  onClickFunc,
  btnFor = "",
  size = "small",
  color = "grey",
}) {
  return (
    <button data-player={btnFor} onClick={onClickFunc} className={`button button-${size} ${color}`}>
      {title}
    </button>
  );
}
