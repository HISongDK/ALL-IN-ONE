import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import Store from './context/storeContext'

ReactDOM.render(
    <Store.Provider>
        <App />
    </Store.Provider>,
    document.getElementById('root'),
)
