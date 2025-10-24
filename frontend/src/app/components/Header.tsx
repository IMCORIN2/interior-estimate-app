'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                borderBottom: '1px solid #ddd',
                backgroundColor: '#fff',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            }}
        >
            <h1 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                <Link href="/">Yoon’s Interior</Link>
            </h1>

            <nav style={{ display: 'flex', gap: '1.5rem' }}>
                <Link href="/">홈</Link>
                <Link href="/company">회사소개</Link>
                <Link href="/estimate">견적</Link>
                <Link href="/cases">시공사례</Link>
                <Link href="/contact">문의</Link>
            </nav>
        </header>
    );
}
