import { auth } from '@/auth.config';
import { Footer, SideBar, TopMenu } from '@/components';

export default async function ShopLayout({ children }: { children: React.ReactNode; }) {
  const session = await auth();
  return (
    <main className="min-h-screen">

      <TopMenu />
      <SideBar session={session} />
      
      <div className='px-0 sm:px-10'>
        {children}
      </div>
      <Footer />
    </main>
  );
}