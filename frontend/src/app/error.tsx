"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="inner-page page-intro section-wrap">
      <p className="eyebrow">A MOMENTARY PAUSE</p>
      <h1>
        Something went
        <br />
        <em>off the trail.</em>
      </h1>
      <p>Please try loading the page again.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
