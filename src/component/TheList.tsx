import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

type ListProps = {
  children?: React.ReactNode;
  onDragEnd: (data: any) => void;
  name: string;
};

const List = ({ children, name }: ListProps) => {
  return (
    <div className="h-[100%]">
      <Droppable droppableId={name}>
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef} className="h-[100%]">
            <div>{children}</div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
