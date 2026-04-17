import React from 'react';
import type { Metadata } from 'next';
import TopUpDetailsClient from '@/components/topup/TopUpDetailsClient';
import { notFound } from 'next/navigation';

async function fetchProductDetails(code: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.freefiretopupbd.com';
    const res = await fetch(`${apiUrl}/api/topup-detail/${code}`, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }


  
}export async function generateMetadata(
  { params }: { params: Promise<{ code: string }> }
): Promise<Metadata> {
  const { code } = await params;

  const product = await fetchProductDetails(code);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'This product is not available',
    };
  }

  return {
    title: product.meta_title || product.name,
    description: product.meta_description || product.description,
    openGraph: {
      title: product.meta_title || product.name,
      description: product.meta_description || product.description,
    },
    twitter: {
      title: product.meta_title || product.name,
      description: product.meta_description || product.description,
    },
  };
}

// Page component
export default async function TopUpDetailsPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params; // ✅ await করা হলো
  const product = await fetchProductDetails(code);

  if (!product) {
    // Next.js 15 way to show 404
    notFound();
  }

  return <TopUpDetailsClient product={product} />;
}