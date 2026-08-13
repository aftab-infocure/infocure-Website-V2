import { Suspense, lazy, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { SAP_CONSULTING, ORACLE_CONSULTING, SALESFORCE_CONSULTING, BUILD_CLOUD } from "@/data/flagship";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Legal = lazy(() => import("@/pages/Legal"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const DigitalTransformation = lazy(() => import("@/pages/DigitalTransformation"));
const TeamAugmentation = lazy(() => import("@/pages/TeamAugmentation"));
const Blog = lazy(() => import("@/pages/Blog"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const SolutionPage = lazy(() => import("@/pages/SolutionPage"));
const IndustriesIndex = lazy(() => import("@/pages/IndustriesIndex"));
const IndustryPage = lazy(() => import("@/pages/IndustryPage"));
const InsightsIndex = lazy(() => import("@/pages/InsightsIndex"));
const InsightArticle = lazy(() => import("@/pages/InsightArticle"));
const AdminIA = lazy(() => import("@/pages/AdminIA"));
const CaseStudiesIndex = lazy(() => import("@/pages/CaseStudiesIndex"));
const CaseStudyPage = lazy(() => import("@/pages/CaseStudyPage"));
const FlagshipPage = lazy(() => import("@/pages/FlagshipPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center" data-testid="page-loader">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-cure animate-pulse" />
        <span className="font-mono2 text-xs tracking-[0.3em] uppercase text-zinc-500">Loading</span>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App bg-white">
      <BrowserRouter>
        <ScrollManager />
        <Header />
        <main id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Legal page="privacy" />} />
              <Route path="/terms" element={<Legal page="terms" />} />
              <Route path="/disclaimer" element={<Legal page="disclaimer" />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              {/* FINAL LOCKED IA — one flagship landing page per service */}
              <Route path="/services/digital-transformation" element={<DigitalTransformation />} />
              <Route path="/services/sap-consulting" element={<FlagshipPage config={SAP_CONSULTING} />} />
              <Route path="/services/oracle-consulting" element={<FlagshipPage config={ORACLE_CONSULTING} />} />
              <Route path="/services/salesforce-consulting" element={<FlagshipPage config={SALESFORCE_CONSULTING} />} />
              <Route path="/services/build-cloud" element={<FlagshipPage config={BUILD_CLOUD} />} />
              <Route path="/team-augmentation" element={<TeamAugmentation />} />
              {/* Legacy capability URLs retained for SEO — never exposed in navigation */}
              <Route path="/services/team-augmentation" element={<Navigate to="/team-augmentation" replace />} />
              <Route path="/services/sap/:slug" element={<ServicePage />} />
              <Route path="/services/oracle/:slug" element={<ServicePage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/solutions/:slug" element={<SolutionPage />} />
              <Route path="/industries" element={<IndustriesIndex />} />
              <Route path="/industries/:slug" element={<IndustryPage />} />
              <Route path="/insights" element={<InsightsIndex />} />
              <Route path="/insights/blog" element={<Blog />} />
              <Route path="/insights/:slug" element={<InsightArticle />} />
              <Route path="/admin/insights" element={<Navigate to="/adminia" replace />} />
              <Route path="/adminia" element={<AdminIA />} />
              <Route path="/case-studies" element={<CaseStudiesIndex />} />
              <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
