import { useFormContext } from 'react-hook-form';
import styles from './Marketplace.module.css';
import { Button, FormCheck } from 'react-bootstrap';
import { StepperDiv } from '../common/StepperDiv/StepperDiv';
import { Input } from '../common/FormInput/Input';
import { pricebtn } from '../StepperForm/StepperForm.module.css';

const Marketplace = () => {
  const { register } = useFormContext();

  return (
    <div>
      <StepperDiv heading={'Hantering för marknadsplats'}></StepperDiv>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label
            htmlFor="comment"
            className={styles.label}
          >
            Kommentar
          </label>
          <textarea
            className={styles.select}
            name="comment"
            {...register('comment')}
            placeholder="..."
          ></textarea>
        </div>
        <div className={styles.formGroupPrice}>
          <div>
            <label
              htmlFor="price"
              className={styles.label}
            >
              Uppskattat externt pris
            </label>

            <p className={styles.formSubtitle}>Försäljningspris (ex moms)</p>
            <div className={styles.priceButton}>
              <input
                placeholder="899:-"
                name="price"
                className={styles.input}
                disabled
              ></input>
              <Button
                className={styles.pricebtn}
                size="sm"
              >
                Ändra pris
              </Button>
            </div>
          </div>
          <div
            className={styles.formGroup}
            id={styles.alignCheckbox}
          >
            <div className={styles.priceButton}>
              <FormCheck name="checkboxPrice" />
              <label
                className={styles.label}
                htmlFor="checkboxPrice"
              >
                Låt köparen stå för pris
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <div className={styles.priceButton}>
            <FormCheck name="send_option" />
            <label
              className={styles.label}
              htmlFor="send_option"
            >
              Kan skickas med frakt
            </label>
          </div>
          <div className={styles.priceButton}>
            <FormCheck name="pickup_option" />
            <label
              className={styles.label}
              htmlFor="pickup_option"
            >
              Kan hämtas på plats
            </label>
          </div>
        </div>
      </div>
      <div className={styles.formRow}>
        <Input
          htmlFor="address"
          label="Adress"
          type="text"
          placeholder="Lärdomsgatan 3"
          register={register}
        />
        {/* <div className={styles.formGroup}>
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
          </div> */}
        <Input
          htmlFor="postal_code"
          label="Postkod"
          type="text"
          placeholder="400 12"
          register={register}
        />
        {/* <div className={styles.formGroup}>
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
          </div> */}
        <Input
          htmlFor="city"
          label="Ort"
          type="text"
          placeholder="Göteborg"
          register={register}
        />
        {/* <div className={styles.formGroup}>
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
          </div> */}
      </div>
      <div className={styles.formRow}>
        <Input
          htmlFor="contact_person"
          label="Kontaktperson"
          type="text"
          placeholder="Göteborg"
          register={register}
        />
        {/* <div className={styles.formGroup}>
            <label
              htmlFor="contact_person"
              className={styles.label}
            >
              Kontaktperson
            </label>
            <select
              name="contact_person"
              {...register('contact_person')}
              className={styles.select}
            >
              <option value="">Välj...</option>
              <option value="">Jag</option>
            </select>
          </div> */}
        <div className={styles.formGroup}></div>
        <div className={styles.formGroup}></div>
      </div>
    </div>
  );
};

export default Marketplace;
