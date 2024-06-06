
// Filters.tsx
import React from "react";
import Select from "../../components/Select";

interface FiltersProps {
  filters: { [key: string]: string };
  onFilterChange: (filter: { [key: string]: string }) => void;
  apply: () => void;
  clear: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  apply,
  clear,
}) => {
  return (
    <div className="flex items-center justify-between gap-1">
      <Select
        id={1}
        apply={apply}
        values={[
          { value: "coaching", label: "Coaching" },
          { value: "ai-assistant", label: "AI assistant" },
          { value: "all", label: "All" },
        ]}
        selected={filters.subscription}
        setSelected={(value) =>
          onFilterChange({...filters, subscription: value })
        }
        title={"Subscription"}
      />
      {/*... */}
      <div className="flex items-center gap-1">
        <button onClick={apply}>Apply filters</button>
        <button onClick={clear}>Clear all filters</button>
      </div>
    </div>
  );
};

export default Filters;