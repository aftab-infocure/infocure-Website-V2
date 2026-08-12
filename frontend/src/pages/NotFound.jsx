import SEO from "@/components/site/SEO";
import { Reveal } from "@/components/ref/motion";
import { Button } from "@/components/ref/ui";

export default function NotFound() {
  return (
    <div data-testid="not-found-page">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <section className="ic-hero-grid relative isolate flex min-h-[80vh] items-center overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-red/[0.06] blur-3xl" />
        <div className="ic-container relative px-6 py-32 lg:px-10">
          <Reveal>
            <p className="font-mono text-[80px] font-semibold leading-none text-brand-red lg:text-[120px]">404</p>
            <h1 className="mt-6 font-display text-[32px] font-bold tracking-[-0.5px] text-brand-ink lg:text-[48px]">
              This page has moved or never existed.
            </h1>
            <p className="mt-4 max-w-md font-body text-[16px] leading-relaxed text-brand-slate">
              Let's get you back on track.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/" size="lg" data-testid="not-found-home">Back to home</Button>
              <Button href="/contact" variant="secondary" size="lg">Contact us</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
