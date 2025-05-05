import express from 'express';
const router = express.Router();
import { dummyPayment, getPaymentMethods } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/methods').get(getPaymentMethods);
router.route('/').post(protect, dummyPayment);

export default router;
