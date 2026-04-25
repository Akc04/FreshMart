'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('id') ?? 'N/A';

  return (
    <div className="success-page">
      <div className="success-icon">
        <CheckCircle size={40} color="var(--green-600)" />
      </div>
      <h1>Order Placed! 🎉</h1>
      <p>Thank you for shopping with FreshMart. Your groceries are being prepared and will be delivered within 2–4 hours.</p>
      <div className="order-id">Order ID: {orderId}</div>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
        <button className="btn-primary" style={{ width: 'auto', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
          Continue Shopping <ArrowRight size={16} />
        </button>
      </Link>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="page-wrapper">
      <Suspense fallback={<div className="spinner-wrap"><div className="spinner" /></div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
