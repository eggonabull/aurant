"use client";

import Image from "next/image";
import Header from "@/components/Header";

const posts = [
  {
    title: "Optimizing Restaurant Operations with AI",
    author: "John Doe",
    date: "May 1, 2025",
    excerpt: "How artificial intelligence is revolutionizing the restaurant industry",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  },
  {
    title: "The Future of Restaurant POS Systems",
    author: "Jane Smith",
    date: "May 5, 2025",
    excerpt: "Next-generation point of sale solutions for modern restaurants",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
  },
  {
    title: "Creating Efficient Restaurant Layouts",
    author: "Bob Johnson",
    date: "May 10, 2025",
    excerpt: "Tips and tricks for creating efficient restaurant layouts",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-16 relative overflow-hidden">
        <h1 className="text-4xl font-bold mb-8 text-jazz-600 dark:text-jazz-400">Blog</h1>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute w-32 h-32 bg-bubble-200 rounded-full blur-3xl -left-16 -top-16"></div>
          <div className="absolute w-40 h-40 bg-bubble-300 rounded-full blur-3xl -right-20 -top-20"></div>
          <div className="absolute w-24 h-24 bg-bubble-200 rounded-full blur-3xl -bottom-16 -left-20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-bubble-50 p-6 rounded-2xl shadow-xl dark:bg-gray-800 dark:border-gray-700 border-2 border-bubble-200 dark:border-bubble-700 relative overflow-hidden"
            >
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h2>
              <p className="text-gray-500 mb-2">{post.date}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
              <a
                href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-block bg-gradient-to-r from-bubble-500 to-bubble2-500 text-white px-4 py-2 rounded-full font-medium hover:from-bubble-600 hover:to-bubble2-600 transition-all duration-300 transform hover:scale-105"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
