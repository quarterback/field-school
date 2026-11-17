import React from 'react';
import { createRoot } from 'react-dom/client';
import EastDetroit from './App';
const root=document.getElementById('root');
if(root)createRoot(root).render(<React.StrictMode><EastDetroit /></React.StrictMode>);
