import { useEffect, useState } from "react";
import CreateURLModal from "../components/CreateURLModal";
import AnalyticsCard from "../components/AnalyticsCard";
import { Button } from "../components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsCardSkeleton from "../components/AnalyticsCardSkeleton";
import { toast } from "sonner";

export default function Dashboard({ api }) {
  const [previousShortURLs, setpreviousShortURLs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setisLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousShortURLs = async () => {
      try {
        setLoading(true);
        setpreviousShortURLs([]);
        const res = await api.get("/url/analytics/click-stats");
        setpreviousShortURLs(res.data.data);
      } catch (err) {
        toast.error(
          err.response.data.errorMessage ||
            err.response.data ||
            "Something went wrong. Please try again"
        );
        console.error("Error fetching short URLs:", err);
      } finally {
        setLoading(false);
      }
    };

    //  fetching old short urls
    fetchPreviousShortURLs();
  }, []);

  const logOut = async () => {
    // logging out user
    try {
      setisLoggingOut(true);
      const res = await api.post("/user/logout");
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.errorMessage);
      console.error("Error fetching short URLs:", err);
    } finally {
      setisLoggingOut(false);
    }
  };
  
  // function to include new URL in the list
  const saveNewURL = (newUrl) => {
    setpreviousShortURLs((prev) => [newUrl, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white px-6 py-6 lg:px-20">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-6 gap-8">
        <a href="/" className="text-4xl font-bold text-blue-700 tracking-wide">
          MiniLink
        </a>
        <div className="flex gap-4">
          <CreateURLModal onCreateSuccess={saveNewURL} />
          <Button
            variant="destructive"
            disabled={isLoggingOut}
            onClick={logOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="animate-spin" /> Logging Out...
              </>
            ) : (
              <>
                Log Out <LogOut />{" "}
              </>
            )}
          </Button>
        </div>
      </header>

      <div>
        <p className="text-2xl text-center md:text-start font-semibold text-gray-800 mt-1">
          Your Shortened URLs
        </p>
        {loading ? (
          <div className="grid gap-8 mt-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(3)].map((_, idx) => (
              <AnalyticsCardSkeleton key={idx} />
            ))}
          </div>
        ) : previousShortURLs.length > 0 ? (
          <div className="grid gap-8 mt-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {previousShortURLs.map((url) => (
              <AnalyticsCard key={url._id} urlDetails={url} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg my-12">
            <p>No short URLs found. Start by creating one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
