import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AccidentStat } from "@/types/accident-stat";
import { notFound } from "next/navigation";
import Back from "../../../../../components/customs/back";
import { Button } from "@/components/ui/button";
export default async function page({
  params,
}: {
  params: Promise<{ accidentId: string }>;
}) {
  const { accidentId } = await params;

  const response = await fetch(
    `http://localhost:3030/accidents-stat/${accidentId}`,
    { next: { revalidate: 60 * 5 } }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error("Unknown error");
  }

  const accident = (await response.json()) as AccidentStat;

  return (
    <DialogContent showCloseButton={false}>
      <DialogClose asChild>
        <Back>
          <Button>Back</Button>
        </Back>
      </DialogClose>
      <DialogTitle>Accident {accident.id}</DialogTitle>
      <DialogDescription>
        {accident.location} ({accident.borough})<p>Date: {accident.date}</p>
      </DialogDescription>
      <section>
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
      </section>
    </DialogContent>
  );
}
