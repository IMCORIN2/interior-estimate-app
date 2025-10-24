export default function BudgetModal() {
    const budgetList = [
        '1천만원대',
        '2천만원대',
        '3천만원대',
        '4천만원대',
        '5천만원대',
        '6천만원대',
        '7천만원 이상',
        '1억원 이상',
    ];

    return budgetList.map((budget) => (
        <label key={budget} style={{ display: 'block' }}>
            <input type="checkbox"></input>
            {budget}
        </label>
    ));
}
