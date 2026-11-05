import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="inner-page page-intro section-wrap">
      <p className="eyebrow">A LITTLE OFF THE TRAIL</p>
      <h1>
        Let’s find
        <br />
        your <em>way back.</em>
      </h1>
      <p>This page could not be found.</p>
      <Link href="/" className="button">
        Return to the retreat
      </Link>
    </main>
  );
}
