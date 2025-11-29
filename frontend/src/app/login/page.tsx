'use client';

import { useState } from 'react';
import { login } from '../../../utils/api/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await login(email, password);
            if (success) {
                alert('로그인 성공!');
                router.push('/');
            }
        } catch (err) {
            alert('에러: ' + err.message);
        }
    };

    return (
        <main style={{ padding: '40px' }}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '240px', gap: '10px' }}>
                    <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">로그인</button>
                </div>
            </form>
        </main>
    );
}
