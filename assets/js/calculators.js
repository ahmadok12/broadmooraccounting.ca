/* Broadmoor calculators (Financial Calculators + Insurance pages).
   Mortgage payments use Canadian fixed-rate convention: interest compounded semi-annually, not in advance
   (Interest Act, s.6). Results are estimates only. */
/* ══════════════════════════
   TAB SWITCHING
══════════════════════════ */
function switchTab(panel, btn) {
  document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + panel).classList.add('active');
}

/* ══════════════════════════
   INSURANCE CALCULATOR
══════════════════════════ */
function calculateInsurance() {
  const get = id => parseFloat(document.getElementById(id).value) || 0;

  const finalExpenses  = get('finalExpenses');
  const mortgage       = get('mortgage');
  const debt           = get('debt');
  const emergencyFund  = get('emergencyFund');
  const childEducation = get('childEducation');
  const annualIncome   = get('annualIncome');
  const coveragePeriod = get('coveragePeriod');
  const savings        = get('savings');
  const existingIns    = get('existingInsurance');
  const otherAssets    = get('otherAssets');

  const incomeNeed = annualIncome * coveragePeriod;
  const totalNeeds = finalExpenses + mortgage + debt + emergencyFund + childEducation + incomeNeed;
  const totalAssets = savings + existingIns + otherAssets;
  const coverage = totalNeeds - totalAssets;

  const fmt = n => '$' + Math.abs(Math.round(n)).toLocaleString('en-CA');

  const amtEl = document.getElementById('insuranceAmount');
  amtEl.textContent = (coverage < 0 ? '-' : '') + fmt(coverage);
  amtEl.className = 'result-amount' + (coverage < 0 ? ' negative-coverage' : '');

  const formula = document.getElementById('insuranceFormula');
  formula.innerHTML =
    `<strong>Final Expenses:</strong> ${fmt(finalExpenses)}<br>` +
    `<strong>+ Mortgage:</strong> ${fmt(mortgage)}<br>` +
    `<strong>+ Debts:</strong> ${fmt(debt)}<br>` +
    `<strong>+ Emergency Fund:</strong> ${fmt(emergencyFund)}<br>` +
    `<strong>+ Child Education:</strong> ${fmt(childEducation)}<br>` +
    `<strong>+ Income Replacement</strong> (${fmt(annualIncome)} × ${coveragePeriod} yrs): ${fmt(incomeNeed)}<br>` +
    `<strong>− Savings:</strong> ${fmt(savings)}<br>` +
    `<strong>− Existing Life Insurance:</strong> ${fmt(existingIns)}<br>` +
    `<strong>− Other Assets:</strong> ${fmt(otherAssets)}<br>` +
    `<strong style="color:var(--green)">= Recommended Coverage: ${(coverage < 0 ? '-' : '') + fmt(coverage)}</strong>`;

  const resultBox = document.getElementById('insuranceResult');
  resultBox.classList.remove('visible');
  void resultBox.offsetWidth; // reflow for animation
  resultBox.classList.add('visible');
}

function resetInsurance() {
  ['finalExpenses','mortgage','debt','emergencyFund','childEducation',
   'annualIncome','coveragePeriod','savings','existingInsurance','otherAssets']
    .forEach(id => document.getElementById(id).value = '');
  document.getElementById('insuranceResult').classList.remove('visible');
}

/* ══════════════════════════
   MORTGAGE CALCULATOR
══════════════════════════ */
let amortData = [];

function calculateMortgage() {
  const homePrice    = parseFloat(document.getElementById('homePrice').value) || 0;
  const downPct      = parseFloat(document.getElementById('downPayment').value) || 0;
  const termYears    = parseInt(document.getElementById('loanTerm').value) || 0;
  const annualRate   = parseFloat(document.getElementById('interestRate').value) || 0;

  if (homePrice <= 0 || termYears <= 0) return;

  const downAmount   = homePrice * (downPct / 100);
  const principal    = homePrice - downAmount;
  const monthlyRate  = annualRate > 0 ? Math.pow(1 + annualRate / 200, 1 / 6) - 1 : 0; // Canadian fixed-rate: compounded semi-annually (Interest Act)
  const numPayments  = termYears * 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numPayments;
  } else {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
                     / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const totalCost     = monthlyPayment * numPayments;
  const totalInterest = totalCost - principal;
  const interestPct   = principal > 0 ? (totalInterest / principal * 100).toFixed(1) : 0;

  const fmt = n => '$' + Math.round(n).toLocaleString('en-CA');
  const fmt2 = n => '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  document.getElementById('mrg-monthly').textContent   = fmt2(monthlyPayment);
  document.getElementById('mrg-total').textContent     = fmt(totalCost);
  document.getElementById('mrg-interest').textContent  = fmt(totalInterest);
  document.getElementById('mrg-interest-pct').textContent = interestPct + '% of loan amount';

  // Build yearly amortization
  amortData = [];
  let balance = principal;

  for (let year = 1; year <= termYears; year++) {
    let yearPrincipal = 0;
    let yearInterest  = 0;
    const payments = Math.min(12, numPayments - (year - 1) * 12);

    for (let m = 0; m < payments; m++) {
      const intPayment = balance * monthlyRate;
      const prinPayment = monthlyPayment - intPayment;
      yearInterest  += intPayment;
      yearPrincipal += prinPayment;
      balance -= prinPayment;
      if (balance < 0) balance = 0;
    }

    amortData.push({ year, payment: monthlyPayment * payments, principal: yearPrincipal, interest: yearInterest, balance });
  }

  // Render table
  const tbody = document.getElementById('amortTableBody');
  tbody.innerHTML = amortData.map(row => `
    <tr>
      <td>Year ${row.year}</td>
      <td>${fmt(row.payment)}</td>
      <td>${fmt(row.principal)}</td>
      <td>${fmt(row.interest)}</td>
      <td>${fmt(Math.max(0, row.balance))}</td>
    </tr>
  `).join('');

  // Close schedule on recalculate
  document.getElementById('amortTableWrap').classList.remove('open');
  document.getElementById('amortToggleBtn').textContent = '';
  document.getElementById('amortToggleBtn').innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
    View Yearly Amortization Schedule
  `;

  const resultBox = document.getElementById('mortgageResult');
  resultBox.classList.remove('visible');
  void resultBox.offsetWidth;
  resultBox.classList.add('visible');
}

function toggleAmortization() {
  const wrap = document.getElementById('amortTableWrap');
  const btn  = document.getElementById('amortToggleBtn');
  const isOpen = wrap.classList.toggle('open');
  btn.innerHTML = isOpen
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg> Hide Schedule`
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> View Yearly Amortization Schedule`;
}

function resetMortgage() {
  ['homePrice','downPayment','loanTerm','interestRate']
    .forEach(id => document.getElementById(id).value = '');
  document.getElementById('mortgageResult').classList.remove('visible');
  document.getElementById('amortTableWrap').classList.remove('open');
}
