"use client";

import * as React from "react";
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconCircleCheckFilled,
    IconDotsVertical,
    IconGripVertical,
    IconLayoutColumns,
    IconLoader,
    IconPlus,
    IconTrendingUp,
} from "@tabler/icons-react";
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type Row,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";
import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@workspace/ui/components/chart";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@workspace/ui/components/drawer";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Separator } from "@workspace/ui/components/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";

export const schema = z.object({
    id: z.number(),
    header: z.string(),
    type: z.string(),
    status: z.string(),
    target: z.string(),
    limit: z.string(),
    reviewer: z.string(),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({
        id,
    });

    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="text-muted-foreground size-7 hover:bg-transparent"
        >
            <IconGripVertical className="text-muted-foreground size-3" />
            <span className="sr-only">کشیدن برای مرتب‌سازی مجدد</span>
        </Button>
    );
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="انتخاب ردیف"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "header",
        header: "سربرگ",
        cell: ({ row }) => {
            return <TableCellViewer item={row.original} />;
        },
        enableHiding: false,
    },
    {
        accessorKey: "type",
        header: "Section Type",
        cell: ({ row }) => (
            <div className="w-32">
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {row.original.type}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.status === "Done" ? (
                    <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                ) : (
                    <IconLoader />
                )}
                {row.original.status === "Done"
                    ? "انجام شده"
                    : row.original.status === "In Progress"
                      ? "در حال انجام"
                      : row.original.status === "Not Started"
                        ? "شروع نشده"
                        : row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "target",
        header: () => <div className="w-full text-right">هدف</div>,
        cell: ({ row }) => (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
                        loading: `در حال ذخیره ${row.original.header}`,
                        success: "انجام شد",
                        error: "خطا",
                    });
                }}
            >
                <Label htmlFor={`${row.original.id}-target`} className="sr-only">
                    هدف
                </Label>
                <Input
                    className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
                    defaultValue={row.original.target}
                    id={`${row.original.id}-target`}
                />
            </form>
        ),
    },
    {
        accessorKey: "limit",
        header: () => <div className="w-full text-right">محدودیت</div>,
        cell: ({ row }) => (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
                        loading: `در حال ذخیره ${row.original.header}`,
                        success: "انجام شد",
                        error: "خطا",
                    });
                }}
            >
                <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
                    محدودیت
                </Label>
                <Input
                    className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
                    defaultValue={row.original.limit}
                    id={`${row.original.id}-limit`}
                />
            </form>
        ),
    },
    {
        accessorKey: "reviewer",
        header: "بررسی‌کننده",
        cell: ({ row }) => {
            const isAssigned =
                row.original.reviewer !== "Assign reviewer" && row.original.reviewer !== "تعیین بررسی‌کننده";

            if (isAssigned) {
                return row.original.reviewer;
            }

            return (
                <>
                    <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
                        بررسی‌کننده
                    </Label>
                    <Select>
                        <SelectTrigger
                            className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                            size="sm"
                            id={`${row.original.id}-reviewer`}
                        >
                            <SelectValue placeholder="تعیین بررسی‌کننده" />
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                            <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                        </SelectContent>
                    </Select>
                </>
            );
        },
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <IconDotsVertical />
                        <span className="sr-only">باز کردن منو</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>ویرایش</DropdownMenuItem>
                    <DropdownMenuItem>ایجاد کپی</DropdownMenuItem>
                    <DropdownMenuItem>افزودن به علاقه‌مندی‌ها</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">حذف</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    });

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
        </TableRow>
    );
}

