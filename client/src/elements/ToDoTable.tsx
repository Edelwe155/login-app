//@ts-ignore
import React, { useState } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

export interface ListItem {
  id: string;
  value: string;
  order: string;
}

interface MainListProps {
  data: ListItem[];
  onDragChange: (newList: ListItem[]) => void;
}

export const MainList = ({ data, onDragChange }: MainListProps) => {
  const [currentItem, setCurrentItem] = useState<ListItem | null>(null);

  const sortArrayByOrder = (array: ListItem[]): ListItem[] => {
    return array.sort((a, b) => parseInt(a.order) - parseInt(b.order));
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    console.log("Start: ", item);
    setCurrentItem(item);
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
  };
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.opacity = "0.5";
  };
  const dropHandler = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    e.preventDefault();
    console.log("Stop: ", item);
    e.currentTarget.style.opacity = "1";
    onDragChange(
      data.map((i) => {
        if (i.id === item.id) {
          return { ...i, order: currentItem?.order };
        }
        if (i.id === currentItem?.id) {
          return { ...i, order: item.order };
        }
        return i;
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      {sortArrayByOrder(data)?.map((item: ListItem, index: any) => (
        <Box
          key={item.id}
          draggable
          onDragStart={(e) => dragStartHandler(e, item)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, item)}
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            cursor: "grab",
            height: "50px",
            borderBottom: "1px solid black",
            backgroundColor: "grey",
          }}
        >
          <Typography>/ -id: {item.id} </Typography>
          <Typography>/ -order: {item.order}</Typography>
          <Typography>/ -value: '{item.value}' </Typography>
        </Box>
      ))}
    </Box>
  );
};
