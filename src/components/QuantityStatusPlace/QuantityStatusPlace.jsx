import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './QuantityStatusPlace.module.css';
import { FaStar } from 'react-icons/fa';

const QuantityStatusPlace = () => {
  const { register, watch, control } = useFormContext();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const product = watch('product');

  const closeDropdown = () => {
    setShowAdditionalInfo(false);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Antal / Status / Plats</h2>
      <p className={styles.formSubtitle}>
        Obligatoriska fält är markerade med stjärna (*)
      </p>
      <div>
        <label>Product: {product}</label>
        <label
          htmlFor="quantity"
          className={styles.label}
        >
          Antal
        </label>
        <select
          {...register('quantity', { required: true })}
          className={styles.formSelect}
        >
          <option value="">Välj...</option>
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="three">3</option>
          <option value="four">4</option>
          {/* Add project options */}
        </select>{' '}
        <label
          htmlFor="status"
          className={styles.label}
        >
          Produktstatus
        </label>
        <select
          {...register('status', { required: true })}
          className={styles.formSelect}
        >
          <option value="">Välj...</option>
          <option value="notPublished">Inventerad</option>
          <option value="intern">Inventerad - i byggnad</option>
          <option value="three">Inventerad - i lager/förråd</option>
          <option value="three">Mängdad</option>
          <option value="three">Mängdad - i byggnad</option>
          <option value="three">Mängdad - i lager/förråd</option>
          <option value="four">På rekonditionering</option>
          <option value="four">I lager</option>
          <option value="four">Bevarad</option>
          <option value="four">Återbrukad i projektet (slutstatus)</option>
          <option value="four">
            Återbrukad inom organisationen (slutstatus)
          </option>
          <option value="four">
            Återbrukad externt av annan aktör (slutstatus)
          </option>
          <option value="four">Avfallshanterad (slutstatus) </option>
          {/* Add project options */}
        </select>{' '}
        <label
          htmlFor="publishStatus"
          className={styles.label}
        >
          Publiceringsstatus
        </label>
        <select
          {...register('publishStatus')}
          className={styles.formSelect}
        >
          <option value="">Välj...</option>
          <option value="notPublished">Ej publicerad</option>
          <option value="intern">Publicerad som intern annons</option>
          <option value="three">Publicerad som extern annons</option>
          <option value="three">Reserverad</option>
          <option value="three">Såld</option>
          <option value="three">Avpublicerad</option>
          <option value="four">Automatiskt avpublicerad</option>
        </select>
        <label
          htmlFor="date"
          className={styles.label}
        >
          Datum:
        </label>
        <Controller
          name="date"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              selected={value}
              onChange={onChange}
            />
          )}
        />
        <button type="button">Delete</button>
        <button
          type="button"
          onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
        >
          {showAdditionalInfo ? 'Hide' : 'Show'} additional info
        </button>
      </div>
      {showAdditionalInfo && (
        <div>
          <div>
            <div>
              <label
                htmlFor="cosmeticRating"
                className={styles.label}
              >
                Estetiskt skick
                {[...Array(5)].map((star, i) => {
                  const cosmeticRatingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="cosmeticRating"
                        value={cosmeticRatingValue}
                        {...register('cosmeticRating')}
                      />
                      <FaStar
                        className="star"
                        color={
                          cosmeticRatingValue <= watch('cosmeticRating')
                            ? '#ffc107'
                            : '#e4e5e9'
                        }
                      />
                    </label>
                  );
                })}
              </label>
              <label
                htmlFor="functionalRating"
                className={styles.label}
              >
                Funktionellt skick
                {[...Array(5)].map((star, i) => {
                  const functionalRatingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="functionalRating"
                        value={functionalRatingValue}
                        {...register('functionalRating')}
                      />
                      <FaStar
                        className="star"
                        color={
                          functionalRatingValue <= watch('functionalRating')
                            ? '#ffc107'
                            : '#e4e5e9'
                        }
                      />
                    </label>
                  );
                })}
              </label>
            </div>
            <div>
              <label
                htmlFor="commentForRating"
                className={styles.label}
              >
                Kommentar
              </label>
              <textarea name="commentForRating" />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="dismantlability"
                className={styles.label}
              >
                Demonterbarhet
              </label>
              <select
                {...register('dismantlability')}
                className={styles.formSelect}
              >
                <option value="easyDissemble">
                  Enkel att demontera/demontering krävs ej
                </option>
                <option value="ableToDissemble">
                  Demonterbar men specialverktyg krävs
                </option>
                <option value="limitedOptionsForDissemble">
                  Begränsad demonterbarhet
                </option>
              </select>
              <label
                htmlFor="dismantlabilityComment"
                className={styles.label}
              >
                Kommentar
              </label>
              <textarea name="dismantlabilityComment"></textarea>
            </div>
            <div>
              <label
                htmlFor="accessability"
                className={styles.label}
              >
                Åtkomlighet
              </label>
              <select
                {...register('accessability')}
                className={styles.formSelect}
              >
                <option value="easyAccessible">Lätt åtkomlig</option>
                <option value="ableToAccess">
                  Åtkomlig men planering och specialverktyg kan krävas
                </option>
                <option value="limitedOptionsToAccess">
                  Begränsad åtkomlighet
                </option>
              </select>
              <label
                htmlFor="accessabilityComment"
                className={styles.label}
              >
                Kommentar
              </label>
              <textarea name="accessabilityComment"></textarea>
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="location_main"
                className={styles.label}
              >
                Placering
              </label>
              <input
                type="text"
                {...register('location_main')}
                placeholder="T.ex. hus/fastighet"
                className={styles.input}
              />
              <label
                htmlFor="location_sub"
                className={styles.label}
              >
                Placering
              </label>
              <input
                type="text"
                {...register('location_sub')}
                placeholder="T.ex. våning"
                className={styles.input}
              />
              <label
                htmlFor="location_tertiary"
                className={styles.label}
              >
                Placering
              </label>
              <input
                type="text"
                {...register('location_tertiary')}
                placeholder="T.ex. rum"
                className={styles.input}
              />
              <label
                htmlFor="location_detail"
                className={styles.label}
              >
                Placering
              </label>
              <input
                type="text"
                {...register('location_detail')}
                placeholder="T.ex. hylla"
                className={styles.input}
              />
            </div>
            <div>
              <label
                htmlFor="decision_label_main"
                className={styles.label}
              >
                Placering
              </label>
              <input
                type="text"
                {...register('decision_label_main')}
                placeholder="Ange beslut gällande hantering"
                className={styles.input}
              />
              <label
                htmlFor="decision_label_sub"
                className={styles.label}
              >
                Placering
              </label>
              <input
                type="text"
                {...register('decision_label_sub')}
                placeholder="Ange beslut gällande hantering"
                className={styles.input}
              />
              <label
                htmlFor="decision_label_tertiary"
                className={styles.label}
              >
                Placering
              </label>
              <input
                type="text"
                {...register('decision_label_tertiary')}
                placeholder="Ange beslut gällande hantering"
                className={styles.input}
              />
              <label
                htmlFor="decision_label_detail"
                className={styles.label}
              >
                Placering
              </label>
              <input
                type="text"
                {...register('decision_label_detail')}
                placeholder="Ange beslut gällande hantering"
                className={styles.input}
              />
            </div>
          </div>
          <Button
            variatn="primary"
            onClick={closeDropdown}
          >
            Spara
          </Button>
        </div>
      )}
    </div>
  );
};
export default QuantityStatusPlace;
