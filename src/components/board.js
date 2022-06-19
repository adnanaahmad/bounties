import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { darkTheme } from "../App";

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    heading: 'Write a blogpost for DAOHelper',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in er'
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  //padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  //background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  //background: isDraggingOver ? "lightblue" : "lightgrey",
  //padding: grid,
  width: 280,
});

function Board() {

    const [state, setState] = useState([getItems(3), getItems(3, 10), getItems(3, 20), getItems(3, 30)]);
    const columns = {
        0: {name: 'OPEN BOUNTIES', color: '#c4c4c4'},
        1: {name: 'ASSIGNED/IN PROGRESS', color: '#6071d3'},
        2: {name: 'UNDER REVIEW', color: '#a416b9'},
        3: {name: 'CLOSE/REWARDED', color: '#04dbac'}
    }
    const cardColorPalette = '#5a485f';

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }

    return (
        <div>
            <Stack direction={'row'} spacing={1} justifyContent='space-between' sx={{width: '100%'}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >   
                                <Box sx={{background: cardColorPalette, borderTopLeftRadius: 10, borderTopRightRadius: 10, mb: 4}}>
                                    <Box sx={{p: 2}}>
                                        <Typography variant="body1" fontWeight={700} >{columns[ind].name}</Typography>
                                    </Box>
                                    <Box sx={{border: `2px solid ${columns[ind].color}`}}></Box>
                                </Box>
                                <Box sx={{borderLeft: 1, borderRight: 1, paddingX: 2, height: '100%', borderColor: darkTheme.palette.divider}}>
                                    {el.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                                )}
                                            >
                                            <Box sx={{borderTopLeftRadius: 10, borderTopRightRadius: 10, mb: 2}}>
                                                <Box sx={{p: 2, background: cardColorPalette}}>
                                                    <Typography variant="body2" fontWeight={700} sx={{mb:2}}>{item.heading}</Typography>
                                                    <Typography variant="body2">{item.description}</Typography>
                                                </Box>
                                                <Stack direction={'row'} justifyContent='space-between' sx={{paddingY:1, paddingX:2, background: columns[ind].color, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                                    <Typography variant="body2" fontWeight={700} sx={ind === 0 ? {color: 'black'} : {}} >Reward: 5</Typography>
                                                    <Typography variant="body2" fontWeight={700} sx={ind === 0 ? {color: 'black'} : {}}>Time Left: 2 days</Typography>
                                                </Stack>
                                            </Box>
                                            </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </Box>
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </Stack>
        </div>
    );
}

export default Board;
