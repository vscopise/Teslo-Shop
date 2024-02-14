export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedusers } from '@/actions';
import { Title } from '@/components';

import { redirect } from 'next/navigation';

import { UsersTable } from './ui/UsersTable';

export default async function OrdersPage() {

  const { ok, users = [] } = await getPaginatedusers();

  if (!ok) redirect('/auth/login');

  return (


    <>
      <Title title="Users" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
