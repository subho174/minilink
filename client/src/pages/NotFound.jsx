import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      <div className="container min-h-screen px-6 py-12 mx-auto content-center lg:flex lg:items-center lg:gap-12">
        <div className="w-full justify-items-center lg:w-1/2">
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500">
            Sorry, the page you are looking for doesn't exist.
          </p>

          <div className="flex w-72 justify-center mt-6 gap-x-4">
            <Button variant="custom" onClick={() => navigate(-1)}>
              <ArrowLeft /> Go back
            </Button>
            <Button asChild>
              <a href="/">Take me home</a>
            </Button>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0 justify-items-center">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="/illustration.svg"
            alt="404 image"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
