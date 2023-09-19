import { Table, Thead, Tr, Th, chakra, Tbody, Td } from "@chakra-ui/react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

export type DataTableProps<Data extends object> = {
   data: Data[];
   columns: ColumnDef<Data, any>[];
};

export default function DataTable<Data extends object>({
   data,
   columns
}: DataTableProps<Data>) {
   const [sorting, setSorting] = useState<SortingState>([]);
   const table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      state: {
         sorting
      },
   });

   return (
      <Table>
         <Thead>
            {table.getHeaderGroups().map(headerGroup => (
               <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                     const meta: any = header.column.columnDef.meta;
                     return (
                        <Th
                           key={header.id}
                           onClick={header.column.getToggleSortingHandler()}
                           isNumeric={meta?.isNumeric}
                        >
                           {flexRender(header.column.columnDef.header, header.getContext())}

                           <chakra.span pl="4">
                              {header.column.getIsSorted() ? (
                                 header.column.getIsSorted() === "desc" ? (
                                    <span>⬆️</span>
                                 ) : (
                                    <span>⬇️</span>
                                 )
                              ) : null}
                           </chakra.span>
                        </Th>
                     );
                  })}
               </Tr>
            ))}
         </Thead>

         <Tbody>
            {table.getRowModel().rows.map((row) => (
               <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                     const meta: any = cell.column.columnDef.meta;
                     return (
                        <Td key={cell.id} isNumeric={meta?.isNumeric}>
                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Td>
                     );
                  })}
               </Tr>
            ))}
         </Tbody>
      </Table>
   );
}