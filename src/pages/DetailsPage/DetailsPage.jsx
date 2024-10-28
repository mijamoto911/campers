import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../redux/campers/campersOperations';
import { useParams } from 'react-router-dom';
import { NavLink, Outlet, Link } from 'react-router-dom';
import css from './DetailsPage.module.css';

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector((state) => state.campers.camperDetails);
  const loading = useSelector((state) => state.campers.loading);
  const error = useSelector((state) => state.campers.error);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!camper) return <p>No camper found!</p>;

  return (
    <div className={css.container}>
      <h3 className={css.detailsTitle}>{camper.name}</h3>
      <div className={css.detailsRatingInfo}>
        <span>⭐ {camper.rating}</span>
        <Link to="reviews" className={css.reviewsLink}>
          (Reviews)
        </Link>
        <p>📍 {camper.location}</p>
      </div>
      <p className={css.detailsPrice}>
        €{camper.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>

      <div className={css.detailsGallery}>
        {camper.gallery.map((image, index) => (
          <img key={index} src={image.thumb} alt={`Gallery ${index + 1}`} />
        ))}
      </div>

      <p className={css.detailsDescription}>{camper.description}</p>

      <ul className={css.wrappersDetails}>
        <li className={css.wrappersDetailsItem}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${css.activeTab} ${css.wrappersDetailsLink}`
                : css.wrappersDetailsLink
            }
            to="features"
          >
            Features
          </NavLink>
        </li>
        <li className={css.wrappersDetailsItem}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${css.activeTab} ${css.wrappersDetailsLink}`
                : css.wrappersDetailsLink
            }
            to="reviews"
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default DetailsPage;
