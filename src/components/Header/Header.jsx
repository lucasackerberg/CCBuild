import styles from './Header.module.css';

export const Header = () => {
  return (
    <section>
      <img
        className={styles.logo}
        src="logo.webp"
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
