'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    function handleLogout() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        try {
            const { exp } = jwtDecode(token);

            if (exp * 1000 > Date.now()) {
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem('token');
            }
        } catch {
            localStorage.removeItem('token');
        }
        // 페이지 경로가 바뀔때마다 실행, [] : 한 번만 실행
    }, [pathname]);
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
                {isLoggedIn ? <button onClick={handleLogout}>로그아웃</button> : <Link href="/login">로그인</Link>}
            </nav>
        </header>
    );
}
