'use client';

import { useState } from 'react';
import { FaHome, FaComments, FaHammer } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (!query.trim()) return;
        alert(`${query}의 인테리어 시세를 검색합니다!`);
    };

    return (
        <main
            style={{
                padding: '2rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f9f9f9',
            }}
        >
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'black' }}>Yoon's Interior</h1>

            {/* 검색창 */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="지역 또는 아파트명을 입력하세요"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        width: '250px',
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                    }}
                >
                    검색
                </button>
            </div>

            {/* 아이콘 버튼 영역 */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                <button style={buttonStyle} onClick={() => router.push('/estimate')}>
                    <span style={{ marginTop: '0.5rem', color: 'black' }}>손쉬운 견적</span>
                </button>

                <button style={buttonStyle} onClick={() => router.push('/cases')}>
                    <span style={{ marginTop: '0.5rem', color: 'black' }}>시공 사례</span>
                </button>

                <button style={buttonStyle} onClick={() => router.push('/company')}>
                    <span style={{ marginTop: '0.5rem', color: 'black' }}>시공사</span>
                </button>
            </div>
        </main>
    );
}

const buttonStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    width: '100px',
    height: '100px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};
