"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import Spinner from "../Spinner"
export type LeaderboardEntry = {
  no: number
  name: string
  code: string
  referrals: number
  maxCommission: number
}

export const columns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <div>{row.getValue("no")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div>{row.getValue("code")}</div>,
  },
  {
    accessorKey: "referrals",
    header: "Referrals",
    cell: ({ row }) => <div>{row.getValue("referrals")}</div>,
  },
  {
    accessorKey: "maxCommission",
    header: "Max Commission",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("maxCommission"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-left font-medium">{formatted}</div>
    },
  }
]

export function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = React.useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        // 1. Fetch the main leaderboard data
        const mainRes = await fetch(
          "https://script.google.com/macros/s/AKfycbzZEff1a83UaaJegLnSjf20Fl77plaooTc0RuNJju8n63ErBe57anzeStaPzNR1xYm8hA/exec"
        )
        if (!mainRes.ok) {
          throw new Error("Failed to fetch main leaderboard data")
        }
        const mainJson = await mainRes.json()
        const mainData = mainJson.data // shape: { username, referral, ... }

        // 2. Fetch the usage data (to see how many times each referral code is used)
        const usageRes = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=_4ZH0sfjEnvoWcRldVVgez5JD6owxOIOYBC7JZpgFnP8ycU9xiu82OI4V7Qxx__fXLr2g4JADHxHdpg1ZNtAtP61Phg1bJD7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNA_Jv-x6u5TuWu0dO_z5OBHWxFMjKnWES1EES47sYASnVN9X5YxA46Rom272sTtXLLgQPYeO6fC_cfN73Yzq8XA9jV0m9IlJdz9Jw9Md8uu&lib=MoUDT4PTX_8u6GZFIExA-uLhZE0coeUD_"
        )
        if (!usageRes.ok) {
          throw new Error("Failed to fetch usage data")
        }
        const usageJson = await usageRes.json()
        const usageData = usageJson.data // shape: { username, referral, ... }

        // 3. Group the usage data by referral code to count usage
        const usageCountByCode: Record<string, number> = {}

        for (const usageItem of usageData) {
          // Only consider if there's a referral code
          if (usageItem.referral) {
            const code = usageItem.referral
            usageCountByCode[code] = (usageCountByCode[code] || 0) + 1
          }
        }

        // 4. Merge the main data with the usage count
        //    We'll compute "referrals" (the count of usage) and "maxCommission"
        //    then store them into a new array of type LeaderboardEntry
        const ETH_USD_RATE = 1000 // update to whatever you want; 2000 => $20 per 0.01 ETH
        const maxCommissionPerReferral = 0.005 * ETH_USD_RATE // => 20 USD per usage

        let processedData = mainData.map((item: { username: string; referral: string }) => {
          const referrals = usageCountByCode[item.referral] ?? 0
          const maxCommission = referrals * maxCommissionPerReferral
          return {
            no: 0, // will assign after sorting
            name: item.username,
            code: String(item.referral),
            referrals,
            maxCommission,
          }
        })

        processedData = processedData.filter((item: LeaderboardEntry) => item.referrals > 0)

        // 5. Sort by maxCommission descending, then assign rank
        processedData.sort((a: { maxCommission: number }, b: { maxCommission: number }) => b.maxCommission - a.maxCommission)
        processedData = processedData.map((item: LeaderboardEntry, index: number) => ({
          ...item,
          no: index + 1,
        }))

        setLeaderboardData(processedData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: leaderboardData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const renderTop3 = () => {
    const top3 = leaderboardData?.slice(0, 3)
    return (
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
          {/* Second Place */}
          {top3[1] && (
            <div className="text-center w-auto order-2 md:order-1">
              <div className="relative w-32 h-32 mb-2 mx-auto">
                <Image
                  src="/Silver.png"
                  alt={top3[1].name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xl text-brand-blue font-bold font-fredoka">{top3[1].name}</div>
              <div className="text-brand-blue font-bold font-fredoka">2nd Place</div>
            </div>
          )}

          {/* First Place */}
          {top3[0] && (
            <div className="text-center w-auto order-1 md:order-2">
              <div className="relative w-40 h-40 mb-2 mx-auto">
                <Image
                  src="/Gold.png"
                  alt={top3[0].name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-2xl text-brand-blue font-bold font-fredoka">{top3[0].name}</div>
              <div className="text-brand-blue font-bold font-fredoka">1st Place</div>
            </div>
          )}

          {/* Third Place */}
          {top3[2] && (
            <div className="text-center w-auto order-3">
              <div className="relative w-32 h-32 mb-2 mx-auto">
                <Image
                  src="/Bronze.png"
                  alt={top3[2].name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xl text-brand-blue font-bold font-fredoka">{top3[2].name}</div>
              <div className="text-brand-blue font-bold font-fredoka">3rd Place</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="text-[#2C3034] text-center font-bold">
      <Spinner />
    </div>
  }

  return (
    <div className="w-full">
      {renderTop3()}
      <div className="rounded-md border-4 border-[#2F5464]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    isCommission={header.column.id === 'maxCommission'}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-[#2C3034]"
                      isCommission={cell?.column?.id === 'maxCommission'}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 text-[#2C3034]">
        <div className="space-x-2">
          {/* <Button
            className="text-[#2C3034]"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            className="text-[#2C3034]"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button> */}
        </div>
      </div>
    </div>
  )
}
