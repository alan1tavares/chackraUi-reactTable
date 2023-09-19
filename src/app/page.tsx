'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Table, Tbody, Td, Text, Th, Thead, Tr, chakra } from '@chakra-ui/react'
import { ColumnDef, SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import DataTable from './_components/DataTable'

type Person = {
   firstName: string
   age: number
}

const defaultData: Person[] = [
   {
      firstName: 'tanner',
      age: 24
   },
   {
      firstName: 'bob',
      age: 31
   }
]

const columnHelper = createColumnHelper<Person>()

const columns: ColumnDef<Person, any>[] = [
   columnHelper.accessor('firstName', {
      cell: info => info.getValue(),
      header: "First Name"
   }),
   columnHelper.accessor('age', {
      cell: info => info.getValue(),
      header: "Age"
   }),
   columnHelper.display({
      id: 'actions',
      cell: props => {
         console.log(props);
         console.log(props.row.original.firstName);
         return <button>Editar</button>
      },
    }),
];

export default function Home() {

   return (
      <main>
         <DataTable data={defaultData} columns={columns} />
      </main>
   )
}
