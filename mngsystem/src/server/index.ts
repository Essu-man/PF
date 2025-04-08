import cors from 'cors';
import express from 'express';
import { pool } from './db';

const app = express();
app.use(cors());
app.use(express.json());

// Add this new endpoint before app.post('/api/egg-production')
app.get('/api/chicken-houses', async (_req, res) => {
  try {
    const houses = [
      { id: 1, house_name: 'House A' },
      { id: 2, house_name: 'House B' }
    ];
    res.json(houses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch chicken houses' });
  }
});

app.get('/api/chicken-houses', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM poultry.chicken_houses ORDER BY house_name');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch chicken houses' });
  }
});

// Update the query to use the correct schema
app.post('/api/egg-production', async (req, res) => {
  try {
    const {
      date,
      chickenHouseId,
      eggCounts,
      notes
    } = req.body;

    console.log('Received data:', {
      date,
      chickenHouseId,
      eggCounts,
      notes
    });

    // Modify the query to handle the data types correctly
    const result = await pool.query(
      `INSERT INTO poultry.egg_production (
        collection_date,
        chicken_house_id,
        peewee_crates, peewee_pieces,
        small_crates, small_pieces,
        medium_crates, medium_pieces,
        large_crates, large_pieces,
        extra_large_crates, extra_large_pieces,
        jumbo_crates, jumbo_pieces,
        notes
      ) VALUES ($1::date, $2::integer, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        date,
        chickenHouseId || null,
        Number(eggCounts.Peewee) || 0,
        Number(eggCounts.PeeweePieces) || 0,
        Number(eggCounts.Small) || 0,
        Number(eggCounts.SmallPieces) || 0,
        Number(eggCounts.Medium) || 0,
        Number(eggCounts.MediumPieces) || 0,
        Number(eggCounts.Large) || 0,
        Number(eggCounts.LargePieces) || 0,
        Number(eggCounts['Extra Large']) || 0,
        Number(eggCounts['Extra LargePieces']) || 0,
        Number(eggCounts.Jumbo) || 0,
        Number(eggCounts.JumboPieces) || 0,
        notes || ''
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving egg production:', error);
    const err = error as Error;
    res.status(500).json({
      error: 'Server error',
      details: err.message,
      stack: err.stack
    });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});