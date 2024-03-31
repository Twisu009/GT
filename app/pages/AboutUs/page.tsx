import Link from "next/link";

export default function AboutUs() {
  return (
    <main>
      <h2>Learn About Us</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>

      <div className="AbousUs-Dashboard">
        <Link href="/">
          <button className="btn-primary rounded-lg ">Browse games</button>
        </Link>
      </div>
    </main>
  );
}
