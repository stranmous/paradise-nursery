import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  { category: "Air Purifying", name: "Snake Plant", image: "/snake.jpg", price: 15 },
  { category: "Air Purifying", name: "Spider Plant", image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=400", price: 12 },
  { category: "Low Light", name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=400", price: 18 },
  { category: "Low Light", name: "Pothos", image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?q=80&w=400", price: 10 },
  { category: "Pet Friendly", name: "Boston Fern", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=400", price: 14 },
  { category: "Pet Friendly", name: "Parlor Palm", image: "/palm.jpg", price: 20 }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const categories = [...new Set(plantsArray.map(plant => plant.category))];

  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <a href="#" onClick={handlePlantsClick}>Plants</a>
        </div>
        <div className="cart-icon">
          <a href="#" onClick={handleCartClick}>
            <span>🛒 Cart ({totalItems})</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <div className="product-list">
          {categories.map((category, index) => (
            <div key={index}>
              <h2>{category}</h2>
              <div className="plant-grid">
                {plantsArray.filter(plant => plant.category === category).map((plant, idx) => {
                  const isAdded = cartItems.some(item => item.name === plant.name);
                  return (
                    <div key={idx} className="plant-card">
                      <img src={plant.image} alt={plant.name} width="150" />
                      <h3>{plant.name}</h3>
                      <p>${plant.price}</p>
                      <button
                        onClick={() => handleAddToCart(plant)}
                        disabled={isAdded}
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;