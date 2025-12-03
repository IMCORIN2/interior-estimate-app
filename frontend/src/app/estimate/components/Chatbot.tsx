// src/ChatBot.tsx

'use client';
import { useState } from 'react';
import { flows, ChatFlow, FlowStep, OptionItem } from './chatbotFlow';
import styles from './ChatBot.module.css';

type Msg = { role: 'bot' | 'user'; text: string };

// 서버 전송 DTO와 동일한 구조
type AnswerItem = {
    questionId: number;
    answerId: number | null; // 선택지 없을 경우 (자유 입력) null
    answerContent: string;
};

// 임시 함수: 백엔드 API 호출
async function saveEstimateRequest(answers: AnswerItem[]) {
    // 실제 백엔드 로직에 맞게 URL과 토큰을 수정하세요.
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/estimate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }), // ID 기반 DTO 전송
    });
    if (!res.ok) {
        throw new Error('견적 저장 실패');
    }

    return res.json();
}

export default function ChatBot() {
    const [currentFlow, setCurrentFlow] = useState<keyof ChatFlow>('main');
    const [stepIndex, setStepIndex] = useState(0);
    const [messages, setMessages] = useState<Msg[]>([{ role: 'bot', text: (flows.main as FlowStep).question }]);

    // 💡 ID 기반 답변 저장 State
    const [answers, setAnswers] = useState<AnswerItem[]>([]);

    const flow = Array.isArray(flows[currentFlow]) ? flows[currentFlow] : [flows[currentFlow]];
    const currentStep = flow[stepIndex] as FlowStep;

    // 질문이 끝남과 동시에 서버로 챗봇 결과 전송하는 함수
    function finishFlow() {
        setMessages((prev) => [...prev, { role: 'bot', text: '모든 질문이 끝났습니다.' }]);

        // answers state에 저장된 ID 기반 데이터를 서버로 전송
        console.log('최종 전송 데이터:', answers);
        saveEstimateRequest(answers).then((res) => console.log('견적 저장 완료!', res));
    }

    // 💡 선택된 옵션 제출 함수 (ID 캡처 로직 추가)
    const handleOptionClick = (option: string | OptionItem) => {
        // 1. 선택된 옵션 정보 추출
        const userText = typeof option === 'string' ? option : option.label;
        const optionId = typeof option === 'object' ? option.optionId || null : null;
        const questionId = currentStep.id;

        // 2. 답변 기록 (answers State 업데이트)
        setAnswers((prev) => [
            ...prev,
            {
                questionId: questionId,
                answerId: optionId, // 선택지의 ID (ID 기반)
                answerContent: userText, // 사용자가 선택한 텍스트
            },
        ]);

        // 3. UI 메시지 업데이트
        setMessages((prev) => [...prev, { role: 'user', text: userText }]);

        // 4. 흐름 전환 및 다음 단계 이동 로직
        const nextFlow = typeof option === 'object' && option.next && flows[option.next] ? option.next : null;

        if (nextFlow) {
            // 흐름 전환 발생
            const nextFlowStep = (flows[nextFlow] as FlowStep[])[0];
            setCurrentFlow(nextFlow);
            setStepIndex(0);
            setMessages((prev) => [...prev, { role: 'bot', text: nextFlowStep.question }]);
            return;
        }

        if (stepIndex + 1 < flow.length) {
            // 현재 흐름 내 다음 질문으로 이동
            setStepIndex(stepIndex + 1);
            const nextQ = flow[stepIndex + 1] as FlowStep;
            setMessages((prev) => [...prev, { role: 'bot', text: nextQ.question }]);
        } else {
            // 마지막 질문 완료 (Finish)
            finishFlow();
        }
    };

    // 💡 직접 적은 옵션 제출하는 함수 (ID 캡처 로직 추가)
    const handleInputSubmit = (value: string) => {
        if (!value.trim()) return;

        const questionId = currentStep.id;

        // 1. 답변 기록 (answers State 업데이트) - 자유 입력이므로 answerId는 null
        setAnswers((prev) => [
            ...prev,
            {
                questionId: questionId,
                answerId: null, // 자유 입력
                answerContent: value, // 사용자가 직접 입력한 텍스트
            },
        ]);

        // 2. UI 메시지 업데이트
        setMessages((prev) => [...prev, { role: 'user', text: value }]);

        // 3. 흐름 제어 로직
        if (stepIndex + 1 < flow.length) {
            const nextQ = flow[stepIndex + 1] as FlowStep;
            setStepIndex(stepIndex + 1);
            setMessages((prev) => [...prev, { role: 'bot', text: nextQ.question }]);
        } else {
            // 마지막 질문 완료 (Finish)
            finishFlow();
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
                    {currentStep.options.map((opt: string | OptionItem, idx: number) => {
                        // string 타입의 옵션이 있다면 OptionItem으로 변환 (id는 null로 처리)
                        const item =
                            typeof opt === 'string'
                                ? { label: opt, optionId: null as any } // string 옵션은 optionId를 null로 처리
                                : opt;

                        return (
                            <button key={idx} className={styles.optionButton} onClick={() => handleOptionClick(item)}>
                                {item.label}
                            </button>
                        );
                    })}
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
