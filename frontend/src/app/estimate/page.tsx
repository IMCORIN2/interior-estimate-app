'use client';
import ChatBot from './components/Chatbot';

export default function EstimatePage() {
    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // 세로 가운데
                alignItems: 'center', // 가로 가운데
                minHeight: '100vh', // 화면 전체 높이 사용
                backgroundColor: '#f9f9f9',
                textAlign: 'center',
                gap: '2rem', // 섹션 간 간격
            }}
        >
            <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>간편 인테리어 견적</h1>
            </div>

            <div
                style={{
                    width: '600px',
                    height: '800px',
                    border: '2px solid #ccc',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
            >
                <ChatBot></ChatBot>
            </div>
        </main>
    );
}
