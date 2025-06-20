import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function AnalyticsCardSkeleton() {
  return (
    <Card className="w-full shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="space-y-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
