import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Banknote, CreditCard, IndianRupee, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  useMonthlyRevenue,
  useRevenueByPaymentType,
  useRevenueChart,
  useTotalRevenue,
} from "../../hooks/useLibrary";
import type { DailyRevenue } from "../../types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Saffron = accent hue ~40, Maroon = primary hue ~15
const COLOR_CASH = "oklch(0.35 0.15 15)";
const COLOR_ONLINE = "oklch(0.65 0.22 40)";

function RevenueTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-elevated text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: ₹{p.value.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
}

function buildChartData(data: DailyRevenue[]) {
  return data.slice(-30).map((d) => ({
    date: d.date.split("-").slice(1).join("/"),
    Cash: Number(d.cashAmount),
    Online: Number(d.onlineAmount),
    total: Number(d.total),
  }));
}

function SummaryCard({
  label,
  value,
  isLoading,
  icon,
  ocid,
  accent,
}: {
  label: string;
  value: bigint | undefined;
  isLoading: boolean;
  icon: React.ReactNode;
  ocid: string;
  accent?: boolean;
}) {
  return (
    <Card className="border border-border shadow-warm">
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            accent
              ? "bg-accent/15 text-accent-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          {isLoading ? (
            <Skeleton className="h-8 w-24 mt-1" />
          ) : (
            <p
              className="text-3xl font-bold font-display text-primary truncate"
              data-ocid={ocid}
            >
              ₹{Number(value ?? 0).toLocaleString("en-IN")}
            </p>
          )}
          <p className="text-xs text-muted-foreground">All time</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminRevenue() {
  const { data: total, isLoading: totalLoading } = useTotalRevenue();
  const { data: byType, isLoading: byTypeLoading } = useRevenueByPaymentType();
  const { data: chart, isLoading: chartLoading } = useRevenueChart();

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const { data: monthlyRevenue, isLoading: monthlyLoading } = useMonthlyRevenue(
    year,
    month,
  );

  const pieData = byType
    ? [
        { name: "Cash", value: Number(byType.cashTotal), fill: COLOR_CASH },
        {
          name: "Online",
          value: Number(byType.onlineTotal),
          fill: COLOR_ONLINE,
        },
      ]
    : [];

  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - i);
  const grandTotal = Number(byType?.grandTotal ?? 1);
  const barData = chart ? buildChartData(chart) : [];

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.revenue.page">
      {/* Page Header */}
      <div className="gradient-warm px-6 py-5">
        <h1 className="text-xl font-bold text-primary-foreground font-display flex items-center gap-2">
          <TrendingUp size={20} />
          Revenue Reports
        </h1>
        <p className="text-sm text-primary-foreground/70 mt-0.5">
          Complete financial overview — daily trends, monthly totals, and
          payment breakdown
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* ── Summary Cards ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          data-ocid="revenue.summary.section"
        >
          <SummaryCard
            label="Total Revenue"
            value={total}
            isLoading={totalLoading}
            icon={<IndianRupee size={22} />}
            ocid="revenue.total.value"
          />
          <SummaryCard
            label="Cash Revenue"
            value={byType?.cashTotal}
            isLoading={byTypeLoading}
            icon={<Banknote size={22} />}
            ocid="revenue.cash.value"
          />
          <SummaryCard
            label="Online Revenue"
            value={byType?.onlineTotal}
            isLoading={byTypeLoading}
            icon={<CreditCard size={22} />}
            ocid="revenue.online.value"
            accent
          />
        </div>

        {/* ── Monthly Revenue Selector ── */}
        <Card
          className="border border-border shadow-warm"
          data-ocid="revenue.monthly.section"
        >
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground">
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="rev-year"
                  className="text-sm text-muted-foreground"
                >
                  Year:
                </label>
                <select
                  id="rev-year"
                  data-ocid="revenue.year_select"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="rev-month"
                  className="text-sm text-muted-foreground"
                >
                  Month:
                </label>
                <select
                  id="rev-month"
                  data-ocid="revenue.month_select"
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i + 1}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ml-auto">
                {monthlyLoading ? (
                  <Skeleton className="h-10 w-28" />
                ) : (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {MONTHS[month - 1]} {year}
                    </p>
                    <p
                      className="text-2xl font-bold text-primary font-display"
                      data-ocid="revenue.monthly.value"
                    >
                      ₹{Number(monthlyRevenue ?? 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Stacked Bar Chart — Last 30 Days ── */}
        <Card
          className="border border-border shadow-warm"
          data-ocid="revenue.chart.section"
        >
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground">
              Daily Revenue — Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            {chartLoading ? (
              <Skeleton
                className="h-72 w-full"
                data-ocid="revenue.chart.loading_state"
              />
            ) : barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={290}>
                <BarChart
                  data={barData}
                  margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                  data-ocid="revenue.chart"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{
                      fontSize: 10,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    interval={3}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    tickFormatter={(v: number) =>
                      `₹${v.toLocaleString("en-IN")}`
                    }
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Amount (₹)",
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      style: {
                        fontSize: 10,
                        fill: "oklch(var(--muted-foreground))",
                      },
                    }}
                  />
                  <Tooltip content={<RevenueTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar
                    dataKey="Cash"
                    stackId="a"
                    fill={COLOR_CASH}
                    radius={[0, 0, 0, 0]}
                    name="Cash"
                  />
                  <Bar
                    dataKey="Online"
                    stackId="a"
                    fill={COLOR_ONLINE}
                    radius={[3, 3, 0, 0]}
                    name="Online"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div
                className="h-72 flex items-center justify-center"
                data-ocid="revenue.chart.empty_state"
              >
                <div className="text-center text-muted-foreground">
                  <TrendingUp size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No revenue data available yet</p>
                  <p className="text-xs mt-1">
                    Data will appear once fees are collected
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Cash vs Online Pie Chart ── */}
        <Card
          className="border border-border shadow-warm"
          data-ocid="revenue.pie.section"
        >
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground">
              Cash vs Online Payment Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            {byTypeLoading ? (
              <Skeleton className="h-52 w-full" />
            ) : pieData.every((d) => d.value === 0) ? (
              <div
                className="h-52 flex items-center justify-center text-muted-foreground text-sm"
                data-ocid="revenue.pie.empty_state"
              >
                <div className="text-center">
                  <CreditCard size={36} className="mx-auto mb-2 opacity-30" />
                  <p>No payment data available</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <ResponsiveContainer width={220} height={220}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number) => [
                          `₹${v.toLocaleString("en-IN")}`,
                          "",
                        ]}
                        contentStyle={{
                          background: "oklch(var(--card))",
                          border: "1px solid oklch(var(--border))",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4 flex-1 w-full">
                  {pieData.map((d) => {
                    const pct =
                      grandTotal > 0
                        ? Math.round((d.value / grandTotal) * 100)
                        : 0;
                    return (
                      <div key={d.name} className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ background: d.fill }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-foreground">
                              {d.name} Payments
                            </span>
                            <span className="text-muted-foreground tabular-nums">
                              ₹{d.value.toLocaleString("en-IN")}{" "}
                              <span className="text-xs">({pct}%)</span>
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div
                              className="h-full rounded-full transition-smooth"
                              style={{
                                width: `${pct}%`,
                                background: d.fill,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-3 border-t border-border flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground">
                      Grand Total
                    </span>
                    <span
                      className="text-xl font-bold text-primary font-display"
                      data-ocid="revenue.grand_total.value"
                    >
                      ₹{Number(byType?.grandTotal ?? 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
