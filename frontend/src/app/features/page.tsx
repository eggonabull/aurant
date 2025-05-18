"use client";

import Image from "next/image";
import Header from "@/components/Header";

const features = [
  {
    title: "AI-Powered Menu POS",
    description:
      "Automatically generate point of sale systems based on your menu using advanced AI technology. Our AI analyzes your menu items and creates an optimized POS layout that maximizes efficiency and user experience.",
    icon: "🤖",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  },
  {
    title: "Easy Table Layout",
    description:
      "Drag and drop table layout designer with real-time preview. Create custom layouts for your restaurant floor plan and see how tables will look in real-time. Save multiple configurations for different times of day or special events.",
    icon: "🍽️",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
  },
  {
    title: "Simple POS Editing",
    description:
      "Edit your point of sale system in real-time with our intuitive interface. Add, remove, or modify menu items instantly. No technical knowledge required - our drag-and-drop interface makes it easy for anyone to manage your POS system.",
    icon: "📝",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=400&fit=crop",
  },
  {
    title: "Automatic Kiosk Setup",
    description:
      "Generate QR codes for self-service kiosks with one click. Our system automatically creates optimized kiosk interfaces based on your menu and restaurant layout. Perfect for fast-casual dining or high-traffic areas.",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
  },
  {
    title: "Role-Based Views",
    description:
      "Different views for servers, management, and kitchen staff. Each role gets a customized interface tailored to their specific needs. Servers see order status and table assignments, managers get analytics and reports, and kitchen staff focus on order preparation.",
    icon: "👥",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Track your restaurant's performance in real-time with detailed analytics. Monitor sales trends, popular menu items, and staff performance. Get actionable insights to help grow your business.",
    icon: "📊",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
  },
  {
    title: "Mobile Integration",
    description:
      "Access your restaurant management system from anywhere with our mobile app. Check orders, manage staff, and monitor performance on the go. Perfect for restaurant owners who need to stay connected.",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  },
  {
    title: "24/7 Support",
    description:
      "Get help whenever you need it with our 24/7 customer support. Our team is always available to assist with setup, troubleshooting, or any questions about using our system.",
    icon: "📞",
    image: "https://images.unsplash.com/photo-1517832488541-2d66ce7f847a?w=800&h=400&fit=crop",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-jazz-50 p-6 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700 border-2 border-jazz-200 dark:border-jazz-700"
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4 text-gray-400 dark:text-gray-500">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={800}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
