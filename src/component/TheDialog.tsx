/* eslint-disable react/jsx-no-literals */
import React from 'react';

import styles from '../styles/dialog.module.scss';

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
        <div key={index} className="flex justify-between">
          <input type="text" value={item} className="w-[85%] mb-2" onChange={(e) => changeDetail(e, index)} />
          <button className="w-[10%] h-[100%]" onClick={() => removeContent(index)}>
            x
          </button>
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
          <div className="flex justify-between mb-3">
            <p className="w-[25%]">Title:</p>
            <input
              value={props.dialogData.title}
              type="text"
              className="w-[75%]"
              onChange={(e) =>
                props.setDialogData({
                  ...props.dialogData,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-between mb-3">
            <p className="w-[25%]">Description:</p>
            <input
              value={props.dialogData.description}
              type="text"
              className="w-[75%]"
              onChange={(e) =>
                props.setDialogData({
                  ...props.dialogData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-between mb-3">
            <p className="w-[25%]">status:</p>
            <div className="w-[75%]">
              <select
                value={props.dialogData.status}
                onChange={(e) =>
                  props.setDialogData({
                    ...props.dialogData,
                    status: Number(e.target.value),
                  })
                }
              >
                {renderStatusSelect()}
              </select>
            </div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="w-[25%]">
              <p>Content:</p>
            </div>
            <div className="w-[75%]">
              {renderContent(props.dialogData.detail)}
              <button
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
          </div>
          <div className="text-center">
            <button onClick={handleSubmitDialog}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
