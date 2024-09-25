import styles from './Header.module.css';
import logo from '../../../src/assets/logo.webp';

export const Header = () => {
  return (
    <section>
      <img
        className={styles.logo}
        src={logo}
        alt="ccbuild logo"
      />
      <div className={styles.menu}>
        <input
          className={styles.search}
          type="text"
        />
      </div>
    </section>
  );
};
