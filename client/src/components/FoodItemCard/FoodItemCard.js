import React from "react";
import "./FoodItemCard.css"

 function FoodItemCard({category, description, imgUrl, price, title}) {
    return (
        <div className="col-md-4">
            <div className="food-item-card">
                <img src={imgUrl} class="food-item-card-header-img"/>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{price}/-</p>
                <span>{category}</span>
            </div>
        </div>
    )
 }

 export default FoodItemCard