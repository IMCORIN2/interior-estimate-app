'use client';
import { useState } from 'react';
import './cases.css';
import SpaceModal from './SpaceModal';
import BudgetModal from './budgetModal';
import LocationModal from './locationModal';
import SizeModal from './sizeModal';

export default function CasePage() {
    // 시공사례 샘플 데이터
    const [cases] = useState([
        {
            id: 1,
            title: '쌍둥이 육아를 위한 키친',
            style: 'modern',
            size: '55',
            location: '경기도 고양시 덕양구',
            company: '파란하우징',
        },
        {
            id: 2,
            title: '50대 노배우의 거실',
            style: 'wood',
            size: '198',
            location: '서울특별시 강남구',
            company: '빨강하우징',
        },
        {
            id: 3,
            title: '감성과 실용의 조화, 살림에 진심인 키친',
            style: 'modern',
            size: '269',
            location: '경기도 부천시 원미구',
            company: '노랑하우징',
        },
        {
            id: 4,
            title: '감성과 실용의 조화, 살림에 진심인 키친',
            style: 'modern',
            size: '269',
            location: '경기도 부천시 원미구',
            company: '청록하우징',
        },
        {
            id: 5,
            title: '감성과 실용의 조화, 살림에 진심인 키친',
            style: 'modern',
            size: '269',
            location: '경기도 부천시 원미구',
            company: '초록하우징',
        },
        {
            id: 6,
            title: '감성과 실용의 조화, 살림에 진심인 키친',
            style: 'modern',
            size: '269',
            location: '경기도 부천시 원미구',
            company: '하양하우징',
        },
    ]);
    // 주메뉴 Hover
    const [locationHover, setlocationHover] = useState(false);
    const [sizeHover, setsizeHover] = useState(false);
    const [spaceHover, setspaceHover] = useState(false);
    const [budgetHover, setbudgetHover] = useState(false);
    const [allHover, setallHover] = useState(false);

    // 전체 filter Hover
    const [filterLocation, setfilterLocation] = useState(false);
    const [filterSize, setfilterSize] = useState(false);
    const [filterSpace, setfilterSpace] = useState(false);
    const [filterBudget, setfilterBudget] = useState(false);

    return (
        <main style={{ padding: '2rem' }}>
            {allHover && (
                <>
                    <div
                        className="overlay"
                        onClick={() => {
                            setallHover(false);
                            setfilterLocation(false);
                            setfilterSize(false);
                            setfilterSpace(false);
                            setfilterBudget(false);
                        }}
                    ></div>
                    <div className="all-modal">
                        <h3>필터</h3>
                        <span>zz</span>
                        <button
                            onClick={() => {
                                setallHover(false);
                                setfilterLocation(false);
                                setfilterSize(false);
                                setfilterSpace(false);
                                setfilterBudget(false);
                            }}
                        >
                            닫기 버튼
                        </button>
                        <button className="filter-btn" onClick={() => setfilterLocation(!filterLocation)}>
                            지역
                        </button>
                        {filterLocation && <LocationModal></LocationModal>}
                        <button className="filter-btn" onClick={() => setfilterSize(!filterSize)}>
                            평형대
                        </button>
                        {filterSize && <SizeModal></SizeModal>}
                        <button className="filter-btn" onClick={() => setfilterSpace(!filterSpace)}>
                            공간
                        </button>
                        {filterSpace && <SpaceModal></SpaceModal>}
                        <button className="filter-btn" onClick={() => setfilterBudget(!filterBudget)}>
                            예산
                        </button>
                        {filterBudget && <BudgetModal></BudgetModal>}
                        <div className="all-modal-menu">
                            <button
                                onClick={() => {
                                    // 모든 탭 닫기
                                    setfilterLocation(false);
                                    setfilterSize(false);
                                    setfilterSpace(false);
                                    setfilterBudget(false);
                                    // 나중에 filter list 만들건데, 거기에 저장되어 있는 임시 list도 삭제
                                }}
                            >
                                초기화
                            </button>
                            <button
                                onClick={() => {
                                    setallHover(false);
                                    // 추가적으로 filter list에 들어간 애들 filter해서 페이지에 보여주는 기능
                                }}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </>
            )}
            <h1>시공 사례</h1>
            <div className="grid-button">
                <div className="all-div">
                    <button className="all-btn" onClick={() => setallHover(true)}>
                        모든필터
                    </button>
                </div>

                <div
                    className="location-div"
                    onMouseEnter={() => setlocationHover(true)}
                    onMouseLeave={() => setlocationHover(false)}
                >
                    <button className="location-btn" onClick={() => alert('버튼2')}>
                        지역
                    </button>
                    {/* 지역에 마우스 올라갈 때만 모달 보이기 */}
                    {locationHover && (
                        <div className="location-modal">
                            <LocationModal></LocationModal>
                        </div>
                    )}
                </div>
                <div
                    className="size-div"
                    onMouseEnter={() => setsizeHover(true)}
                    onMouseLeave={() => setsizeHover(false)}
                >
                    <button onClick={() => alert('버튼3')}>평형대</button>
                    {sizeHover && (
                        <div className="size-modal">
                            <SizeModal></SizeModal>
                        </div>
                    )}
                </div>
                <div
                    className="space-div"
                    onMouseEnter={() => setspaceHover(true)}
                    onMouseLeave={() => setspaceHover(false)}
                >
                    <button onClick={() => alert('버튼4')}>공간</button>
                    {spaceHover && (
                        <div className="space-modal">
                            <h4>공간선택</h4>
                            <SpaceModal></SpaceModal>
                        </div>
                    )}
                </div>
                <div
                    className="budget-div"
                    onMouseEnter={() => setbudgetHover(true)}
                    onMouseLeave={() => {
                        setTimeout(() => setbudgetHover(false), 300);
                    }}
                >
                    <button onClick={() => alert('버튼5')}>예산</button>
                    {budgetHover && (
                        <div className="budget-modal">
                            <p>예산 선택</p>
                            <BudgetModal></BudgetModal>
                        </div>
                    )}
                </div>
            </div>

            <p>평수별 / 건물유형별 / 금액대별 시공 사례 예시</p>
            <div className="grid-container">
                {cases.map((data) => {
                    return (
                        <div key={data.id} className="case-card">
                            {/* 나중에 api 이미지로 대체(이미지 주소로 삽입) */}
                            <img src={`/case${data.id}.jpg`} alt={data.title} className="case-image" />
                            <div className="case-info">
                                <div>
                                    <span>{data.size}</span>
                                    <span>{data.location}</span>
                                </div>

                                <h4>{data.title}</h4>
                                <p>{data.company}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
