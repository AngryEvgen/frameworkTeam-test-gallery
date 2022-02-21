import React, { FC, useState, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames/bind';
import containerStore from '../../store/containerStore';
import { useWindowDimensions } from '../../hooks';
import { Filters, IRange } from '../../types';
import { Logo } from '../images';
import { ThemeChangeIcon } from '../images/icons';
import { Input } from '../Input';
import { Select } from '../Select';
import { Range } from '../Range';
import { Card } from '../Card';
import { Pagination } from '../Pagination';
import styles from './container.module.scss';

export const Container: FC = observer(() => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    name: '',
    author: '',
    location: '',
    created: { from: '', before: '' },
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paintingsPerPage, setPaintingsPerPage] = useState<number>(6);

  const indexOfLastPainting = currentPage * paintingsPerPage;
  const indexOfFirstPainting = indexOfLastPainting - paintingsPerPage;
  const currentPaintings = containerStore.paintings.slice(
    indexOfFirstPainting,
    indexOfLastPainting
  );
  const pages = Math.ceil(containerStore.paintings.length / paintingsPerPage);

  const { width } = useWindowDimensions();

  const cx = classNames.bind(styles);

  const container = cx({
    container: true,
    containerDark: isDark,
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilters({ ...filters, name: event.target.value });
  };

  const onAuthorSelectChange = (value: string): void => {
    setFilters({ ...filters, author: value });
  };

  const onLocationSelectChange = (value: string): void => {
    setFilters({ ...filters, location: value });
  };

  const onRangeChange = (object: IRange) => {
    setFilters({ ...filters, created: object });
  };

  useEffect(() => {
    let filtersParametrs = [];

    if (filters.name.length > 1) {
      filtersParametrs.push(`q=${filters.name}`);
    }
    if (+filters.author !== 0) {
      filtersParametrs.push(`authorId=${filters.author}`);
    }
    if (+filters.location !== 0) {
      filtersParametrs.push(`locationId=${filters.location}`);
    }
    if (filters.created.from.length > 1 && filters.created.before.length > 1) {
      filtersParametrs.push(
        `created_qte=${filters.created.from}&created_lte=${filters.created.before}`
      );
    }

    if (filtersParametrs.length > 0) {
      containerStore.fetchByFilters(filtersParametrs.join('&'));
    } else {
      containerStore.fetchPaintings();
    }
  }, [filters]);

  useEffect(() => {
    if (localStorage.getItem('darkTheme')) {
      setIsDark(JSON.parse(localStorage.getItem('darkTheme') as string));
    }
    console.log(window.innerWidth);
    containerStore.fetchPaintings();
    containerStore.fetchAuthors();
    containerStore.fetchLocations();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkTheme', JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    if (width >= 768 && width < 1024) {
      setPaintingsPerPage(8);
    }
    if (width >= 1024) {
      setPaintingsPerPage(9);
    }
  }, [width]);

  return (
    <div className={container}>
      <header className={styles.header}>
        <Logo />
        <button
          className={styles.changeThemeButton}
          onClick={() => setIsDark(!isDark)}
        >
          <ThemeChangeIcon isDark={isDark} />
        </button>
      </header>
      <main>
        <div className={styles.filters}>
          <Input
            value={filters.name}
            placeholder='Name'
            onChange={onInputChange}
            isDark={isDark}
          />
          <Select
            placeholder='Author'
            isDark={isDark}
            options={Object.values(containerStore.authors)}
            onChange={onAuthorSelectChange}
          />
          <Select
            placeholder='Location'
            isDark={isDark}
            options={Object.values(containerStore.locations)}
            onChange={onLocationSelectChange}
          />
          <Range
            inputsPlaceholders={{ from: 'From', before: 'Before' }}
            placeholder='Created'
            isDark={isDark}
            onChange={onRangeChange}
          />
        </div>
        <div className={styles.pictures}>
          {containerStore.paintings.length === 0 ? (
            <h2>No data</h2>
          ) : (
            currentPaintings?.map((painting) => (
              <Card
                key={painting.id}
                imageUrl={painting.imageUrl}
                name={painting.name}
                authorName={containerStore.authors[painting.authorId]?.name}
                locationName={
                  containerStore.locations[painting.locationId]?.name
                }
                created={painting.created}
              />
            ))
          )}
        </div>
        <Pagination pages={pages} onChange={setCurrentPage} isDark={isDark} />
      </main>
    </div>
  );
});
