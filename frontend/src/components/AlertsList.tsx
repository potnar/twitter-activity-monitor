import { useEffect, useState } from 'react';
import axios from 'axios';

type Alert = {
    handle: string;
    lastActivity: string | null;
};

export default function AlertsList() {
    const [alerts, setAlerts] = useState<Alert[]>([]);


    const fetchAlerts = async () => {
        const res = await axios.get('http://localhost:3001/alerts');
        setAlerts(res.data);
    };

    useEffect(() => {

        fetchAlerts();
        const interval = setInterval(fetchAlerts, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 mt-8 border-t border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Inactive Profiles (30+ min)</h2>
            {alerts.length === 0 ? (
                <p className="text-gray-600">No inactive profiles</p>
            ) : (
                <ul className="space-y-2">
                    {alerts.map((alert) => (
                        <li key={alert.handle} className="bg-red-100 border border-red-300 rounded text-red-600 px-4 py-2">
                            <strong>{alert.handle}</strong> — last activity:{' '}
                            {alert.lastActivity ? new Date(alert.lastActivity).toLocaleString() : 'never'}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
