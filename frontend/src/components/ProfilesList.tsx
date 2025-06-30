type Profile = {
    handle: string;
    activityCount: number;
    lastActivity: string | null;
};

type Props = {
    profiles: Profile[];
};

export default function ProfilesList({ profiles }: Props) {

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Twitter Profiles</h2>
            <table className="w-full table-auto border-separate border-spacing-y-2">
                <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-left">
                        <th className="px-4 py-2 rounded-l-lg text-center">Handle</th>
                        <th className="px-4 py-2 text-center">Activities</th>
                        <th className="px-4 py-2 rounded-r-lg text-center">Last Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((profile) => (
                        <tr
                            key={profile.handle}
                            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg"
                        >
                            <td className="px-4 py-3 rounded-l-lg text-center">{profile.handle}</td>
                            <td className="px-4 py-3 text-center">{profile.activityCount}</td>
                            <td className="px-4 py-3 rounded-r-lg text-center">
                                {profile.lastActivity
                                    ? new Date(profile.lastActivity).toLocaleString()
                                    : '—'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
