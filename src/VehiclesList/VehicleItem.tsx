import React from 'react';
import { Vehicle } from './types/Vehicle';
import './VehicleItem.css';

function VehicleItem({ item }: { item: Vehicle }) {
  return (
    <>
      <div className="description">
        <div className="card-header">
          <h3>{item.title}</h3>
          <div>{item.type.name}</div>
        </div>

        <div>
          Уровень: <span>{item.level}</span>
        </div>
        <div>
          Страна: <span>{item.nation.title}</span>
        </div>
        <div>{item.description}</div>
      </div>

      <div className="images">
        <img
          className="nation-image"
          src={item.nation.icons.small}
          alt={item.title}
        />
        <img
          className="vehicle-image"
          src={item.icons.large}
          alt={item.title}
        />
      </div>
    </>
  );
}

export default VehicleItem;
