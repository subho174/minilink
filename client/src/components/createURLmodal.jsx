import { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import axios from "axios";
import { Link, Loader2 } from "lucide-react";
import { toast } from "sonner";

function CreateURLModal({ onClose, onCreateSuccess }) {
  const [originalURL, setoriginalURL] = useState("");
  const [customCode, setcustomCode] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const createShortURL = async (e) => {
    e.preventDefault();
    setisLoading(true);

    if (!originalURL) {
      toast.warning("Original URL is required.");
      setisLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/url/create-short-url`,
        {
          originalURL,
          customCode,
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setoriginalURL("");
      setcustomCode("");
      onCreateSuccess(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response.data.errorMessage ||
          "Something went wrong. Please try again"
      );
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Link /> Create New Short URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Short URL</DialogTitle>
          <DialogDescription className="text-gray-800">
            Enter the long URL and optionally a custom alias.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createShortURL}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <Label htmlFor="originalURL" className="text-right">
                Original URL
              </Label>
              <Input
                id="originalURL"
                value={originalURL}
                onChange={(e) => setoriginalURL(e.target.value)}
                placeholder="https://your-very-long-url.com/path"
                className="col-span-3"
                required
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="customCode" className="text-right">
                Custom Alias (Optional)
              </Label>
              <Input
                id="customCode"
                value={customCode}
                onChange={(e) => setcustomCode(e.target.value)}
                placeholder="my-cool-link"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive" type="button" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateURLModal;
