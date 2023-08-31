import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onDelete, onUpdatePrice}) {

  const renderPlants = plants.map((plant) => {
    return <PlantCard key={plant.id} plants={plant} onDelete={onDelete} onUpdatePrice={onUpdatePrice}/>
  })

  return (
    <ul className="cards">{renderPlants}</ul>
  );
}

export default PlantList;
