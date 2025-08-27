"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { PageParams } from "../types";

export default function SearchBar() {
  const [state, setState] = useState<string>();
  const id = useId();
  const router = useRouter();
  const searchparams = useSearchParams();

  const handleSearch = () => {
    if (!state) return;
    const search = new URLSearchParams(searchparams);
    search.set("_loc" satisfies keyof PageParams, encodeURI(state));
    router.push("/?" + search.toString());
  };

  return (
    <form action={handleSearch}>
      <div className="flex justify-start gap-2">
        <Label htmlFor={id} className="text-nowrap">
          Search Location
        </Label>
        <Input
          className="max-w-xs"
          id={id}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Button>Search</Button>
      </div>
    </form>
  );
}
