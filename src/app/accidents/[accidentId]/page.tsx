import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccidentStat } from "@/types/accident-stat";
import { notFound } from "next/navigation";
export default async function page({
  params,
}: {
  params: Promise<{ accidentId: string }>;
}) {
  const { accidentId } = await params;

  const response = await fetch(
    `http://localhost:3030/accidents-stat/${accidentId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error("Unknown error");
  }

  const accident = (await response.json()) as AccidentStat;

  return (
    <Card className="max-w-96">
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
  );
}
