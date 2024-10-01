import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getExpenses } from '../firebaseServices';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import '../styles.css';

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchExpenses = async () => {
        try {
          const expensesData = await getExpenses(currentUser.uid);
          setExpenses(expensesData);
        } catch (error) {
          console.error("Error fetching expenses:", error);
        }
      };

      fetchExpenses();
    }
  }, [currentUser]);

  const exportToCSV = () => {
    const csvContent = [
      ['Amount', 'Description', 'Category', 'Date'],
      ...expenses.map(expense => [
        expense.amount,
        expense.description,
        expense.category,
        new Date(expense.timestamp.toDate()).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'expenses.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!currentUser) {
    return <Typography>Please log in to view the dashboard.</Typography>;
  }

  return (
    <Container className="dashboard-container">
      <Typography variant="h4" component="h1" className="dashboard-title">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <div className="expense-form">
            <ExpenseForm setExpenses={setExpenses} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="expense-summary">
            <ExpenseSummary expenses={expenses} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="expense-list">
            <ExpenseList expenses={expenses} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={exportToCSV}>
            Export to CSV
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}