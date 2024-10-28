import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Navigation = lazy(() => import('./components/Navigation/Navigation'));

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage/DetailsPage'));
const FeaturesDetails = lazy(() =>
  import('./components/FeaturesDetails/FeaturesDetails')
);
const ReviewsDetails = lazy(() =>
  import('./components/ReviewsDetails/ReviewsDetails')
);
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Navigation />

        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<DetailsPage />}>
              <Route path="features" element={<FeaturesDetails />} />
              <Route path="reviews" element={<ReviewsDetails />} />
            </Route>
            <Route path="*" element={<h2>Oops..404</h2>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;
