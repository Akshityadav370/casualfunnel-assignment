import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyInfo from '../components/MyInfo';
import { BACKEND_URL } from '../utils/constants';

interface SessionEvent {
  id: string;
  sessionId: string;
  eventType: 'page_view' | 'click';
  url: string;
  elementId?: string;
  elementTag?: string;
  x?: number;
  y?: number;
  timestamp: string;
}

const SessionView = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [events, setEvents] = useState<SessionEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/session/${sessionId}`);

        if (!res.ok) {
          throw new Error('Failed to fetch session events');
        }

        const data: SessionEvent[] = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [sessionId]);

  if (loading) {
    return <div className='p-6 text-gray-600'>Loading events…</div>;
  }

  if (error) {
    return <div className='p-6 text-red-600'>Error: {error}</div>;
  }

  return (
    <div className='p-6'>
      <MyInfo />
      <h2 className='text-xl font-semibold mb-4'>
        Session: <span className='font-mono'>{sessionId}</span>
      </h2>

      <div className='border border-gray-200 rounded-lg overflow-hidden'>
        <table className='w-full table-fixed'>
          <thead className='bg-gray-50'>
            <tr className='grid grid-cols-5'>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Type
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                URL
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Element
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Timestamp
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                Heatmap
              </th>
            </tr>
          </thead>
        </table>
        <div className='max-h-[60vh] overflow-y-auto'>
          <table className='w-full table-fixed'>
            <tbody className='divide-y divide-gray-200'>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className='grid grid-cols-5 hover:bg-gray-50'
                >
                  <td className='px-4 py-3 text-sm'>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                        ${
                          event.eventType === 'page_view'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }
                      `}
                    >
                      {event.eventType}
                    </span>
                  </td>

                  <td className='px-4 py-3 text-sm text-gray-700 truncate'>
                    {event.url}
                  </td>

                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {event.eventType === 'click' ? (
                      <div>
                        <div className='font-mono text-xs'>
                          {event.elementId}
                        </div>
                        <div className='text-xs text-gray-500'>
                          &lt;{event.elementTag}&gt;
                        </div>
                      </div>
                    ) : (
                      <span className='text-gray-400'>—</span>
                    )}
                  </td>

                  <td className='px-4 py-3 text-sm text-gray-600'>
                    {new Date(event.timestamp).toLocaleString()}
                  </td>

                  <td className='px-4 py-3 text-sm'>
                    {event.eventType === 'click' ? (
                      <a
                        href={`${event.url}?heatmap=true&sessionId=${sessionId}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-purple-600 hover:text-purple-800 underline'
                      >
                        Link
                      </a>
                    ) : (
                      <span className='text-gray-400'>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {events.length === 0 && (
        <div className='mt-4 text-sm text-gray-500'>
          No events found for this session
        </div>
      )}
    </div>
  );
};

export default SessionView;
