import { useGetUsersQuery, useGetUserQuery } from '../services/usersApi';
import { useState } from 'react';


export default function UsersList() {
    const { data: users = [], isLoading, isError, refetch } = useGetUsersQuery();
    const [selectedId, setSelectedId] = useState(null);
    const { data: userDetail } = useGetUserQuery(selectedId, { skip: !selectedId });


    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Fetch lỗi. Hãy thử lại.</p>;


    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
                <h3>Users</h3>
                <button onClick={() => refetch()}>Refetch</button>
                <ul>
                    {users.map(u => (
                        <li key={u.id}>
                            <button onClick={() => setSelectedId(u.id)}>{u.name}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Chi tiết</h3>
                {selectedId ? (
                    userDetail ? (
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(userDetail, null, 2)}</pre>
                    ) : (
                        <p>Đang tải chi tiết...</p>
                    )
                ) : (
                    <p>Chọn 1 user để xem chi tiết</p>
                )}
            </div>
        </div>
    );
}