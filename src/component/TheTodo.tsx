import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
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
  const remove = (itemColumn: TableItem) => {
    const index = props.listTodo.findIndex((item) => item.status === itemColumn.status);

    const contentIndex = props.listTodo[index].content.findIndex((item) => item.id === itemColumn.id);

    props.listTodo[index].content.splice(contentIndex, 1);

    props.setListTodo([...props.listTodo]);
  };

  const titleColor = (title: string) => {
    if (title === 'New') {
      return styles.table__title__red;
    } else if (title === 'In-Progress') {
      return styles.table__title__blue;
    } else if (title === 'In-Review') {
      return styles.table__title__green;
    } else if (title === 'Resolve') {
      return styles.table__title__gray;
    }
  };

  const columnColor = (title: string) => {
    if (title === 'New') {
      return styles.table__column__red;
    } else if (title === 'In-Progress') {
      return styles.table__column__blue;
    } else if (title === 'In-Review') {
      return styles.table__column__green;
    } else if (title === 'Resolve') {
      return styles.table__column__gray;
    }
  };

  const renderColumnItem = (item: TableItem, index: number) => {
    return (
      <div key={index} className={styles.table__item}>
        <div className={`${styles.table__item__title} flex justify-between items-center pb-2`}>
          <p className={`${styles.table__item__label} w-[75%]`}>{item.title}</p>
          <button
            className="w-[25%]"
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
            className="w-[25%]"
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

  const renderColumn = () => {
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          {props.listTodo.map((todoTable, index) => {
            return (
              <div key={index} className={styles.table}>
                <div className={`${styles.table__title} ${titleColor(todoTable.title)}`}>
                  <span className="text-white font-bold">{todoTable.title}</span>
                </div>
                <div className={`${styles.table__column} ${columnColor(todoTable.title)}`}>
                  <List onDragEnd={onDragEnd} name={todoTable.title}>
                    {todoTable.content.map((item, itemIndex) => {
                      return (
                        <div key={item.id}>
                          <Draggable key={item.id} draggableId={item.id + ''} index={itemIndex}>
                            {(provided: DraggableProvided | any) => (
                              <div>
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  {renderColumnItem(item, itemIndex)}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        </div>
                      );
                    })}
                  </List>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </>
    );
  };

  return (
    <div>
      <div className={styles.content}>{renderColumn()}</div>
    </div>
  );
}
