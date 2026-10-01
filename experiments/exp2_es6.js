/**
 * AptMaintain - Society Maintenance & Utility Calculator (Experiment 2)
 */

// 1. Current Date & Time Display
const getFormattedDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-IN', options);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `[Billing Cycle: ${formattedDate} | Generated at: ${hours}:${minutes}:${seconds} IST]`;
};

// 2. Factorial of Maintenance Bill Due Months
const calculatePenaltyFactorial = (months) => {
    if (months < 0) return 'Invalid month count';
    if (months === 0 || months === 1) return 1;
    let factorial = 1;
    for (let i = 2; i <= months; i++) {
        factorial *= i;
    }
    return factorial;
};

// 3. Flat Maintenance Multiplication Table
const generateMaintenanceTable = (baseRatePerSqFt = 4.5, maxMonths = 6) => {
    console.log(`\n--- Maintenance Charge Schedule (Base Rate: ₹${baseRatePerSqFt}/sq.ft) ---`);
    console.log(`Month(s) \t Flat Area (1000 sq.ft) \t Total Payable (₹)`);
    console.log(`------------------------------------------------------------------`);
    const standardFlatArea = 1000;
    const monthlyBaseCost = baseRatePerSqFt * standardFlatArea;
    Array.from({ length: maxMonths }, (_, index) => index + 1).map((month) => {
        const totalPayable = month * monthlyBaseCost;
        console.log(`${month} Month(s) \t ${standardFlatArea} sq.ft \t\t ₹${totalPayable.toLocaleString('en-IN')}`);
        return totalPayable;
    });
};

// 4. Sum of Society Utility Bills using reduce()
const societyUtilityBills = [
    { id: 'UTIL-01', service: 'Common Area Electricity', amount: 48500 },
    { id: 'UTIL-02', service: 'Municipal & Tanker Water', amount: 32000 },
    { id: 'UTIL-03', service: '24/7 Security Agency Payroll', amount: 65000 },
    { id: 'UTIL-04', service: 'Elevator Maintenance (AMC)', amount: 18500 },
    { id: 'UTIL-05', service: 'Housekeeping & Waste Management', amount: 27000 },
    { id: 'UTIL-06', service: 'CCTV & Fire Safety Inspection', amount: 12000 }
];

const computeTotalUtilityExpenses = (billsArray) => {
    return billsArray.reduce((acc, curr) => acc + curr.amount, 0);
};

// 5. Filtering Overdue Accounts using filter()
const residentAccounts = [
    { flat: 'A-101', resident: 'Amit Deshmukh', dues: 0, overdueMonths: 0 },
    { flat: 'A-204', resident: 'Sunita Rao', dues: 8400, overdueMonths: 2 },
    { flat: 'B-302', resident: 'Karan Mehra', dues: 21000, overdueMonths: 5 },
    { flat: 'B-501', resident: 'Pooja Verma', dues: 0, overdueMonths: 0 },
    { flat: 'C-103', resident: 'Rohan Joshi', dues: 12600, overdueMonths: 3 },
    { flat: 'C-404', resident: 'Vikram Singhania', dues: 33600, overdueMonths: 8 }
];

const getOverdueAccounts = (accounts, minMonthsOverdue = 2) => {
    return accounts.filter((account) => account.overdueMonths >= minMonthsOverdue);
};

// Execution
console.log("==================================================================");
console.log("    APTMAINTAIN: SOCIETY MAINTENANCE & UTILITY CALCULATOR (ES6)   ");
console.log("==================================================================");
console.log(getFormattedDateTime());
console.log(`\n[Penalty Multiplier Analysis]`);
console.log(`Overdue Penalty Factorial for 5 months overdue: 5! = ${calculatePenaltyFactorial(5)}`);

generateMaintenanceTable(4.5, 6);

const totalExpenses = computeTotalUtilityExpenses(societyUtilityBills);
console.log(`\n--- Society Monthly Utility Breakdown ---`);
societyUtilityBills.forEach((bill, idx) => {
    console.log(`${idx + 1}. [${bill.id}] ${bill.service.padEnd(35)} : ₹${bill.amount.toLocaleString('en-IN')}`);
});
console.log(`------------------------------------------------------------------`);
console.log(`Total Society Utility Expenditure (via reduce): ₹${totalExpenses.toLocaleString('en-IN')}`);

const defaulters = getOverdueAccounts(residentAccounts, 2);
console.log(`\n--- Delinquent Resident Accounts (>= 2 Months Overdue) ---`);
console.log(`Found ${defaulters.length} accounts matching criteria:\n`);
defaulters.map((acc) => {
    const penalty = Math.round(acc.dues * 0.05 * acc.overdueMonths);
    console.log(`• Flat ${acc.flat} (${acc.resident}) | Dues: ₹${acc.dues} | Overdue: ${acc.overdueMonths} Mos | Penalty (5%/mo): ₹${penalty} | Total: ₹${acc.dues + penalty}`);
});
console.log("==================================================================");
