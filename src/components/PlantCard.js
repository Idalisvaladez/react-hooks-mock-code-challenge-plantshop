import React, {useState} from "react";

function PlantCard({plants, onDelete, onUpdatePrice}) {

  const {name, image, price, id} = plants
  const [isInStock, setIsInStock] = useState(true)
  const [updatedPrice, setUpdatePrice] = useState(price)

  function handleStock() {
    setIsInStock(!isInStock)
  }

  function handlePriceUpdate(event) { //Control the form by having the value derived from state change
    const priceInput= parseFloat(event.target.value)
    setUpdatePrice(priceInput)
  }

  function handlePriceSubmit(event) {
    event.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type' : 'application/json', 
    }, 
      body: JSON.stringify({price : updatedPrice})
    })
    .then(res => res.json())
      .then(updatedPlant => onUpdatePrice(updatedPlant))
  }



  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => onDelete(id))
  }


    return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleStock}>In Stock</button>
      ) : (
        <button onClick={handleStock}>Out of Stock</button>
      )}
      <button onClick={handleDelete} >Delete</button>
      <form onSubmit={handlePriceSubmit}> 
        <input 
          type="number"
          value={updatedPrice}
          onChange={handlePriceUpdate}
          />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
