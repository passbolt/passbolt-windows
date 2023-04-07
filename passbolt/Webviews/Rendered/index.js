import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom' 

ReactDOM.render(
    <StrictMode>
       <BrowserRouter>
            <h2>Rendered</h2>
        </BrowserRouter>
    </StrictMode>
    , document.getElementById('root')
)
