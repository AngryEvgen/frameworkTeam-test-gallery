import { FC, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './pagination.module.scss';

interface PaginationProps {
  pages?: number;
  onChange?: (value: number) => void;
  isDark?: boolean;
}

export const Pagination: FC<PaginationProps> = ({
  pages = 1,
  onChange = () => {},
  isDark = false,
}) => {
  const [numbersOfPages, setNumberOfPages] = useState<number[]>([]);
  const [currentButton, setCurrentButton] = useState<number>(1);
  const [arrOfCurrentButtons, setArrOfCurrentButtons] = useState<number[]>([]);

  const cx = classNames.bind(styles);

  const pagination = cx({
    pagination: true,
  });

  const button = cx({
    button: true,
    buttonDark: isDark,
  });

  const buttonActive = cx({
    buttonActive: true,
    buttonDarkActive: isDark,
  });

  const buttonDisabled = cx({
    buttonDisabled: true,
    buttonDarkDisabled: isDark,
  });

  useEffect(() => {
    const pagesNumbers = [];

    for (let i = 1; i <= pages; i++) {
      pagesNumbers.push(i);
    }

    setNumberOfPages(pagesNumbers);

    if (currentButton === 1) {
      setArrOfCurrentButtons(pagesNumbers.slice(0, 3));
    }
  }, [pages]);

  useEffect(() => {
    for (let i = 0; i < numbersOfPages.length; i++) {
      if (
        currentButton === numbersOfPages[i] &&
        numbersOfPages[i - 1] !== undefined &&
        numbersOfPages[i + 1] !== undefined
      ) {
        setArrOfCurrentButtons([
          numbersOfPages[i - 1],
          numbersOfPages[i],
          numbersOfPages[i + 1],
        ]);
      }
    }
    onChange(currentButton);
  }, [currentButton]);

  return (
    <div className={pagination}>
      <button
        className={`${button} ${currentButton === 1 ? buttonDisabled : ''}`}
        onClick={() => {
          setCurrentButton(1);
          setArrOfCurrentButtons(numbersOfPages.slice(0, 3));
        }}
      >
        {'<<'}
      </button>
      <button
        className={`${button} ${currentButton === 1 ? buttonDisabled : ''}`}
        onClick={() =>
          setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
        }
      >
        {'<'}
      </button>
      {arrOfCurrentButtons.map((page) => (
        <button
          key={page}
          className={`${button} ${currentButton === page ? buttonActive : ''}`}
          onClick={() => setCurrentButton(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`${button} ${
          currentButton === numbersOfPages.length || numbersOfPages.length === 0
            ? buttonDisabled
            : ''
        }`}
        onClick={() =>
          setCurrentButton((prev) =>
            prev === numbersOfPages.length ? prev : prev + 1
          )
        }
      >
        {'>'}
      </button>
      <button
        className={`${button} ${
          currentButton === numbersOfPages.length || numbersOfPages.length === 0
            ? buttonDisabled
            : ''
        }`}
        onClick={() => {
          setCurrentButton(numbersOfPages.length);
          setArrOfCurrentButtons(numbersOfPages.slice(-3));
        }}
      >
        {'>>'}
      </button>
    </div>
  );
};
