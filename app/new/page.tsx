"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { TransitionGroup } from 'react-transition-group';
import Divider from '@mui/material/Divider';
import axios from 'axios';

interface Element {
    name: string;
    value: number;
}

interface RenderItemOptions {
    element: Element;
    handleRemoveElement: (element: Element) => void;
}

function renderItem({ element, handleRemoveElement }: RenderItemOptions) {
    const { name, value } = element;
    return (
        <ListItem
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    title="Delete"
                    onClick={() => handleRemoveElement(element)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText primary={`${name}: ${value}`} />
        </ListItem>
    );
}

export default function TransitionGroupExample() {
    const [elements, setElements] = React.useState<Element[]>([]);
    const [inputName, setInputName] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    const nameInputRef = React.useRef<HTMLInputElement>(null);
    const valueInputRef = React.useRef<HTMLInputElement>(null);
    const addButtonRef = React.useRef<HTMLButtonElement>(null);

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(event.target.value);
    };

    const handleValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddElement = () => {
        if (inputName.trim() !== '' && !isNaN(Number(inputValue))) {
            const newValue = inputValue.trim() !== '' ? Number(inputValue) : 0;
            const newElement: Element = { name: inputName, value: newValue };
            setElements((prev) => [newElement, ...prev]);
            setInputName('');
            setInputValue('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (event.currentTarget === valueInputRef.current) {
                addButtonRef.current?.focus(); // Focus on the "Add to list" button
            } else {
                handleAddElement();
            }
        }
    };

    const handleRemoveElement = (element: Element) => {
        setElements((prev) => prev.filter((e) => e !== element));
    };

    const onHandleCreate = async () => {


        const names = elements.map(element => element.name);
        const values = elements.map(element => element.value);

        try {
            const response = await axios.post('/api/createnew', { names, values });
        } catch (error) {
            console.error('Error creating data:', error);
        }
    }

    return (
        <div className='m-5 border p-5 rounded'>
            <div className="flex justify-center items-center gap-5">
                <TextField
                    label="Enter Element Name"
                    value={inputName}
                    onChange={handleNameInputChange}
                    variant="outlined"
                    inputRef={nameInputRef}
                />
                <TextField
                    label="Enter Element Value"
                    value={inputValue}
                    onChange={handleValueInputChange}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                    inputRef={valueInputRef}
                />
                <Button
                    variant="contained"
                    onClick={handleAddElement}
                    ref={addButtonRef}
                >
                    Add to list
                </Button>
            </div>
            <List sx={{ mt: 1 }}>
                <TransitionGroup>
                    {elements.map((element, index) => (
                        <Collapse key={index}>{renderItem({ element, handleRemoveElement })}<Divider /></Collapse>
                    ))}
                </TransitionGroup>
            </List>

            <Button className="border rounded-sm" onClick={onHandleCreate}>Create</Button>
        </div>
    );
}
