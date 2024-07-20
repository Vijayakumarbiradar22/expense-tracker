import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addExpense, getExpenses } from '../firebaseServices';
import { TextField, Button, Typography } from '@mui/material';

export default function ExpenseForm({ setExpenses }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const expenseData = {
        amount: parseFloat(amount),
        description,
        category,
        data,
        userId: currentUser.uid,
        timestamp: new Date()
      };

      await addExpense(expenseData);

      // Clear fields after successful submission
      setAmount('');
      setDescription('');
      setCategory('');
      setData('');
      setError('');

      // Fetch updated expenses
      const expensesData = await getExpenses(currentUser.uid);
      setExpenses(expensesData);
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('Failed to add expense');
    }
  }

  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        Add New Expense
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Expense
        </Button>
      </form>
    </>
  );
}
