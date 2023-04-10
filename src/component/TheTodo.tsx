import cloneDeep from 'lodash/cloneDeep';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DraggableProvided } from 'react-beautiful-dnd';

import styles from '../styles/todo.module.scss';
import List from './TheList';

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

interface IProps {
  listTodo: TodoTable[];
  setListTodo: React.Dispatch<React.SetStateAction<TodoTable[]>>;
  open: (item: TableItem, index: number) => void;
}

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

export default function Todo(props: IProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(process.browser);
  }, []);

  const renderStyleTitle = (title: string) => {
    if (title === 'New') {
      return 'bg-rose-600';
    } else if (title === 'In-Progress') {
      return 'bg-blue-700';
    } else if (title === 'In-Review') {
      return 'bg-blue-400';
    } else if (title === 'Resolve') {
      return 'bg-stone-300';
    }
  };

  const remove = (itemColumn: TableItem) => {
    const index = props.listTodo.findIndex((item) => item.status === itemColumn.status);

    const contentIndex = props.listTodo[index].content.findIndex((item) => item.id === itemColumn.id);

    props.listTodo[index].content.splice(contentIndex, 1);

    props.setListTodo([...props.listTodo]);
  };

  const renderColumnItem = (item: TableItem, index: number) => {
    return (
      <div key={index} className={styles.table__item}>
        <div className={`${styles.table__item__title} flex justify-between items-center pb-2`}>
          <p className={`${styles.table__item__label} w-[75%]`}>{item.title}</p>
          <button
            className={`${styles.table__item__button} bg-sky-600 border-sky-600`}
            onClick={() => {
              props.open(item, index);
            }}
          >
            edit
          </button>
        </div>
        <div className="flex justify-between items-center pt-2">
          <p className={`${styles.table__item__label} w-[75%]`}>{item.description}</p>
          <button
            className={`${styles.table__item__button} bg-red-600 border-red-600`}
            onClick={() => {
              remove(item);
            }}
          >
            delete
          </button>
        </div>
      </div>
    );
  };
  const removeFromList = (list: TableItem[], index: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);

    return [removed, result];
    //removed: data da xoa
    // result: data con lai cua mang sau xoa
  };

  const addToList = (list: TableItem[], index: number, element: TableItem) => {
    const result = Array.from(list);
    result.splice(index, 0, element);

    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const listCopy: TodoTable[] = cloneDeep(props.listTodo);

    const sourceListIndex = listCopy.findIndex((item: TodoTable) => item.title === result.source.droppableId);

    const sourceList = listCopy[sourceListIndex];
    // lay ra mang ban dau

    const [removedElement, newSourceList] = removeFromList(sourceList.content, result.source.index);

    const [newStatus] = statusList.filter((item) => item.label === result.destination.droppableId);

    (removedElement as TableItem).status = newStatus.value;

    listCopy[sourceListIndex].content = newSourceList as TableItem[];

    const destinationListIndex = listCopy.findIndex((item: TodoTable) => item.title === result.destination.droppableId);

    const destinationList = listCopy[destinationListIndex];

    listCopy[destinationListIndex].content = addToList(destinationList.content, result.destination.index, removedElement as TableItem);
    props.setListTodo(listCopy);
  };

  const renderCard = (todoTable: any) => {
    const card = todoTable.content.map((item: any, itemIndex: number) => {
      return (
        <Draggable key={item.id} draggableId={item.id + ''} index={itemIndex}>
          {(provided: DraggableProvided | any) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              {renderColumnItem(item, itemIndex)}
            </div>
          )}
        </Draggable>
      );
    });

    return <List name={todoTable.title}>{card}</List>;
  };

  const renderColumn = () => {
    return (
      <>
        {isBrowser && (
          <DragDropContext onDragEnd={onDragEnd}>
            {props.listTodo.map((todoTable, index) => {
              return (
                <div key={index} className={styles.table}>
                  <div className={`${styles.table__title}`}>
                    <div className={`${styles.table__title__beforeTitle} ${renderStyleTitle(todoTable.title)}`} />
                    <span className="text-black font-bold">{todoTable.title}</span>
                  </div>
                  <div className={`${styles.table__column}`}>{renderCard(todoTable)}</div>
                </div>
              );
            })}
          </DragDropContext>
        )}
      </>
    );
  };

  return (
    <div>
      <div className={styles.content}>{renderColumn()} </div>
    </div>
  );
}
