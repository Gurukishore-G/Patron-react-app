import React, { createContext, useContext } from 'react';
import { getFirestore, Firestore } from 'firebase/firestore';

const FirestoreContext = createContext<{ db: Firestore | null }>({ db: null });

export const FirestoreProvider = ({ children }: { children: React.ReactNode }) => {
  const db = getFirestore(); // Initialize Firestore

  return (
    <FirestoreContext.Provider value={{ db }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext); 