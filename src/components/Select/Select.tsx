import { FC, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './select.module.scss';

interface SelectProps {
  isDark?: boolean;
  options?: any[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Select: FC<SelectProps> = ({
  isDark = false,
  options = [],
  placeholder = '',
  onChange = () => {},
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<string>('');

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
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
    contentDark: isDark,
    contentActive: isActive,
  });

  const selectOption = cx({
    option: true,
    optionDark: isDark,
  });

  return (
    <div className={styles.select} onBlur={handleBlur}>
      <button className={button} onClick={() => setIsActive(!isActive)}>
        <span className={styles.buttonValue}>
          {selectedName.length > 1 ? selectedName : placeholder}
        </span>
        {selectedName.length > 1 ? (
          <span
            className={styles.clear}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedName('');
              onChange('');
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
        <ul className={styles.optionList}>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setSelectedName(option.name);
              }}
              className={selectOption}
            >
              <span>{option.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
