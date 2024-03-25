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
import useDataStore from '../hooks/dataStore';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../hooks/userStore';
import toast, { Toaster } from 'react-hot-toast';

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

    const { isLoading, setIsLoading } = useDataStore();

    const router = useRouter();
    const onHandleCreate = async () => {
        const names = elements.map(element => element.name);
        const values = elements.map(element => element.value);

        if (names.length >= 1 && values.length >= 1) {
            try {
                setIsLoading(true);
                const response = await axios.post('/api/createnew', { names, values });
                router.push('/');
                setIsLoading(false);
            } catch (error) {
                console.error('Error creating data:', error);
            }
        } else {
            toast.error('Add at least on element!');
            console.log("There should be at least three elements in both names and values.");
        }
    }




    return (
        <div className='p-3 flex border flex-col justify-center items-center '>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex  justify-center items-center gap-3">
                <TextField
                    label="Label"
                    value={inputName}
                    onChange={handleNameInputChange}
                    variant="outlined"
                    inputRef={nameInputRef}
                />
                <TextField
                    label="Value"
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
                    Add
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
        </div >
    );
}
