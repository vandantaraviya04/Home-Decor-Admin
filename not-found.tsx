import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Page Not Found</h2>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <Link href="/">Return to Homepage</Link>
    </div>
  );
}