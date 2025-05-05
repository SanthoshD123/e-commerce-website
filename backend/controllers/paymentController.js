import asyncHandler from 'express-async-handler';

// Dummy Payment Methods
const paymentMethods = ['Google Pay', 'Credit Card', 'Debit Card', 'Cash on Delivery'];

// @desc Get available payment methods
// @route GET /api/payment/methods
// @access Public
export const getPaymentMethods = asyncHandler(async (req, res) => {
    res.json(paymentMethods);
});

// @desc Dummy Payment Processing
// @route POST /api/payment
// @access Private
export const dummyPayment = asyncHandler(async (req, res) => {
    const { paymentMethod, amount } = req.body;

    if (!paymentMethods.includes(paymentMethod)) {
        res.status(400);
        throw new Error('Invalid payment method');
    }

    // Dummy success message
    res.json({
        message: `Your payment request of $${amount} via ${paymentMethod} has been recorded (Dummy).`,
    });
});
