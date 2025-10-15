import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
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
            <CardTitle className="text-destructive">Accident Not Found</CardTitle>
            <CardDescription>
              The accident you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This could happen if:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>The accident ID is incorrect</li>
                <li>The accident has been removed from the database</li>
                <li>You followed an outdated link</li>
              </ul>
              <div className="pt-4">
                <Link href="/">
                  <Button>
                    Return to Accidents List
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
