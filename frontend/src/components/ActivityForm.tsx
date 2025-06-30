import { useState } from 'react';
import axios from 'axios';

type Props = {
    onSubmitted?: () => void;
};

const ActivityForm = ({ onSubmitted }: Props) => {
    const [handle, setHandle] = useState('');
    const [type, setType] = useState<'TWEET' | 'RETWEET' | 'REPLY'>('TWEET');
    const [message, setMessage] = useState('');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            await axios.post('http://localhost:3001/activity', {
                handle,
                type,
            });
            setMessage('Activity submitted!');
            setHandle('');
            setType('TWEET');
            onSubmitted?.();
        } catch {
            setMessage('Failed to submit activity');
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4 border p-4 rounded shadow-md max-w-md mx-auto my-4">
            <h2 className="text-xl font-bold">Simulate Twitter Activity</h2>

            <div>
                <label className="block font-medium">Handle:</label>
                <input
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    required
                    className="border px-2 py-1 w-full rounded"
                />
            </div>

            <div>
                <label className="block font-medium">Activity Type:</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'TWEET' | 'RETWEET' | 'REPLY')}
                    className="border px-2 py-1 w-full rounded"
                >
                    <option value="TWEET">TWEET</option>
                    <option value="RETWEET">RETWEET</option>
                    <option value="REPLY">REPLY</option>
                </select>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit
            </button>

            {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </form>
    );
};

export default ActivityForm;
