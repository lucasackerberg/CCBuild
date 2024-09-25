import styles from './Header.module.css';
import logo from '../../../src/assets/logo.webp';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <section>
      <Link to={'/dashboard'}>
        <img
          className={styles.logo}
          src={logo}
          alt="ccbuild logo"
        />
      </Link>
      <div className={styles.menu}>
        <input
          className={styles.search}
          type="text"
        />
      </div>
    </section>
  );
};
