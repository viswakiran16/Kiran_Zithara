// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css'; // Import CSS file
import DataTable from './components/DataTable';
import SearchSort from './components/SearchSort';

const App = () => {
    return (
        <div className="App">
            <h1>Customer Data</h1>
            <div className="center">
                <SearchSort />
            </div>
            <div className="table-container">
                <DataTable />
            </div>
        </div>
    );
};

export default App;

