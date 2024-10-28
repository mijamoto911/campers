import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CamperCard from '../../components/CamperCard/CamperCard';
import FilterForm from '../../components/FilterForm/FilterForm';
import { fetchCampers } from '../../redux/campers/campersOperations';
import { resetCampers, appendCampers } from '../../redux/campers/campersSlice';
import css from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.items);
  const loading = useSelector((state) => state.campers.loading);
  const error = useSelector((state) => state.campers.error);
  const page = useSelector((state) => state.campers.page);
  const hasMore = useSelector((state) => state.campers.hasMore);

  const [filters, setFilters] = useState({
    location: '',
    AC: false,
    Kitchen: false,
    Automatic: false,
    TV: false,
    Bathroom: false,
  });
  const [searchStatus, setSearchStatus] = useState(null);

  useEffect(() => {
    setSearchStatus(null);
    dispatch(resetCampers());
    dispatch(fetchCampers({ filters, page: 1 }));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    setSearchStatus(null);
    dispatch(resetCampers());
    const resultAction = await dispatch(fetchCampers({ filters, page: 1 }));

    if (fetchCampers.fulfilled.match(resultAction)) {
      if (resultAction.payload.length === 0) {
        setSearchStatus('No campers found for the given criteria');
      } else {
        setSearchStatus('Search completed successfully');
      }
    } else if (fetchCampers.rejected.match(resultAction)) {
      setSearchStatus('Search failed, please try again');
    }
  };

  const handleLoadMore = async () => {
    const resultAction = await dispatch(
      fetchCampers({ filters, page: page + 1 })
    );
    if (fetchCampers.fulfilled.match(resultAction)) {
      dispatch(appendCampers(resultAction.payload));
    }
  };

  return (
    <div className={css.catalogPageContainer}>
      <div className={css.filtersContainer}>
        <FilterForm
          handleFilterChange={handleFilterChange}
          onSearch={handleSearch}
          filters={filters}
        />
      </div>

      <div className={css.campersContainer}>
        {loading && <p>Loading campers...</p>}
        {error && <p>Error: {error}</p>}
        {searchStatus && !loading && <p>{searchStatus}</p>}

        {!loading &&
          campers.length > 0 &&
          campers.map((camper, index) => (
            <CamperCard key={camper.id || index} camper={camper} />
          ))}

        {!loading && hasMore && campers.length > 0 && (
          <div className={css.loadMoreContainer}>
            <button onClick={handleLoadMore} className={css.loadMoreButton}>
              Load more
            </button>
          </div>
        )}

        {!loading && !hasMore && campers.length === 0 && (
          <p>No campers found.</p>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
