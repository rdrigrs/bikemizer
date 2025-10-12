import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from '@/layouts/Layout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ToastContainer } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';

// Lazy loading das páginas
const HomePage = React.lazy(() => import('@/pages/HomePage').then(module => ({ default: module.HomePage })));
const CustomizerPage = React.lazy(() => import('@/pages/CustomizerPage').then(module => ({ default: module.CustomizerPage })));
const GalleryPage = React.lazy(() => import('@/pages/GalleryPage').then(module => ({ default: module.GalleryPage })));

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Single Responsibility Principle - Este componente só configura a aplicação
export const App: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-gray-600">Carregando página...</p>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/customizer" element={<CustomizerPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
          </Suspense>
        </Layout>
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </Router>
    </QueryClientProvider>
  );
}; 