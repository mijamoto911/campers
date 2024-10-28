import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.heroSection}>
      <div className={css.image}>
        <img src="/img.jpg" alt="img" className={css.fullImage} />
      </div>
      <div className={css.overlayContent}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.text}>
          You can find everything you want in our catalog
        </p>
        <Link to="/catalog">
          <button className={css.btn}>View Now</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
