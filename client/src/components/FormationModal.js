import { formations } from "../options/formations";

export default function FormationModal(props) {
  return (
    <div className={props.showModal ? "modal modal-open" : "modal"}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">
          {formations.map((formation) => (
            <button
              key={formation.title}
              className="formation"
              onClick={() => props.onClickFunc(formation)}>
              <p>{formation.title}</p>
              <img src={formation.image} alt={formation.title} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
