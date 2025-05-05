import express from 'express';

const router = express.Router();

// Sample COD Payment Route
router.post('/', (req, res) => {
    res.status(200).json({
        message: 'Cash on Delivery order placed successfully',
    });
});

export default router;
