import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import logo from '../../assets/logo.png';

const generateClassName = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};
const Navigation = () => {
  return (
    <div className={css.navigationWrapper}>
      <nav className={css.navigation}>
        <NavLink to="/" className={css.logoLink}>
          <img src={logo} alt="Logo" className={css.logo} />
        </NavLink>
        <div className={css.centerLinks}>
          <NavLink className={generateClassName} to="/" end>
            Home
          </NavLink>
          <NavLink className={generateClassName} to="/catalog" end>
            Catalog
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
export default Navigation;
