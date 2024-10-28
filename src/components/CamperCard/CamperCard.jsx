import css from './CamperCard.module.css';
import { useNavigate, Link } from 'react-router-dom';
import ACIcon from '../../assets/wind.svg';
import AutomaticIcon from '../../assets/diagram.svg';
import KitchenIcon from '../../assets/cup-hot.svg';
import PetrolIcon from '../../assets/fuelpump.svg';
import HeartIcon from '../../assets/heart.svg';
import MapIcon from '../../assets/map.svg';

const CamperCard = ({ camper }) => {
  const navigate = useNavigate();
  const imageUrl =
    camper.gallery && camper.gallery[0]
      ? camper.gallery[0].thumb
      : 'default-image.jpg';

  const handleShowMore = () => {
    navigate(`/catalog/${camper.id}`);
  };

  const truncatedDescription =
    camper.description && camper.description.length > 100
      ? camper.description.slice(0, 100) + '...'
      : camper.description;

  return (
    <div className={css.camperCard}>
      <img
        src={imageUrl}
        alt={camper.name || 'Camper Image'}
        className={css.camperImage}
      />
      <div className={css.camperCardContent}>
        <div className={css.camperHeader}>
          <h3 className={css.camperTitle}>
            {camper.name || 'No name available'}
          </h3>
          <div className={css.priceContainer}>
            <span className={css.camperPrice}>
              {camper.price
                ? camper.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'EUR',
                  })
                : '€0.00'}
            </span>

            <img src={HeartIcon} alt="Favorite" className={css.heartIcon} />
          </div>
        </div>
        <div className={css.camperInfo}>
          <span>⭐ {camper.rating}</span>
          <Link to="reviews/reviews" className={css.reviewsLink}>
            (Reviews)
          </Link>
          <span className={css.camperLocation}>
            <img src={MapIcon} alt="Location" className={css.icon} />
            <span className={css.locationText}>
              {camper.location || 'Location not available'}
            </span>
          </span>
        </div>
        <p className={css.camperDescription}>
          {truncatedDescription || 'No description available'}
        </p>
        <div className={css.camperFeatures}>
          <span className={css.camperFeature}>
            <img src={AutomaticIcon} alt="Automatic" className={css.icon} />
            {camper.transmission || 'Unknown transmission'}
          </span>
          <span className={css.camperFeature}>
            <img src={PetrolIcon} alt="Petrol" className={css.icon} />
            {camper.engine || 'Unknown engine'}
          </span>
          <span className={css.camperFeature}>
            <img src={KitchenIcon} alt="Kitchen" className={css.icon} />
            {camper.kitchen || 'Kitchen'}
          </span>
          <span className={css.camperFeature}>
            <img src={ACIcon} alt="AC" className={css.icon} />
            {camper.AC ? 'AC' : 'No AC'}
          </span>
        </div>

        <button className={css.showMoreButton} onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
