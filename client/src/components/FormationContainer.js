import FormationModal from "./FormationModal";
import Button from "./Button";
import React, { useState } from "react";

export default function FormationContainer({ formation, handleSetCurrentFormation }) {
  const [showModal, setShowModal] = useState(false);

  const updateFormation = (formation) => {
    handleSetCurrentFormation(formation);
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <p className="current-formation">Current formation: {formation.title}</p>
      <img src={formation.image} alt="current formation" />
      <div className="center-align">
        <Button title="CHANGE FORMATION" onClickFunc={() => setShowModal(true)} />
      </div>
      <FormationModal
        title="SELECT FORMATION"
        showModal={showModal}
        onClickFunc={updateFormation}
      />
    </React.Fragment>
  );
}
