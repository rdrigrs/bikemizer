import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from '@/layouts/Layout';
import { HomePage } from '@/pages/HomePage';
import { CustomizerPage } from '@/pages/CustomizerPage';
import { GalleryPage } from '@/pages/GalleryPage';

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
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customizer" element={<CustomizerPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}; 