export function DataTable({ data: initialData }: { data: z.infer<typeof schema>[] }) {
    const [data, setData] = React.useState(() => initialData);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const sortableId = React.useId();
    const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

    const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id);
                const newIndex = dataIds.indexOf(over.id);
                return arrayMove(data, oldIndex, newIndex);
            });
        }
    }

    return (
        <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
            <div className="flex items-center justify-between px-4 lg:px-6">
                <Label htmlFor="view-selector" className="sr-only">
                    نمای
                </Label>
                <Select defaultValue="outline">
                    <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
                        <SelectValue placeholder="انتخاب نمای" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="outline">خلاصه</SelectItem>
                        <SelectItem value="past-performance">عملکرد گذشته</SelectItem>
                        <SelectItem value="key-personnel">پرسنل کلیدی</SelectItem>
                        <SelectItem value="focus-documents">اسناد تمرکز</SelectItem>
                    </SelectContent>
                </Select>
                <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                    <TabsTrigger value="outline">خلاصه</TabsTrigger>
                    <TabsTrigger value="past-performance">
                        عملکرد گذشته <Badge variant="secondary">3</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="key-personnel">
                        پرسنل کلیدی <Badge variant="secondary">2</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="focus-documents">اسناد تمرکز</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <IconLayoutColumns />
                                <span className="hidden lg:inline">سفارشی‌سازی ستون‌ها</span>
                                <span className="lg:hidden">ستون‌ها</span>
                                <IconChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm">
                        <IconPlus />
                        <span className="hidden lg:inline">Add Section</span>
                    </Button>
                </div>
            </div>
            <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                <div className="overflow-hidden rounded-lg border">
                    <DndContext
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                        id={sortableId}
                    >
                        <Table>
                            <TableHeader className="bg-muted sticky top-0 z-10">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext()
                                                          )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody className="**:data-[slot=table-cell]:first:w-8">
                                {table.getRowModel().rows?.length ? (
                                    <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                                        {table.getRowModel().rows.map((row) => (
                                            <DraggableRow key={row.id} row={row} />
                                        ))}
                                    </SortableContext>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            نتیجه‌ای یافت نشد.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </DndContext>
                </div>
                <div className="flex items-center justify-between px-4">
                    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                        {table.getFilteredSelectedRowModel().rows.length} از {table.getFilteredRowModel().rows.length}{" "}
                        ردیف انتخاب شده است.
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label htmlFor="rows-per-page" className="text-sm font-medium">
                                ردیف در هر صفحه
                            </Label>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            صفحه {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">رفتن به صفحه اول</span>
                                <IconChevronsLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">رفتن به صفحه قبلی</span>
                                <IconChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">رفتن به صفحه بعدی</span>
                                <IconChevronRight />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden size-8 lg:flex"
                                size="icon"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">رفتن به صفحه آخر</span>
                                <IconChevronsRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="past-performance" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
        </Tabs>
    );
}

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
    const isMobile = useIsMobile();

    return (
        <Drawer direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.header}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{item.header}</DrawerTitle>
                    <DrawerDescription>نمایش کل بازدیدکنندگان برای ۶ ماه گذشته</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    {!isMobile && (
                        <>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 0,
                                        right: 10,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        hide
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                    <Area
                                        dataKey="mobile"
                                        type="natural"
                                        fill="var(--color-mobile)"
                                        fillOpacity={0.6}
                                        stroke="var(--color-mobile)"
                                        stackId="a"
                                    />
                                    <Area
                                        dataKey="desktop"
                                        type="natural"
                                        fill="var(--color-desktop)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-desktop)"
                                        stackId="a"
                                    />
                                </AreaChart>
                            </ChartContainer>
                            <Separator />
                            <div className="grid gap-2">
                                <div className="flex gap-2 leading-none font-medium">
                                    روند صعودی ۵.۲٪ در این ماه <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">
                                    نمایش کل بازدیدکنندگان برای ۶ ماه گذشته. این فقط یک متن نمونه برای تست چیدمان است.
                                    این متن در چند خط قرار دارد و باید به درستی نمایش داده شود.
                                </div>
                            </div>
                            <Separator />
                        </>
                    )}
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="header">سربرگ</Label>
                            <Input id="header" defaultValue={item.header} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="type">نوع</Label>
                                <Select defaultValue={item.type}>
                                    <SelectTrigger id="type" className="w-full">
                                        <SelectValue placeholder="انتخاب نوع" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Table of Contents">فهرست مطالب</SelectItem>
                                        <SelectItem value="Executive Summary">خلاصه اجرایی</SelectItem>
                                        <SelectItem value="Technical Approach">رویکرد فنی</SelectItem>
                                        <SelectItem value="Design">طراحی</SelectItem>
                                        <SelectItem value="Capabilities">قابلیت‌ها</SelectItem>
                                        <SelectItem value="Focus Documents">اسناد تمرکز</SelectItem>
                                        <SelectItem value="Narrative">روایت</SelectItem>
                                        <SelectItem value="Cover Page">صفحه جلد</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="status">وضعیت</Label>
                                <Select defaultValue={item.status}>
                                    <SelectTrigger id="status" className="w-full">
                                        <SelectValue placeholder="انتخاب وضعیت" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Done">انجام شده</SelectItem>
                                        <SelectItem value="In Progress">در حال انجام</SelectItem>
                                        <SelectItem value="Not Started">شروع نشده</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="target">هدف</Label>
                                <Input id="target" defaultValue={item.target} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="limit">محدودیت</Label>
                                <Input id="limit" defaultValue={item.limit} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="reviewer">بررسی‌کننده</Label>
                            <Select defaultValue={item.reviewer}>
                                <SelectTrigger id="reviewer" className="w-full">
                                    <SelectValue placeholder="انتخاب بررسی‌کننده" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                                    <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                                    <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                </div>
                <DrawerFooter>
                    <Button>ارسال</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">انجام شد</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
