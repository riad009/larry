// components/transport/TransportGrid.tsx
import { TransportCard } from "@/components/TransportCard";
import { TransportOption } from "@/types/transport";

interface TransportGridProps {
    transportOptions: TransportOption[];
    selectedTransport: TransportOption | null;
    onSelectTransport: (option: TransportOption) => void;
    onDeselectTransport: () => void;
    isMobile?: boolean;
}

export function TransportGrid({
                                  transportOptions,
                                  selectedTransport,
                                  onSelectTransport,
                                  onDeselectTransport,
                                  isMobile = false,
                              }: TransportGridProps) {
    if (transportOptions.length === 0) {
        return null;
    }

    if (isMobile) {
        return (
            <div className="w-full max-w-sm space-y-4 pb-20">
                {transportOptions.map((option) => (
                    <TransportCard
                        key={option.id}
                        option={option}
                        onAdd={() => onSelectTransport(option)}
                        isSelected={selectedTransport?.id === option.id}
                        onRemove={onDeselectTransport}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {transportOptions.map((option) => (
                <div
                    key={option.id}
                    className="transform transition-transform duration-300 hover:scale-[1.02]"
                >
                    <TransportCard
                        key={option.id}
                        option={option}
                        onAdd={() => onSelectTransport(option)}
                        isSelected={selectedTransport?.id === option.id}
                        onRemove={onDeselectTransport}
                    />
                </div>
            ))}
        </div>
    );
}