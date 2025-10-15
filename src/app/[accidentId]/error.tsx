'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Accident detail error:', error);
  }, [error]);

  return (
    <div className="min-h-dvh flex justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            ← Back to list
          </Button>
        </Link>
        
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Something went wrong!</CardTitle>
            <CardDescription>
              An error occurred while loading the accident details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {error.message || 'Unknown error occurred'}
                </p>
                {error.digest && (
                  <p className="text-xs font-mono text-muted-foreground mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => reset()} variant="default">
                  Try Again
                </Button>
                <Link href="/">
                  <Button variant="outline">
                    Return to List
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
