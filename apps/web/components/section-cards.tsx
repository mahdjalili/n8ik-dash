import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@workspace/ui/components/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";

export function SectionCards() {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>درآمد کل</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        $1,250.00
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        روند صعودی این ماه <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">بازدیدکنندگان در ۶ ماه گذشته</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>مشتریان جدید</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1,234</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingDown />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        کاهش ۲۰٪ در این دوره <IconTrendingDown className="size-4" />
                    </div>
                    <div className="text-muted-foreground">نیاز به توجه در جذب</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>حساب‌های فعال</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">45,678</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        نگهداری قوی کاربران <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">تعامل فراتر از اهداف</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>نرخ رشد</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">4.5%</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +4.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        افزایش عملکرد پایدار <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">مطابق با پیش‌بینی‌های رشد</div>
                </CardFooter>
            </Card>
        </div>
    );
}
