"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  searchName: string;
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  searchName,
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const columnHeaders: { [key: string]: string } = {
    id: "Match ID",
    team1: "Team 1",
    team2: "Team 2",
    scoreTeam1: "Score 1",
    scoreTeam2: "Score 2",
    status: "Status",
    station: "Station",
    roundNumber: "Round Number",
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn(searchName)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchName)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        {/* {table.getColumn("EventModel_location") && (
          <DataTableFacetedFilter
            column={table.getColumn("EventModel_location")}
            title="Location"
            options={locationOptions}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} columnHeaders={columnHeaders} />
    </div>
  );
}
