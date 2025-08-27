import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccidentStat } from "@/types/accident-stat";

export default async function page() {
  
  const accident = /** fetch resources */ as  AccidentStat;

  return (
    <div className="min-h-dvh flex justify-center items-center">
      <Card className="max-w-2xl">
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
  );
}
