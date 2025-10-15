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
      <Card className="max-w-2xl border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">404 - Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The URL you entered might be incorrect, or the page has been moved or deleted.
            </p>
            <Link href="/">
              <Button>
                Go to Home Page
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
