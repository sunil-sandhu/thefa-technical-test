export default function SavedSquadModal({
  title,
  showModal,
  savedSquads,
  onClickFunc,
  onCancelFunc,
}) {
  return (
    <div className={showModal ? "modal modal-open" : "modal"}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button onClick={onCancelFunc} className="button button-small grey">
            CANCEL
          </button>
        </div>
        <div className="modal-body">
          {savedSquads.length > 0 &&
            savedSquads.map((squad) => (
              <button
                key={squad.date}
                className="button button-small grey"
                onClick={() => onClickFunc(squad)}>
                <p>
                  <span className="bold">{squad.title}</span>: Created on {squad.date}
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
