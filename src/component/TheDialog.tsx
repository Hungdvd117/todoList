/* eslint-disable react/jsx-no-literals */
import React from 'react';

import styles from '../styles/dialog.module.scss';
import FormItem from './FormItem';
import TheInput from './TheInput';

type TableItem = {
  title: string;
  description: string;
  status: number;
  detail: string[];
  id?: string;
};

const statusList = [
  {
    label: 'New',
    value: 1,
  },
  {
    label: 'In-Progress',
    value: 2,
  },
  {
    label: 'In-Review',
    value: 3,
  },
  {
    label: 'Resolve',
    value: 4,
  },
];

interface IProps {
  dialogData: TableItem;
  setDialogData: React.Dispatch<React.SetStateAction<TableItem>>;
  open: (item: TableItem) => void;
  handleSubmit: () => void;
  close: () => void;
}

export default function Dialog(props: IProps) {
  const handleSubmitDialog = () => {
    props.handleSubmit();

    props.close();
  };

  const changeDetail = (e: any, index: any) => {
    props.dialogData.detail.splice(index, 1, e.target.value);
    props.setDialogData({
      ...props.dialogData,
    });
  };

  const removeContent = (index: number) => {
    props.dialogData.detail.splice(index, 1);
    props.setDialogData({
      ...props.dialogData,
    });
  };

  const renderContent = (contentData: string[]) => {
    return contentData.map((item, index) => {
      return (
        <div key={index} className="flex justify-between items-center">
          <div className="w-[85%] mb-2">
            <TheInput value={item} dialogData={props.dialogData} onChange={(e) => changeDetail(e, index)} />
          </div>
          <span className={`${styles.close} w-[10%] h-[100%]`} onClick={() => removeContent(index)}>
            &times;
          </span>
        </div>
      );
    });
  };

  const renderStatusSelect = () => {
    return statusList.map((item, index) => {
      return (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      );
    });
  };

  return (
    <div>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modal__content}>
          <span onClick={props.close} className={styles.close}>
            &times;
          </span>
          <FormItem title="Title">
            <TheInput
              value={props.dialogData.title}
              dialogData={props.dialogData}
              onChange={(e: any) =>
                props.setDialogData({
                  ...props.dialogData,
                  title: e.target.value,
                })
              }
            />
          </FormItem>

          <FormItem title="Description">
            <TheInput
              value={props.dialogData.description}
              dialogData={props.dialogData}
              onChange={(e: any) =>
                props.setDialogData({
                  ...props.dialogData,
                  description: e.target.value,
                })
              }
            />
          </FormItem>

          <FormItem title="Title">
            <select
              id="status"
              className={styles.modal__select}
              onChange={(e) =>
                props.setDialogData({
                  ...props.dialogData,
                  status: Number(e.target.value),
                })
              }
              value={props.dialogData.status}
            >
              {renderStatusSelect()}
            </select>
          </FormItem>

          <FormItem title="Content">
            <div>
              {renderContent(props.dialogData.detail)}
              <button
                className={`${styles.modal__button} bg-sky-600 border-sky-600`}
                onClick={() =>
                  props.setDialogData({
                    ...props.dialogData,
                    detail: [...props.dialogData.detail, ''],
                  })
                }
              >
                add content
              </button>
            </div>
          </FormItem>
          <div className="text-center">
            <button className={`${styles.modal__button} bg-sky-600 border-sky-600`} onClick={handleSubmitDialog}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
