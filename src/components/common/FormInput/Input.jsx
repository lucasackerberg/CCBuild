import styles from './Input.module.css';
import Tooltip from '../Tooltip/Tooltip';

export const Input = ({
  htmlFor,
  label,
  required,
  type,
  options,
  placeholder,
  register,
  onChange,
  disabled,
  tooltip,
  tooltipText,
  small,
  long,
  medium,
}) => {
  const textClass = small
    ? styles.smallText
    : medium
    ? styles.mediumText
    : styles.textInput;
  const selectClass = small
    ? styles.smallSelect
    : long
    ? styles.longSelect
    : styles.selectInput;

  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={styles.label}
      >
        {label} {required && <span className={styles.required}>*</span>}{' '}
        {tooltip && <Tooltip text={tooltipText}>ⓘ</Tooltip>}
      </label>

      {type === 'text' && (
        <input
          {...register(htmlFor, { required })}
          className={textClass}
          type="text"
          id={htmlFor}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}

      {type === 'select' && (
        <select
          {...register(htmlFor, { required })}
          className={selectClass}
          onChange={onChange}
          required={required}
          defaultValue={placeholder}
          disabled={disabled}
          id={htmlFor}
        >
          <option
            disabled
            hidden
            value={placeholder}
          >
            {placeholder}
          </option>
          {options?.map((option, index) => (
            <option
              key={index}
              value={option.id}
            >
              {option.name}
            </option>
          ))}
        </select>
      )}

      {type === 'typeselect' && (
        <select
          {...register(htmlFor, { required })}
          className={styles.selectInput}
          onChange={onChange}
          required={required}
          defaultValue={placeholder}
          disabled={disabled}
        >
          <option
            disabled
            hidden
            value={placeholder}
          >
            {placeholder}
          </option>
          {options?.map((option, index) => (
            <option
              key={index}
              value={option.product_type.id}
            >
              {option.product_type.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
