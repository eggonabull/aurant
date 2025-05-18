"use client";

import Image from 'next/image';
import Header from '@/components/Header';

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop",
    bio: "Passionate about revolutionizing restaurant management with AI technology",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&h=800&fit=crop",
    bio: "Expert in AI and distributed systems, leading our technical development",
  },
  {
    name: "Mike Johnson",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    bio: "Creating intuitive and beautiful interfaces for our users",
  },
];

const values = [
  {
    title: "Innovation",
    description: "We constantly push boundaries to bring you cutting-edge technology",
  },
  {
    title: "Simplicity",
    description: "Our solutions are designed to be easy to use, even for non-technical users",
  },
  {
    title: "Reliability",
    description: "We prioritize stability and uptime for our restaurant clients",
  },
  {
    title: "Customer Focus",
    description: "Your success is our success - we're here to help you grow",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">About Us</h1>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            jazz.menu was born from the frustration of managing complex restaurant operations with
            outdated tools. Our mission is to simplify restaurant management with modern, AI-powered
            solutions that make life easier for restaurant owners, managers, and staff.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-jazz-50 p-6 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700 border-2 border-jazz-200 dark:border-jazz-700"
              >
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={800}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gray-500 mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-jazz-50 p-6 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700 border-2 border-jazz-200 dark:border-jazz-700"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
