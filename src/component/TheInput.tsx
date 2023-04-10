import React from 'react';

import styles from '../styles/the-input.module.scss';

type TableItem = {
  title: string;
  description: string;
  status: number;
  detail: string[];
  id?: string;
};

interface IProps {
  value: any;
  dialogData: TableItem;
  onChange: (e: any) => void;
}

export default function TheInput(props: IProps) {
  return (
    <div className={styles.theInput}>
      <input value={props.value} className={styles.theInput__input} type="text" placeholder="Please Input" onChange={props.onChange} />
      <span className={styles.theInput__focusBorder} />
    </div>
  );
}
