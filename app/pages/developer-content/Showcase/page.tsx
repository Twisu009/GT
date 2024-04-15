"use client";

import CommentSection from "@/components/ui/comments";

export default function showcase() {
  return (
    <main>
      {/*----Posted content section----*/}
      <div>
        Add your games here!
        <section>developer game content</section>
      </div>

      <div>
        <CommentSection />
      </div>
    </main>
  );
}
