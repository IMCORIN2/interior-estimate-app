'use client';
import { useState } from 'react';
import { flows } from './chatbotFlow';
import styles from './ChatBot.module.css';

type Msg = { role: 'bot' | 'user'; text: string };

export default function ChatBot() {
    const [currentFlow, setCurrentFlow] = useState('main'); // 현재 흐름 (main, wallpaper, floor 등)
    const [stepIndex, setStepIndex] = useState(0); // 현재 질문 단계
    const [messages, setMessages] = useState<Msg[]>([{ role: 'bot', text: flows.main.question }]);

    const flow = Array.isArray(flows[currentFlow]) ? flows[currentFlow] : [flows[currentFlow]];
    const currentStep = flow[stepIndex];
    // 질문이 끝남과 동시에 서버로 챗봇 결과 전송하는 함수
    function finishFlow(userText: string) {
        const finalMsg = [
            ...messages,
            { role: 'user', text: userText },
            { role: 'bot', text: '모든 질문이 끝났습니다.' },
        ];
        const answers = makeAnswers(finalMsg);
        saveEstimateRequest(answers).then((res) => console.log('견적 저장 완료!', res));
    }

    // 선택된 옵션 제출 함수
    const handleOptionClick = (option: any) => {
        const userText = typeof option === 'string' ? option : option.label;
        setMessages((prev) => [...prev, { role: 'user', text: userText }]);

        // 흐름 전환 (도배/장판 or 바닥 등)
        if (typeof option === 'object' && option.next && flows[option.next]) {
            setCurrentFlow(option.next);
            setStepIndex(0);
            setMessages((prev) => [...prev, { role: 'bot', text: flows[option.next][0].question }]);
            return;
        }

        // 현재 흐름의 다음 질문으로 이동
        if (stepIndex + 1 < flow.length) {
            setStepIndex(stepIndex + 1);
            const nextQ = flow[stepIndex + 1];
            setMessages((prev) => [...prev, { role: 'bot', text: nextQ.question }]);
        } else {
            // 마지막 질문
            setMessages((prev) => [...prev, { role: 'bot', text: '모든 질문이 끝났습니다.' }]);

            // 질문이 끝남과 동시에 서버로 챗봇 결과 전송
            finishFlow(userText);
        }
    };

    // 직접 적은 옵션 제출하는 함수
    const handleInputSubmit = (value: string) => {
        if (!value.trim()) return;
        setMessages((prev) => [...prev, { role: 'user', text: value }]);
        if (stepIndex + 1 < flow.length) {
            const next = flow[stepIndex + 1];
            setStepIndex(stepIndex + 1);
            setMessages((prev) => [...prev, { role: 'bot', text: next.question }]);
        } else {
            setMessages((prev) => [...prev, { role: 'bot', text: '모든 질문이 끝났습니다.' }]);
        }
    };

    return (
        <div className={styles.chatContainer}>
            {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'bot' ? styles.botMessage : styles.userMessage}>
                    {msg.text}
                </div>
            ))}

            {/* 옵션 버튼 or 입력란 표시 */}
            {currentStep?.options ? (
                <div className={styles.optionGroup}>
                    {currentStep.options.map((opt: any, idx: number) => (
                        <button key={idx} className={styles.optionButton} onClick={() => handleOptionClick(opt)}>
                            {typeof opt === 'string' ? opt : opt.label}
                        </button>
                    ))}
                </div>
            ) : currentStep?.input ? (
                <InputBox onSubmit={handleInputSubmit} />
            ) : null}
        </div>
    );
}

// 간단한 입력 컴포넌트
function InputBox({ onSubmit }: { onSubmit: (val: string) => void }) {
    const [value, setValue] = useState('');
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(value);
                setValue('');
            }}
            className={styles.inputForm}
        >
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="입력하세요..."
                className={styles.inputBox}
            />
            <button type="submit" className={styles.submitButton}>
                보내기
            </button>
        </form>
    );
}

// Chatbot 질문 -> 백엔드 DB 형태로 변환
function makeAnswers(messages) {
    const answer = [];
    for (let i = 0; i < messages.length - 1; i++) {
        if (messages[i].role == 'bot' && messages[i + 1]?.role == 'user') {
            answer.push({
                question: messages[i].text,
                answer: messages[i + 1].text,
            });
        }
    }
    return answer;
}

// 정제된 질문 -> DB에 저장
async function saveEstimateRequest(answers) {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/estimate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
    });

    if (!res.ok) {
        throw new Error('견적 저장 실패');
    }

    return res.json();
}
