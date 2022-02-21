import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './input.module.scss';

interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  isDark?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({
  type = 'text',
  value = '',
  placeholder,
  name = '',
  isDark = false,
  onChange = () => {},
}) => {
  const cx = classNames.bind(styles);

  const input = cx({
    input: true,
    inputDark: isDark,
  });

  return (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      className={input}
      onChange={onChange}
    />
  );
};
