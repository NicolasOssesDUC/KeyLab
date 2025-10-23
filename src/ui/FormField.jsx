import { forwardRef } from 'react';

const getControlClasses = ({ as, type, plaintext }) => {
  if (plaintext) {
    return 'form-control-plaintext';
  }

  if (type === 'checkbox' || type === 'radio') {
    return 'form-check-input';
  }

  if (as === 'select') {
    return 'form-select';
  }

  return 'form-control';
};

const getWrapperClasses = ({ type, inline, floating, wrapperClassName }) => {
  if (floating) {
    return ['form-floating', wrapperClassName].filter(Boolean).join(' ');
  }

  if (type === 'checkbox' || type === 'radio') {
    return [
      'form-check',
      inline && 'form-check-inline',
      wrapperClassName
    ].filter(Boolean).join(' ');
  }

  return ['mb-3', wrapperClassName].filter(Boolean).join(' ');
};

const FormField = forwardRef(({
  id,
  name,
  label,
  type = 'text',
  as = 'input',
  options = [],
  helperText,
  error,
  isInvalid = false,
  isValid = false,
  floating = false,
  inline = false,
  plaintext = false,
  required = false,
  wrapperClassName = '',
  controlClassName = '',
  labelClassName = '',
  helperClassName = '',
  feedbackClassName = '',
  children,
  ...rest
}, ref) => {
  const controlId = id || name;
  const Component = as === 'select' || as === 'textarea' ? as : 'input';
  const invalid = Boolean(error) || isInvalid;
  const valid = !invalid && isValid;

  const wrapperClasses = getWrapperClasses({ type, inline, floating, wrapperClassName });
  const controlClasses = [
    getControlClasses({ as, type, plaintext }),
    invalid && 'is-invalid',
    valid && 'is-valid',
    controlClassName
  ].filter(Boolean).join(' ');

  const labelClasses = [
    type === 'checkbox' || type === 'radio' ? 'form-check-label' : '',
    labelClassName
  ].filter(Boolean).join(' ');

  const renderOptions = () => {
    if (Component !== 'select') {
      return null;
    }

    return options.map((option) => {
      if (typeof option === 'string') {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      }

      const { value, label: optionLabel, ...optionRest } = option;
      return (
        <option key={value} value={value} {...optionRest}>
          {optionLabel ?? value}
        </option>
      );
    });
  };

  const controlProps = {
    id: controlId,
    name,
    type,
    required,
    ref,
    className: controlClasses,
    ...rest
  };

  if (Component === 'select') {
    delete controlProps.type;
  }

  const controlElement = children ?? (
    <Component {...controlProps}>
      {renderOptions()}
    </Component>
  );

  const helperClasses = ['form-text', helperClassName].filter(Boolean).join(' ');
  const feedbackClasses = [
    'invalid-feedback',
    feedbackClassName
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {label && !floating && (type !== 'checkbox' && type !== 'radio') && (
        <label htmlFor={controlId} className={labelClasses}>
          {label}
        </label>
      )}

      {type === 'checkbox' || type === 'radio' ? (
        <>
          {controlElement}
          {label && (
            <label htmlFor={controlId} className={labelClasses}>
              {label}
            </label>
          )}
        </>
      ) : (
        controlElement
      )}

      {floating && label && (
        <label htmlFor={controlId} className={labelClassName}>
          {label}
        </label>
      )}

      {helperText && (
        <div className={helperClasses}>
          {helperText}
        </div>
      )}

      {invalid && (
        <div className={feedbackClasses} role="alert">
          {error}
        </div>
      )}
    </>
  );

  return (
    <div className={wrapperClasses}>
      {content}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
