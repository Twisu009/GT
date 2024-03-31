import Link from "next/link";

export default function Dcontent() {
  return (
    <main>
      <h2>Banner</h2>
      <p>Developer content, still thinking what to write.</p>

      <div className="Dcontent-addWork">
        <Link href="/developer-content/Showcase">
          <button className="btn-primary rounded-lg ">Add your work</button>
        </Link>
      </div>

      <h2> Our Developers</h2>
      <p>
        &quot;Discover what&apos; new&quot;! Dive into the latest creations from
        our developers. Visit now for an exciting experience&quot;!&quot;
      </p>
      <p>Browse the best collection of games our users like</p>
    </main>
  );
}
