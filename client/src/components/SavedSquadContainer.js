import { useState } from "react";
import Button from "./Button";
import SavedSquadModal from "./SavedSquadModal";

export default function SavedSquadsContainer({ savedSquads, loadSquad, clearSquad }) {
  const [showModal, setShowModal] = useState(false);

  const handleLoadSquad = (formation) => {
    loadSquad(formation);
    setShowModal(false);
  };

  const handleClearSquad = () => {
    clearSquad();
  };

  return (
    <aside>
      <div className="flex space-between">
        {savedSquads.length > 0 ? (
          <Button title="Saved squads" onClickFunc={() => setShowModal(true)} size="small" />
        ) : (
          <span></span>
        )}
        <Button title="Clear squad" onClickFunc={handleClearSquad} size="small" />
      </div>
      <SavedSquadModal
        title="LOAD SQUAD"
        showModal={showModal}
        onClickFunc={handleLoadSquad}
        onCancelFunc={() => setShowModal(false)}
        savedSquads={savedSquads}
      />
    </aside>
  );
}
