import type { V2_MetaFunction } from '@remix-run/react'
import type { LoaderArgs } from '@vercel/remix'
import { Link, useLoaderData } from '@remix-run/react'
import { json } from '@vercel/remix'
import { getSessionContext } from '~/utils/keystone.server'

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = async ({ request }: LoaderArgs) => {
	const context = await getSessionContext(request)
	return json({
		users: (await context.query.User.findMany({
			query: 'id email',
		})) as { id: string; email: string }[],
	})
}

export default function Index() {
	const data = useLoaderData<typeof loader>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Users</h1>
			<Link to="/login">Login</Link>
			<ul>
				{data.users.map((user) => (
					<li key={user.id}>
						<Link to={`/users/${user.id}`}>{user.email}</Link>
					</li>
				))}
        </ul>
    </div>
  );
}
