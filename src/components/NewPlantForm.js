import React, {useState} from "react";

function NewPlantForm({onAddPlant}) {

  const initialObj = {
    name: "",
    image: "",
    price: "",
  }
  const [formData, setFormData] = useState(initialObj)

  function handleFormData(event) {
    const {name, value} = event.target
    setFormData({...formData, [name]: value})
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    fetch("http://localhost:6001/plants", {
      method: 'POST',
      headers: {'Content-Type' : 'application/json',
    }, body: JSON.stringify(formData)
    })
    .then(res => res.json())
      .then(plant => onAddPlant(plant))

    setFormData(initialObj)
  }



  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name" 
          onChange={handleFormData}
          value={formData.name}
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          onChange={handleFormData}
          value={formData.image}
        />
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price" 
          onChange={handleFormData}
          value={formData.price}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
