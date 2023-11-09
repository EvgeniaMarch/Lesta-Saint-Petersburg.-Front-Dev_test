import { Vehicle } from './types/Vehicle';
import './Filter.css';

function Filter({
  vehicles,
  onTypeClick,
  onLevelClick,
  onNationClick,
}: {
  vehicles: Vehicle[];
  onTypeClick: (type: string) => void;
  onLevelClick: (level: string) => void;
  onNationClick: (nation: string) => void;
}) {
  const levels = vehicles.map((item: Vehicle) => item.level);
  const levelArr = Array.from(new Set(levels)).sort((a, b) => a - b);

  const types = vehicles.map((item: Vehicle) => item.type.name);
  const typesArr = Array.from(new Set(types));

  const nations = vehicles.map((item: Vehicle) => item.nation.title);
  const nationArr = Array.from(new Set(nations));

  return (
    <div className="filter">
      <div className="select">
        <label htmlFor="level-select">Отфильтровать по уровню</label>
        <select
          name="level"
          id="level-select"
          onChange={(e) => onLevelClick(e.target.value)}
        >
          <option value="all">Все</option>
          {levelArr.map((item: number) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="select">
        <label htmlFor="level-select">Отфильтровать по типу</label>
        <select
          name="level"
          id="level-select"
          onChange={(e) => onTypeClick(e.target.value)}
        >
          <option value="all">Все</option>
          {typesArr.map((item: string) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="select">
        <label htmlFor="level-select">Отфильтровать по стране</label>
        <select
          name="level"
          id="level-select"
          onChange={(e) => onNationClick(e.target.value)}
        >
          <option value="all">Все</option>
          {nationArr.map((item: string) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;
