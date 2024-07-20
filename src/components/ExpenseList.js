import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { deleteExpense, updateExpense } from '../firebaseServices';

export default function ExpenseList({ expenses, setExpenses }) {
  const [editMode, setEditMode] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editData, setEditData] = useState('');

  const handleEditClick = (expense) => {
    setEditMode(expense.id);
    setEditAmount(expense.amount);
    setEditDescription(expense.description);
    setEditCategory(expense.category);
    setEditData(expense.data);
  };

  const handleSaveClick = async (id) => {
    const updatedExpense = {
      amount: parseFloat(editAmount),
      description: editDescription,
      category: editCategory,
      data: editData,
    };
    try {
      await updateExpense(id, updatedExpense);
      setExpenses(prevExpenses =>
        prevExpenses.map(expense => (expense.id === id ? { id, ...updatedExpense } : expense))
      );
      setEditMode(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        Expense List
      </Typography>
      <List>
        {expenses.map(expense => (
          <ListItem key={expense.id}>
            {editMode === expense.id ? (
              <>
                <TextField
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  label="Amount"
                />
                <TextField
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  label="Description"
                />
                <TextField
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  label="Category"
                />
                <TextField
                  value={editData}
                  onChange={(e) => setEditData(e.target.value)}
                  label="Data"
                />
                <Button onClick={() => handleSaveClick(expense.id)}>
                  <SaveIcon />
                </Button>
              </>
            ) : (
              <>
                <ListItemText
                  primary={`$${expense.amount} - ${expense.description}`}
                  secondary={`${expense.category} - ${expense.data}`}
                />
                <IconButton edge="end" onClick={() => handleEditClick(expense)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDeleteClick(expense.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
}
