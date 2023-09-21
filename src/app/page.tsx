'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Container, Icon, Link, Table, Tbody, Td, Text, Th, Thead, Tr, chakra } from '@chakra-ui/react'
import { ColumnDef, SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DataTable from './_components/DataTable'
import NextLink from 'next/link'
import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs'
import api, { Character } from '@/module/api'

const columns: ColumnDef<Character, any>[] = [
   {
      id: 'id',
      header: "Id",
      accessorKey: 'id'
   },
   {
      id: 'name',
      header: "Name",
      accessorKey: 'name'
   },
   {
      id: 'gender',
      header: 'Gender',
      accessorKey: 'gender',
   },
   {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
   },
   {
      id: 'species',
      header: 'Species',
      accessorKey: 'species',
   },
   {
      id: 'view',
      cell: props => {
         const id = props.row.original.id;
         return <Link as={NextLink} href={`view/${id}`}><Icon as={BsEye} /> View</Link>
      },
   },
   {
      id: 'edit',
      cell: props => {
         const id = props.row.original.id;
         return <Link as={NextLink} href={`edit/${id}`}> <Icon as={BsPencilSquare} /> Edit</Link>
      },
   },
   {
      id: 'delete',
      cell: props => {
         const id = props.row.original.id;
         return <Link as={NextLink} href={`delete/${id}`}><Icon as={BsTrash} /> Delete</Link>
      },
   }

];

export default function Home() {
   const [data, setData] = useState<Character[]>([]);

   useEffect(() => {
      const _ = async () => {
         const character = await api.get()
         setData(character);
      };
      _();
   }, [])

   return (
      <Container as='main'>
         <Text fontSize={'4xl'}>Table chackraUi + ReactTable</Text>
         <DataTable data={data} columns={columns} />
         <Text>Other Contet</Text>
      </Container>
   )
}
