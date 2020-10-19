import React  from 'react';
import { render } from 'react-dom';
import { CookiesProvider } from 'react-cookie'; // Cookies logic implented
import App from './App';

render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    
    document.getElementById('root')
);