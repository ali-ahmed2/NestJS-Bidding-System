import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuctionProvider, useAuction } from "./context/AuctionContext";
import TabNavigation from "./components/TabNavigation";
import CreateItem from "./components/CreateItem";
import ItemsList from "./components/ItemsList";
import ItemDetails from "./components/ItemDetails";
import { Gavel } from "lucide-react";

function App() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AuctionProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex items-center">
                  <Gavel className="h-8 w-8 text-blue-600" />
                  <h1 className="ml-2 text-xl font-semibold text-gray-900">
                    Bidding System
                  </h1>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-grow flex flex-col">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col">
              <TabNavigation />

              <div className="flex-grow py-6">
                <TabContent />
              </div>
            </div>
          </main>
        </div>
      </AuctionProvider>
    </QueryClientProvider>
  );
}

const TabContent: React.FC = () => {
  const { activeTab } = useAuction();

  if (activeTab === "create") {
    return <CreateItem />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      <div className="md:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
        <ItemsList />
      </div>
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
        <ItemDetails />
      </div>
    </div>
  );
};

export default App;
