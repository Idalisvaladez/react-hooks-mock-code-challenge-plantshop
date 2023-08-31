import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
const [plants, setPlants] = useState([])
const [searchInput, setSearchInput] = useState('')



useEffect(() => {
  fetch('http://localhost:6001/plants')
  .then(res => res.json()) 
  .then(data => setPlants(data))
}, [])


function handleAddPlant(newPlant) {
  setPlants([...plants, newPlant])
}

function onSearchInput(input) {
  setSearchInput(input)
}

const plantsToDisplay = plants.filter((plant) => {
  return plant.name.toLowerCase().includes(searchInput.toLowerCase())
})


function onHandleDelete(plantId) {
  const updatePlants = plants.filter((plant) => plant.id !== plantId)
  setPlants(updatePlants)
}

function onUpdatePrice(updatedPlant) {
  const newPlantList = plants.map((plant) => {
    if (plant.id === updatedPlant.id) {
      return updatedPlant
    } else {
      return plant
    }
  })
  setPlants(newPlantList)
}

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant}/>
      <Search onSearchInput={onSearchInput} searchInput={searchInput}/>
      <PlantList plants={plantsToDisplay} onDelete={onHandleDelete} onUpdatePrice={onUpdatePrice}/>
    </main>
  );
}

export default PlantPage;
