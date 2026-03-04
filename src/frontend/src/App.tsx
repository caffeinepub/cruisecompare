import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BookingPage from "./pages/BookingPage";
import CompetitionEntryPage from "./pages/CompetitionEntryPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import DealDetailPage from "./pages/DealDetailPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

const dealDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/deal/$id",
  component: DealDetailPage,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  component: BookingPage,
});

const competitionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/competitions",
  component: CompetitionsPage,
});

const competitionEntryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/competitions/$id",
  component: CompetitionEntryPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  searchRoute,
  dealDetailRoute,
  bookingRoute,
  competitionsRoute,
  competitionEntryRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
