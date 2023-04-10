import React from 'react';

import style from './style.module.scss';

export type Props = {
  title?: string;
  name?: string;
  error?: string;
  children?: React.ReactNode;
};

const FormItem = ({ title, name, children, error }: Props) => {
  return (
    <div className={style.formItem}>
      <label htmlFor={name} className={style.formItem__title}>
        {title}
      </label>
      <div className={style.formItem__input}>
        {children}
        <span>{error}</span>
      </div>
    </div>
  );
};

export default FormItem;
