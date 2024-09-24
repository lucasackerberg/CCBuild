import { useFormContext } from 'react-hook-form';
import styles from './Marketplace.module.css';
import { Button, FormCheck } from 'react-bootstrap';

const Marketplace = () => {
  const { register } = useFormContext();

  return (
    <div>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Egenskaper</h2>
        <p className={styles.formSubtitle}>
          Obligatoriska fält är markerade med stjärna (*)
        </p>
      </div>
      <div>
        <label
          htmlFor="comment"
          className={styles.label}
        >
          Kommentar
        </label>
        <textarea
          name="comment"
          {...register('comment')}
          placeholder="..."
        ></textarea>
        <label
          htmlFor="price"
          className={styles.label}
        >
          Uppskattat externt pris
        </label>
        <p className={styles.formSubtitle}>Försäljningspris (ex moms)</p>
        <input
          placeholder="899:-"
          name="price"
          disabled
        ></input>
        <Button>Ändra pris</Button>
        <div>
          <FormCheck name="checkboxPrice" />
          <label
            className={styles.label}
            htmlFor="checkboxPrice"
          >
            Låt köparen stå för pris
          </label>
        </div>
        <div>
          <div>
            <FormCheck name="send_option" />
            <label
              className={styles.label}
              htmlFor="send_option"
            >
              Kan skickas med frakt
            </label>
          </div>
          <div>
            <FormCheck name="pickup_option" />
            <label
              className={styles.label}
              htmlFor="pickup_option"
            >
              Kan hämtas på plats
            </label>
          </div>
        </div>
        <div>
          <label
            className={styles.label}
            htmlFor="address"
          >
            Adress
          </label>
          <input
            type="text"
            placeholder="Lärdomsgatan 3"
            {...register('address')}
            className={styles.input}
          />{' '}
          <label
            className={styles.label}
            htmlFor="postal_code"
          >
            Postkod
          </label>
          <input
            placeholder="400 12"
            type="text"
            {...register('postal_code')}
            className={styles.input}
          />{' '}
          <label
            className={styles.label}
            htmlFor="city"
          >
            Ort
          </label>
          <input
            placeholder="Göteborg"
            type="text"
            {...register('city')}
            className={styles.input}
          />{' '}
        </div>
        <div>
          <label
            htmlFor="contact_person"
            className={styles.label}
          >
            Kontaktperson
          </label>
          <select
            name="contact_person"
            {...register('contact_person')}
            className={styles.formSelect}
          >
            <option value="">JAG</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
