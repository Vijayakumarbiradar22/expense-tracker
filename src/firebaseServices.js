import { auth, firestore } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// Authentication if user enters correct email and its password then allowed to Login
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};


export const addExpense = async (expenseData) => {
  try {
    const docRef = await addDoc(collection(firestore, 'expenses'), expenseData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getExpenses = async (userId) => {
  const q = query(collection(firestore, 'expenses'), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteExpense = async (id) => {
  try {
    await deleteDoc(doc(firestore, 'expenses', id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

export const updateExpense = async (id, updatedData) => {
  try {
    await updateDoc(doc(firestore, 'expenses', id), updatedData);
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};
