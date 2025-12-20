import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyInfo from '../components/MyInfo';

interface SessionAnalytics {
  sessionId: string;
  pageViewCount: number;
  clickCount: number;
}

const Home = () => {
  const [sessions, setSessions] = useState<SessionAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);

        const res = await fetch('http://localhost:3001/api/v1/events/sessions');

        if (!res.ok) {
          throw new Error('Failed to fetch sessions');
        }

        const data: SessionAnalytics[] = await res.json();
        setSessions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return <div className='p-6 text-gray-600'>Loading sessions…</div>;
  }

  if (error) {
    return <div className='p-6 text-red-600'>Error: {error}</div>;
  }

  return (
    <div className='p-6'>
      <MyInfo />
      <h2 className='text-xl font-semibold mb-4'>Analytics Sessions</h2>

      <div className='overflow-x-auto'>
        <table className='w-full border border-gray-200 rounded-lg overflow-hidden'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Session ID
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Page Views
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Clicks
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                View
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {sessions.map((session) => (
              <tr key={session.sessionId} className='hover:bg-gray-50'>
                <td className='px-4 py-3 text-sm font-mono text-gray-800'>
                  {session.sessionId}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {session.pageViewCount}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {session.clickCount}
                </td>
                <td className='px-4 py-3 text-sm'>
                  <Link
                    to={`/session/${session.sessionId}`}
                    className='text-blue-600 hover:text-blue-800 underline'
                  >
                    Link
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sessions.length === 0 && (
        <div className='mt-4 text-sm text-gray-500'>No sessions found</div>
      )}
    </div>
  );
};

export default Home;
