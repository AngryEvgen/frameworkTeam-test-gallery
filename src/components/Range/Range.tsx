import React, { FC, useState, useEffect } from 'react';
import { IRange } from '../../types';
import classNames from 'classnames/bind';
import styles from './range.module.scss';

interface RangeProps {
  isDark?: boolean;
  inputsPlaceholders?: IRange;
  placeholder?: string;
  onChange?: (object: IRange) => void;
}

export const Range: FC<RangeProps> = ({
  isDark = false,
  inputsPlaceholders = {},
  placeholder = '',
  onChange = () => {},
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [rangeValues, setRangeValues] = useState<IRange>({
    from: '',
    before: '',
  });

  const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValues({ ...rangeValues, from: event.target.value });
    onChange(rangeValues);
  };
  const handleBeforeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValues({ ...rangeValues, before: event.target.value });
    onChange(rangeValues);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsActive(false);
    }
  };

  const cx = classNames.bind(styles);

  const button = cx({
    button: true,
    buttonActive: isActive,
    buttonDark: isDark,
    buttonDarkActive: isActive,
  });

  const arrow = cx({
    arrow: true,
    arrowActive: isActive,
    arrowDark: isDark,
  });

  const content = cx({
    content: true,
    contentActive: isActive,
    contentDark: isDark,
  });

  const from = cx({
    from: true,
    fromDark: isDark,
  });

  const before = cx({
    before: true,
    beforeDark: isDark,
  });

  useEffect(() => {
    if (
      (!isActive && rangeValues.from.length === 0) ||
      rangeValues.before.length === 0
    ) {
      setRangeValues({ from: '', before: '' });
    }
  }, [isActive]);

  return (
    <div className={styles.range} onBlur={handleBlur}>
      <button className={button} onClick={() => setIsActive(!isActive)}>
        <span className={styles.buttonValue}>
          {rangeValues.from.length > 0 || rangeValues.before.length > 0
            ? `${rangeValues.from} — ${rangeValues.before}`
            : placeholder}
        </span>
        {rangeValues.from.length > 0 || rangeValues.before.length > 0 ? (
          <span
            className={styles.clear}
            onClick={(e) => {
              e.stopPropagation();
              setRangeValues({
                from: '',
                before: '',
              });
              onChange({
                from: '',
                before: '',
              });
              setIsActive(false);
            }}
          >
            x
          </span>
        ) : (
          <div className={arrow}></div>
        )}
      </button>
      <div className={content}>
        <input
          type='text'
          value={rangeValues.from}
          className={from}
          placeholder={inputsPlaceholders.from}
          onChange={handleFromChange}
        />{' '}
        —
        <input
          type='text'
          value={rangeValues.before}
          className={before}
          placeholder={inputsPlaceholders.before}
          onChange={handleBeforeChange}
        />
      </div>
    </div>
  );
};
