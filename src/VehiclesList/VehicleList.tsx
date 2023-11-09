import React from 'react';
import { Vehicle } from './types/Vehicle';
import VehicleItem from './VehicleItem';
import './VehicleList.css';

function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <>
      {vehicles.map((item: Vehicle, index) => (
        <div key={index} className="vehicle-card">
          <VehicleItem item={item} />
        </div>
      ))}
    </>
  );
}

export default VehicleList;
