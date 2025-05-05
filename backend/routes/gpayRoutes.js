import express from 'express';

const router = express.Router();

// Sample Google Pay Payment Route
router.post('/', (req, res) => {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
        return res.status(400).json({ message: 'Missing payment details' });
    }

    res.status(200).json({
        message: 'GPay payment processed successfully',
        amount,
        currency,
    });
});

export default router;
