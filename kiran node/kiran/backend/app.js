// const express = require('express');
// const app = express();
// const dataRoutes = require('./routes/dataRoutes');

// app.use(express.json());

// app.use('/api', dataRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const app = express();
const dataRoutes = require('./routes/dataRoutes');
const pool = require('./db'); // Import the database connection pool
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use('/api', dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error connecting to the PostgreSQL database:', err.message);
        } else {
            console.log('Connected to the PostgreSQL database');
        }
        release(); // release the client back to the pool
    });
});
