import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccidentStat } from "@/types/accident-stat";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

type Params = Promise<{ accidentId: string }>;

export default async function AccidentDetailPage(props: { params: Params }) {
  const params = await props.params;
  const accidentId = params.accidentId;
  
  // Fetch the specific accident by ID
  const response = await fetch(
    `http://localhost:3030/accidents-stat/${accidentId}`,
    {
      cache: 'no-store',
    }
  );

  // Handle 404 - Not Found
  if (response.status === 404) {
    notFound();
  }

  // Handle other errors
  if (!response.ok) {
    throw new Error(`Failed to fetch accident: ${response.status} ${response.statusText}`);
  }

  const accident = (await response.json()) as AccidentStat;

  return (
    <div className="min-h-dvh flex justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            ← Back to list
          </Button>
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle>Accident {accident.id}</CardTitle>
            <CardDescription>
              {accident.location} ({accident.borough})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Date: {accident.date}</p>
            <p>Severity: {accident.severity}</p>
            <p>Casualties: </p>
            <div className="ml-4">
              <ol className="list-['-']">
                {accident.casualties.map((casualty, i) => (
                  <li key={i} className="px-2">
                    <p>
                      {casualty.class} {casualty.age}yo ({casualty.ageBand})
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <p>Vehicles: </p>
            <div className="ml-4">
              <ol className="list-['-']">
                {accident.vehicles.map((vehicle, i) => (
                  <li key={i} className="px-2">
                    <p>{vehicle.type}</p>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
