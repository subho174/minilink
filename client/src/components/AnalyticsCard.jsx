import QRCode from "react-qr-code";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

function AnalyticsCard({ urlDetails }) {
  const { uniqueCode, originalURL, expiresAt, clickCount, lastClickedAt } =
    urlDetails;

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const shortURL = `${import.meta.env.VITE_BACKEND_URL}/url/${uniqueCode}`;

  return (
    <Card className="w-full shadow-md hover:shadow-xl transition-all hover:-translate-y-2.5 duration-500 rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <a
            href={shortURL}
            target="_blank"
            rel="noopener noreferrer"
            title={shortURL}
            className="text-blue-600 font-semibold truncate hover:underline hover:underline-offset-2"
          >
            {shortURL}
          </a>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-blue-600"
                onClick={() => {
                  navigator.clipboard.writeText(shortURL);
                  toast.success("Copied URL");
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy URL</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <p className="truncate">
            <span className="font-medium text-gray-700">Original URL:</span>{" "}
            <a
              href={originalURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-medium hover:underline hover:underline-offset-2"
            >
              {originalURL}
            </a>
          </p>
          <p>
            <span className="font-medium text-gray-700">Expires At:</span>{" "}
            {formatDate(expiresAt)}
          </p>
          <p>
            <span className="font-medium text-gray-700">Last Clicked At:</span>{" "}
            {lastClickedAt ? formatDate(lastClickedAt) : "No click yet"}
          </p>
          <div className="flex justify-between items-center">
            <p>
              <span className="font-medium">Total Clicks:</span>{" "}
              <Badge className="bg-purple-100 text-purple-800 text-sm px-2">
                {clickCount}
              </Badge>
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="custom" size="sm">
                  View QR
                </Button>
              </DialogTrigger>
              <DialogContent className="w-64 h-64 flex flex-col items-center justify-center gap-6 bg-white rounded-xl shadow-xl p-4 animate-in fade-in zoom-in">
                <p className="text-lg text-gray-700 font-medium">
                  Scan to Visit
                </p>
                <QRCode value={shortURL} size={140} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnalyticsCard;
