// Format numbers with 2 decimal places
function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}

// Main calculation function
function calculatePricing() {
    // Get all input values
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const sourcingPrice = parseFloat(document.getElementById('sourcingPrice').value) || 0;
    const carriage = parseFloat(document.getElementById('carriage').value) || 0;
    const packaging = parseFloat(document.getElementById('packaging').value) || 0;
    const shipping = parseFloat(document.getElementById('shipping').value) || 0;
    const returns = parseFloat(document.getElementById('returns').value) || 0;
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value) || 0;

    // Calculate total cost (per unit)
    const totalCost = sourcingPrice + carriage + packaging + shipping + returns;
    
    // Calculate gross profit (per unit)
    const grossProfit = sellingPrice - totalCost;
    
    // Calculate gross margin percentage
    const grossMargin = sellingPrice ? ((grossProfit / sellingPrice) * 100) : 0;
    
    // Calculate breakeven price
    const breakeven = totalCost;

    // Update display values
    document.getElementById('totalCost').textContent = formatNumber(totalCost);
    document.getElementById('grossProfit').textContent = formatNumber(grossProfit);
    document.getElementById('grossMargin').textContent = formatNumber(grossMargin) + '%';
    document.getElementById('breakeven').textContent = formatNumber(breakeven);

    // Update colors for gross profit
    const grossProfitElement = document.getElementById('grossProfit').parentElement;
    grossProfitElement.classList.remove('positive', 'negative');
    if (grossProfit > 0) {
        grossProfitElement.classList.add('positive');
    } else if (grossProfit < 0) {
        grossProfitElement.classList.add('negative');
    }

    // Update colors for gross margin
    const grossMarginElement = document.getElementById('grossMargin');
    grossMarginElement.classList.remove('positive', 'negative');
    if (grossMargin > 0) {
        grossMarginElement.classList.add('positive');
    } else if (grossMargin < 0) {
        grossMarginElement.classList.add('negative');
    }
}

// Input validation function
function validateInput(input) {
    const value = input.value;
    if (value < 0) {
        input.value = 0;
    }
}

// Initialize the calculator
function initializeCalculator() {
    // Add event listeners to all inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        // Calculate on input change
        input.addEventListener('input', calculatePricing);
        
        // Validate input (prevent negative numbers)
        input.addEventListener('change', () => validateInput(input));
        
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.parentElement.classList.add('highlight');
        });
        
        input.addEventListener('blur', () => {
            if (input.id !== 'sellingPrice') { // Keep highlight for selling price
                input.parentElement.parentElement.classList.remove('highlight');
            }
        });

        // Handle keyboard events
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                calculatePricing();
                input.blur();
            }
        });
    });

    // Initial calculation
    calculatePricing();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCalculator);