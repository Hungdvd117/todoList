import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';
import React, { useState } from 'react';

import Dialog from '../component/TheDialog';
import Todo from '../component/TheTodo';
import styles from '../styles/homePage.module.scss';

type TableItem = {
  title: string;
  description: string;
  status: number;
  detail: string[];
  id?: string;
};

type TodoTable = {
  title: string;
  status: number;
  content: TableItem[];
};

const listTodoDefault: TodoTable[] = [
  {
    title: 'New',
    status: 1,
    content: [
      {
        title: 'hung doan van',
        description: 'hung hung hung hung hung hung hung hung hung hung hung hung hung',
        status: 1,
        detail: [' hung', ' hung'],
        id: uniqueId(),
      },
      {
        title: 'hung doan van',
        description: 'hung hung hung hung hung hung hung hung hung hung hung hung hung',
        status: 1,
        detail: [' hung', ' hung'],
        id: uniqueId(),
      },
      {
        title: 'hung doan van',
        description: 'hung hung hung hung hung hung hung hung hung hung hung hung hung',
        status: 1,
        detail: [' hung', ' hung'],
        id: uniqueId(),
      },
      {
        title: 'hung doan van',
        description: 'hung hung hung hung hung hung hung hung hung hung hung hung hung',
        status: 1,
        detail: [' hung', ' hung'],
        id: uniqueId(),
      },
      {
        title: 'hung doan van',
        description: 'hung hung hung hung hung hung hung hung hung hung hung hung hung',
        status: 1,
        detail: [' hung', ' hung'],
        id: uniqueId(),
      },
    ],
  },
  {
    title: 'In-Progress',
    status: 2,
    content: [],
  },
  {
    title: 'In-Review',
    status: 3,
    content: [],
  },
  {
    title: 'Resolve',
    status: 4,
    content: [],
  },
];

const dialogDataDefault: TableItem = {
  title: '',
  description: '',
  status: 1,
  detail: [''],
};

export default function HomePage() {
  const [oldDialogData, setOldDialogDat] = useState<TableItem>();

  const [dialogData, setDialogData] = useState<TableItem>(cloneDeep(dialogDataDefault));

  const [listTodo, setListTodo] = useState(listTodoDefault);

  const [isEdit, setIsEdit] = useState(false);

  const [isShow, setIsShow] = useState(false);

  const open = (item?: TableItem) => {
    if (item) {
      setDialogData({
        ...item,
      });

      setOldDialogDat({ ...item });
      setIsEdit(true);
    }

    setIsShow(true);
  };

  const handleSubmit = () => {
    const index = listTodo.findIndex((item) => item.status === dialogData.status);

    if (isEdit) {
      if (oldDialogData?.status === dialogData.status) {
        const contentIndex = listTodo[index].content.findIndex((item) => item.id === dialogData.id);

        listTodo[index].content[contentIndex] = dialogData;
      } else {
        const oldIndex = listTodo.findIndex((item) => item.status === oldDialogData?.status);
        const oldContentIndex = listTodo[oldIndex].content.findIndex((item) => item.id === oldDialogData?.id);

        listTodo[oldIndex].content.splice(oldContentIndex, 1);
        listTodo[index].content.push(dialogData);
      }
    } else {
      listTodo[index].content.push({
        ...dialogData,
        id: uniqueId(),
      });
    }

    setListTodo(listTodo);
  };

  const close = () => {
    setDialogData({
      ...dialogDataDefault,
    });
    setIsEdit(false);
    setIsShow(false);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__content}>
        <div className="flex justify-between">
          <h1 className={styles.homePage__title}>Board</h1>
          <button className={styles.homePage__button} onClick={() => open()}>
            Add
          </button>
        </div>
        <Todo listTodo={listTodo} setListTodo={setListTodo} open={open} />
        {isShow ? <Dialog dialogData={dialogData} setDialogData={setDialogData} open={open} handleSubmit={handleSubmit} close={close} /> : null}
      </div>
    </div>
  );
}
