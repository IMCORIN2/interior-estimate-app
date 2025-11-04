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
            setMessages((prev) => [...prev, { role: 'bot', text: '모든 질문이 끝났습니다.' }]);
        }
    };

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

// 🔹 간단한 입력 컴포넌트
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
