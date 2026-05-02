import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

const LazyHome = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.HomePage })),
);
const LazyEnroll = lazy(() =>
  import("./pages/Enroll").then((m) => ({ default: m.EnrollPage })),
);
const LazySeats = lazy(() =>
  import("./pages/Seats").then((m) => ({ default: m.SeatsPage })),
);
const LazyNotices = lazy(() =>
  import("./pages/Notices").then((m) => ({ default: m.NoticesPage })),
);
const LazyAdminDashboard = lazy(() =>
  import("./pages/admin/Dashboard").then((m) => ({
    default: m.AdminDashboard,
  })),
);
const LazyAdminStudents = lazy(() =>
  import("./pages/admin/Students").then((m) => ({ default: m.AdminStudents })),
);
const LazyAdminRevenue = lazy(() =>
  import("./pages/admin/Revenue").then((m) => ({ default: m.AdminRevenue })),
);
const LazyAdminMessages = lazy(() =>
  import("./pages/admin/Messages").then((m) => ({ default: m.AdminMessages })),
);
const LazyAdminSettings = lazy(() =>
  import("./pages/admin/AdminSettings").then((m) => ({
    default: m.AdminSettings,
  })),
);
const LazyPoster = lazy(() =>
  import("./pages/PosterPage").then((m) => ({ default: m.PosterPage })),
);

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

// Root route: Layout wraps most pages; poster route bypasses it entirely
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// Poster uses a separate root so it never receives the Layout wrapper
const posterRootRoute = createRootRoute({
  component: () => (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "oklch(0.14 0.04 15)" }}
        >
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "oklch(0.65 0.22 40)" }}
          />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  ),
});

function isAdminLoggedIn() {
  try {
    return !!localStorage.getItem("svl_admin_session");
  } catch {
    return false;
  }
}

const adminGuard = () => {
  if (!isAdminLoggedIn()) throw redirect({ to: "/" });
};

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Wrap>
      <LazyHome />
    </Wrap>
  ),
});
const enrollRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/enroll",
  component: () => (
    <Wrap>
      <LazyEnroll />
    </Wrap>
  ),
});
const seatsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seats",
  component: () => (
    <Wrap>
      <LazySeats />
    </Wrap>
  ),
});
const noticesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notices",
  component: () => (
    <Wrap>
      <LazyNotices />
    </Wrap>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  beforeLoad: adminGuard,
  component: () => (
    <Wrap>
      <LazyAdminDashboard />
    </Wrap>
  ),
});
const adminStudentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/students",
  beforeLoad: adminGuard,
  component: () => (
    <Wrap>
      <LazyAdminStudents />
    </Wrap>
  ),
});
const adminRevenueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/revenue",
  beforeLoad: adminGuard,
  component: () => (
    <Wrap>
      <LazyAdminRevenue />
    </Wrap>
  ),
});
const adminMessagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/messages",
  beforeLoad: adminGuard,
  component: () => (
    <Wrap>
      <LazyAdminMessages />
    </Wrap>
  ),
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/settings",
  beforeLoad: adminGuard,
  component: () => (
    <Wrap>
      <LazyAdminSettings />
    </Wrap>
  ),
});

// Poster route — standalone, no header/footer
const posterRoute = createRoute({
  getParentRoute: () => posterRootRoute,
  path: "/poster",
  component: () => <LazyPoster />,
});

const mainRouteTree = rootRoute.addChildren([
  homeRoute,
  enrollRoute,
  seatsRoute,
  noticesRoute,
  adminRoute,
  adminStudentsRoute,
  adminRevenueRoute,
  adminMessagesRoute,
  adminSettingsRoute,
]);

const posterRouteTree = posterRootRoute.addChildren([posterRoute]);

// Select route tree based on current path so /poster has no Layout
const isPosterPath =
  typeof window !== "undefined" && window.location.pathname === "/poster";

export const router = createRouter({
  routeTree: isPosterPath ? posterRouteTree : mainRouteTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
