import React, { useEffect, useState } from 'react';
import VehicleItem from '../VehiclesList/VehicleItem';
import { Vehicle } from '../VehiclesList/types/Vehicle';
import './MainPage.css';
import Filter from '../VehiclesList/Filter';
import VehicleList from '../VehiclesList/VehicleList';

function MainPage(): JSX.Element {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filtered, setFiltered] = useState<Vehicle[]>([]);

  const [level, setLevel] = useState<string>('all');
  const [type, setType] = useState<string>('all');
  const [nation, setNation] = useState<string>('all');
  const url: string = 'https://vortex.korabli.su/api/graphql/glossary/';

  const getAllVehicles = (query: string): Promise<void> => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((res) => {
        setVehicles(res.data.vehicles);
      });
  };

  useEffect(() => {
    getAllVehicles(`
      query {
  
          vehicles {
            title
            description
            icons {
              large
              medium
            }
            level
            type {
              name
              title
              icons {
                default
              }
            }
            nation {
              name
              title
              color
              icons {
                small
                medium
                large
              }
            }
          }
  
      }
      `);
  }, []);

  const onLevelClick = (level: string): void => {
    setLevel(level);
  };

  const onTypeClick = (type: string): void => {
    setType(type);
  };

  const onNationClick = (nation: string): void => {
    setNation(nation);
  };
  const filterVehicles = () => {
    const result = vehicles.filter((item: Vehicle): boolean => {
      const levelFilter = level === 'all' || item.level.toString() === level;
      const typeFilter = type === 'all' || item.type.name === type;
      const nationFilter = nation === 'all' || item.nation.title === nation;

      return levelFilter && typeFilter && nationFilter;
    });
    setFiltered(result);
  };

  useEffect(() => {
    filterVehicles();
  }, [level, type, nation]);

  return (
    <>
      {vehicles.length ? (
        <div className="main-container">
          <Filter
            vehicles={vehicles}
            onLevelClick={onLevelClick}
            onNationClick={onNationClick}
            onTypeClick={onTypeClick}
          />

          <div className="container">
            {filtered.length ? (
              filtered.map((item: Vehicle, index) => (
                <div key={index} className="vehicle-card">
                  <VehicleItem item={item} />
                </div>
              ))
            ) : (
              <>
                {!(nation === 'all' && type === 'all' && level === 'all') ? (
                  <div className="no-filtered-vehicles">
                    По заданным параметрам ничего не найдено
                  </div>
                ) : (
                  <VehicleList vehicles={vehicles} />
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="loading">
          <div>Идет загрузка</div>
        </div>
      )}
    </>
  );
}

export default MainPage;
