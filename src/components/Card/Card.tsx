import { FC } from 'react';
import styles from './card.module.scss';

interface CardProps {
  imageUrl?: string;
  name?: string;
  authorName?: string;
  locationName?: string;
  created?: string;
}

export const Card: FC<CardProps> = ({
  imageUrl = 'http://via.placeholder.com/280x205?text=Image+not+found',
  name = '',
  authorName = '',
  locationName = '',
  created = '',
}) => {
  return (
    <div className={styles.card}>
      <figure className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </figure>
      <div className={styles.cardInfo}>
        <h3 className={styles.title}>{name}</h3>
        <p>
          <span className={styles.subtitle}>Author:</span> {authorName}
        </p>
        <p>
          <span className={styles.subtitle}>Created:</span> {created}
        </p>
        <p>
          <span className={styles.subtitle}>Location:</span> {locationName}
        </p>
      </div>
    </div>
  );
};
