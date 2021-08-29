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
      <p>Current formation: {formation.title}</p>
      <img src={formation.image} alt="current formation" />

      <Button title="CHANGE FORMATION" onClickFunc={() => setShowModal(true)} />
      <FormationModal
        title="SELECT FORMATION"
        showModal={showModal}
        onClickFunc={updateFormation}
      />
    </React.Fragment>
  );
}
