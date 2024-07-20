import React, { useState } from 'react';
import { Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const getFilteredExpenses = (expenses, filter) => {
  const now = new Date();
  let filteredExpenses = [];

  switch (filter) {
    case 'daily':
      filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.timestamp.toDate());
        return expenseDate.toDateString() === now.toDateString();
      });
      break;
    case 'weekly':
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.timestamp.toDate());
        return expenseDate >= oneWeekAgo;
      });
      break;
    case 'monthly':
      const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
      filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.timestamp.toDate());
        return expenseDate >= oneMonthAgo;
      });
      break;
    default:
      filteredExpenses = expenses;
      break;
  }

  return filteredExpenses;
};

export default function ExpenseSummary({ expenses }) {
  const [timeFilter, setTimeFilter] = useState('all');
  const filteredExpenses = getFilteredExpenses(expenses, timeFilter);

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = filteredExpenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  const highestSpentCategory = Object.entries(categoryTotals).reduce((highest, [category, total]) => {
    if (total > highest.amount) {
      highest = { category, amount: total };
    }
    return highest;
  }, { category: 'None', amount: 0 });

  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        Expense Summary
      </Typography>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Time Period</InputLabel>
        <Select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          label="Time Period"
        >
          <MenuItem value="all">All Time</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>
      <Typography>
        Total Expenses: ${totalExpenses.toFixed(2)}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Expenses by Category:
      </Typography>
      {Object.entries(categoryTotals).map(([category, total]) => (
        <Typography key={category}>
          {category}: ${total.toFixed(2)}
        </Typography>
      ))}
      <Typography variant="h6" component="h3" gutterBottom style={{ marginTop: '20px' }}>
        You spend most on: {highestSpentCategory.category} (${highestSpentCategory.amount.toFixed(2)})
      </Typography>
    </>
  );
}
