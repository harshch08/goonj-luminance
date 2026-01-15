import { MainNav } from './MainNav';
import { CategoryNav } from './CategoryNav';
import { Footer } from '@/components/sections/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  showCategoryNav?: boolean;
}

export const PageLayout = ({ children, showCategoryNav = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      {showCategoryNav && <CategoryNav />}
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
