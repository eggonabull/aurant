"use client";

import Header from "@/components/Header";

const supportSections = [
  {
    title: "Getting Started",
    items: [
      "Installing jazz.menu",
      "Setting up your first restaurant",
      "Creating your menu",
      "Configuring table layout",
    ],
  },
  {
    title: "POS System",
    items: ["Editing menu items", "Managing orders", "Handling payments", "Customizing POS layout"],
  },
  {
    title: "Kiosk Setup",
    items: [
      "Generating QR codes",
      "Setting up self-service",
      "Customizing kiosk interface",
      "Managing kiosk orders",
    ],
  },
  {
    title: "Troubleshooting",
    items: ["Common issues", "System requirements", "Performance tips", "Contact support"],
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Support</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportSections.map((section, index) => (
            <div
              key={index}
              className="bg-jazz-50 p-6 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700 border-2 border-jazz-200 dark:border-jazz-700"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-600 dark:text-gray-300">
                    <a
                      href={`#${section.title.toLowerCase().replace(/\s+/g, "-")}-${itemIndex}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
