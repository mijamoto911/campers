import css from './FilterForm.module.css';
import ACIcon from '../../assets/wind.svg';
import AutomaticIcon from '../../assets/diagram.svg';
import KitchenIcon from '../../assets/cup-hot.svg';
import TVIcon from '../../assets/tv.svg';
import BathroomIcon from '../../assets/phshower.svg';
import MapIcon from '../../assets/map.svg';
import VanIcon from '../../assets/van.svg';
import FullyIcon from '../../assets/fully.svg';
import AlcoveIcon from '../../assets/alcove.svg';
import RefrigeratorIcon from '../../assets/solarfridge.svg';

const FilterForm = ({ handleFilterChange, onSearch, filters }) => {
  return (
    <div className={css.filterContainer}>
      <h3 className={css.title}>Location</h3>
      <div className={css.inputContainer}>
        <img src={MapIcon} alt="Location" className={css.iconLocation} />
        <input
          type="text"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          placeholder="Kyiv, Ukraine"
          className={css.input}
        />
      </div>
      <h3 className={css.title}>Filters</h3>

      <h3 className={css.vehicleTitle}>Vehicle equipment</h3>
      <div className={css.buttonsContainer}>
        <button
          className={`${css.button} ${filters.AC ? css.active : ''}`}
          onClick={() => handleFilterChange('AC', !filters.AC)}
        >
          <img src={ACIcon} alt="AC" />
          AC
        </button>
        <button
          className={`${css.button} ${filters.Automatic ? css.active : ''}`}
          onClick={() => handleFilterChange('Automatic', !filters.Automatic)}
        >
          <img src={AutomaticIcon} alt="Automatic" />
          Automatic
        </button>
        <button
          className={`${css.button} ${filters.Kitchen ? css.active : ''}`}
          onClick={() => handleFilterChange('Kitchen', !filters.Kitchen)}
        >
          <img src={KitchenIcon} alt="Kitchen" />
          Kitchen
        </button>
        <button
          className={`${css.button} ${filters.TV ? css.active : ''}`}
          onClick={() => handleFilterChange('TV', !filters.TV)}
        >
          <img src={TVIcon} alt="TV" />
          TV
        </button>
        <button
          className={`${css.button} ${filters.Bathroom ? css.active : ''}`}
          onClick={() => handleFilterChange('Bathroom', !filters.Bathroom)}
        >
          <img src={BathroomIcon} alt="Bathroom" />
          Bathroom
        </button>
        <button
          className={`${css.button} ${filters.Refrigerator ? css.active : ''}`}
          onClick={() =>
            handleFilterChange('Refrigerator', !filters.Refrigerator)
          }
        >
          <img src={RefrigeratorIcon} alt="Refrigerator" />
          Refrigerator
        </button>
      </div>

      <h3 className={css.vehicleTitle}>Vehicle type</h3>
      <div className={css.buttonsContainer}>
        <button
          className={`${css.button} ${filters.Van ? css.active : ''}`}
          onClick={() => handleFilterChange('Van', !filters.Van)}
        >
          <img src={VanIcon} alt="Van" />
          Van
        </button>
        <button
          className={`${css.button} ${
            filters.FullyIntegrated ? css.active : ''
          }`}
          onClick={() =>
            handleFilterChange('FullyIntegrated', !filters.FullyIntegrated)
          }
        >
          <img src={FullyIcon} alt="Fully Integrated" />
          Fully Integrated
        </button>
        <button
          className={`${css.button} ${filters.Alcove ? css.active : ''}`}
          onClick={() => handleFilterChange('Alcove', !filters.Alcove)}
        >
          <img src={AlcoveIcon} alt="Alcove" />
          Alcove
        </button>
      </div>

      <button className={css.searchBtn} onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default FilterForm;
