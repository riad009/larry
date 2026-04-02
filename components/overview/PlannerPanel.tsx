"use client";

import React from "react";
import type { RouteStop } from "./GoogleOverviewMap";
import { RouteOrderList } from "./RouteOrderList";
import { ActionButtonsGrid } from "./ActionButtonsGrid";
import { PrimaryActionButton } from "./PrimaryActionButton";

interface PlannerPanelProps {
    routeStops: RouteStop[];
    onReorder: (newOrder: RouteStop[]) => void;
}

export function PlannerPanel({ routeStops, onReorder }: PlannerPanelProps) {
    return (
        <div className="flex flex-col gap-0">
            <h2 className="text-lg font-bold text-charcoal mb-4">Your Trip Route</h2>

            <RouteOrderList routeStops={routeStops} onReorder={onReorder} />

            <div className="mt-6">
                <ActionButtonsGrid onButtonClick={(id) => console.log(id)} />
            </div>

            <div className="mt-6">
                <PrimaryActionButton href="/transport" />
            </div>
        </div>
    );
}
