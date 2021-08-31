import FormationModal from "./FormationModal";
import Button from "./Button";
import React, { useState } from "react";

export default function FormationContainer({ formation, handleSetFormation }) {
  const [showModal, setShowModal] = useState(false);

  const updateFormation = (_formation) => {
    handleSetFormation(_formation);
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <p className="current-formation" aria-labelledby="formation">
        Current formation: {formation.title}
      </p>
      <img src={formation.image} alt="current formation" />
      <div className="center-align">
        <Button title="CHANGE FORMATION" onClickFunc={() => setShowModal(true)} size="medium" />
      </div>
      <FormationModal
        title="SELECT FORMATION"
        showModal={showModal}
        onClickFunc={updateFormation}
        onCancelFunc={() => setShowModal(false)}
      />
    </React.Fragment>
  );
}
