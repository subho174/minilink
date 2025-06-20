import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RocketIcon,
  LinkIcon,
  BarChartIcon,
  QrCodeIcon,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-3xl rounded-2xl shadow-lg border">
        <CardContent className="px-10 py-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-2 tracking-wide">
              Minilink
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Simplify, track, and share your URLs with power and ease.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mb-8">
            <Feature
              icon={<LinkIcon className="text-blue-500" />}
              title="Shorten Clean URLs"
            />
            <Feature
              icon={<BarChartIcon className="text-green-500" />}
              title="Track Click Analytics"
            />
            <Feature
              icon={<QrCodeIcon className="text-purple-500" />}
              title="Generate QR Codes"
            />
            <Feature
              icon={<RocketIcon className="text-red-500" />}
              title="Fast & Secure Redirection"
            />
          </div>

          <div className="text-center">
            <Button asChild>
              <a
                href="/sign-up"
                className="text-white text-base px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all"
              >
                Get Started <ArrowRight />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex sm:mx-auto items-center space-x-3">
      <div className="bg-gray-100 p-2 rounded-xl">{icon}</div>
      <p className="font-medium">{title}</p>
    </div>
  );
}
