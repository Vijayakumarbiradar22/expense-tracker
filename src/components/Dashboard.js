import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
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
      </Grid>
    </Container>
  );
}
