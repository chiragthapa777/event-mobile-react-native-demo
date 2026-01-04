import { Event } from "@/types/event";
import React from "react";
import { ThemedButton } from "./ui/ThemedButton";
import { ThemedScrollView } from "./ui/ThemedScrollView";
import { ThemedView } from "./ui/ThemedView";
import Tile from "./ui/Tile";

type Props = {
  event: Event;
};

export default function TicketAvailability({ event }: Props) {
  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <ThemedScrollView style={{ flex: 1 }}>
        {event.tickets.map((t) => (
          <Tile key={t.id} title={t.name} />
        ))}
      </ThemedScrollView>
      <ThemedView>
        <ThemedButton title="Book Now" />
      </ThemedView>
    </ThemedView>
  );
}
