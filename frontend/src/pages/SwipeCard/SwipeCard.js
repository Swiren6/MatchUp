import React, { useState } from "react";
import AdvancedSwipe from "./AdvancedSwipe";
import SimpleSwipe from "./SimpleSwipe";
import Switch from 'react-ios-switch';
import './Switched.css'; // Create this CSS file for styling

function SwipeCard() {
  const [showAdvanced, setShowAdvanced] = useState(true);

  return (
    <div className="switched-container">
      {showAdvanced ? <AdvancedSwipe /> : <SimpleSwipe />}
      
      <div className="toggle-container">
        <div className="toggle-option">
          <p>Show advanced example</p>
          <Switch 
            checked={showAdvanced} 
            onChange={() => setShowAdvanced(!showAdvanced)} 
          />
        </div>
        
        <div className="toggle-option">
          <p>Alternate toggle</p>
          <input
            type="checkbox"
            checked={showAdvanced}
            onChange={() => setShowAdvanced(!showAdvanced)}
          />
        </div>
      </div>
    </div>
  );
}

export default SwipeCard;