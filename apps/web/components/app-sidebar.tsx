"use client";

import * as React from "react";
import {
    IconCamera,
    IconChartBar,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconFolder,
    IconHelp,
    IconInnerShadowTop,
    IconListDetails,
    IconReport,
    IconSearch,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "داشبورد",
            url: "#",
            icon: IconDashboard,
        },
        {
            title: "چرخه حیات",
            url: "#",
            icon: IconListDetails,
        },
        {
            title: "تحلیل‌ها",
            url: "#",
            icon: IconChartBar,
        },
        {
            title: "پروژه‌ها",
            url: "#",
            icon: IconFolder,
        },
        {
            title: "تیم",
            url: "#",
            icon: IconUsers,
        },
    ],
    navClouds: [
        {
            title: "ضبط",
            icon: IconCamera,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "پیشنهادات فعال",
                    url: "#",
                },
                {
                    title: "بایگانی شده",
                    url: "#",
                },
            ],
        },
        {
            title: "پیشنهاد",
            icon: IconFileDescription,
            url: "#",
            items: [
                {
                    title: "پیشنهادات فعال",
                    url: "#",
                },
                {
                    title: "بایگانی شده",
                    url: "#",
                },
            ],
        },
        {
            title: "پیشنهادات",
            icon: IconFileAi,
            url: "#",
            items: [
                {
                    title: "پیشنهادات فعال",
                    url: "#",
                },
                {
                    title: "بایگانی شده",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "تنظیمات",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "دریافت کمک",
            url: "#",
            icon: IconHelp,
        },
        {
            title: "جستجو",
            url: "#",
            icon: IconSearch,
        },
    ],
    documents: [
        {
            name: "کتابخانه داده",
            url: "#",
            icon: IconDatabase,
        },
        {
            name: "گزارش‌ها",
            url: "#",
            icon: IconReport,
        },
        {
            name: "دستیار ورد",
            url: "#",
            icon: IconFileWord,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="#">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">اکمی اینک</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
