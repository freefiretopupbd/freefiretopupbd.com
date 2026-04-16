import { MetadataRoute } from 'next'


export const dynamic = 'force-dynamic';

async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-products`, {
    cache: 'no-store'
  });

  if (!res.ok) return [];
  return res.json();
}



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.freefiretopupbd.com'
  
  const products = await fetchProducts();
  const productUrls: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/topup/${product.code}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/topup`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  
    ...productUrls,
  ]
}
