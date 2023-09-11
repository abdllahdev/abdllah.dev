import type { CollectionEntry } from "astro:content";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Props {
  series: CollectionEntry<"series">;
  posts: CollectionEntry<"blog">[];
  order?: number;
}

export default function ({ series, posts, order }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-lg bg-neutral-300 dark:bg-neutral-800">
      <button
        className={`space-y-2 rounded-lg p-5 text-left hover:bg-neutral-400 dark:hover:bg-neutral-700 ${
          isOpen
            ? "rounded-b-lg border-b-4 border-blue-600 bg-neutral-400 dark:bg-neutral-700"
            : ""
        }`}
        onClick={handleOnClick}
      >
        <div className="flex items-center justify-between">
          <div className="items flex justify-center space-x-2">
            <h2 className="text-xl font-bold text-black dark:text-white">
              {series.data.title}
            </h2>
            <span className="text-xl">{`${
              order
                ? ` • ${order} of ${posts.length}`
                : ` • ${posts.length} Parts`
            }`}</span>
          </div>
          <div className="text-black dark:text-white">
            {isOpen ? (
              <ChevronUp style={{ fontSize: "1.5em" }} />
            ) : (
              <ChevronDown style={{ fontSize: "1.5em" }} />
            )}
          </div>
        </div>
        <p>{series.data.description}</p>
      </button>
      {isOpen && (
        <ul className="space-y-2 p-5">
          {posts.map((post, index) => (
            <li
              className={`relative pl-5 before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full ${
                !post.data.planned && order
                  ? order == index + 1
                    ? "before:bg-blue-600 before:ring-[3px] before:ring-blue-600/40"
                    : "before:bg-black dark:before:bg-white"
                  : !post.data.planned
                  ? "before:bg-black dark:before:bg-white"
                  : "text-neutral-500 before:bg-neutral-500"
              }`}
            >
              <a
                href={!post.data.planned ? `/blog/${post.slug}` : undefined}
                className={`space-x-2 font-medium ${
                  !post.data.planned
                    ? "text-black underline decoration-blue-600 underline-offset-2 dark:text-white"
                    : "text-white0"
                }`}
              >
                <span>{post.data.title}</span>
                {post.data.planned && (
                  <span className="inline-flex items-center justify-center rounded-full bg-yellow-400 p-0.5 px-2 text-xs text-black">
                    Planned
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
