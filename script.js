// Configuration
const CONFIG = {
    API_ENDPOINT: 'https://api.exchangerate-api.com/v4/latest',
    UPDATE_INTERVAL: 60000 // 60 seconds
};

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const swapBtn = document.getElementById('swapBtn');
const convertedAmount = document.getElementById('convertedAmount');
const convertedCurrency = document.getElementById('convertedCurrency');
const exchangeRate = document.getElementById('exchangeRate');
const fromCurrencyCode = document.getElementById('fromCurrencyCode');
const toCurrencyCode = document.getElementById('toCurrencyCode');
const lastUpdate = document.getElementById('lastUpdate');
const errorMessage = document.getElementById('errorMessage');
const loadingIndicator = document.getElementById('loadingIndicator');

// Currency Index Elements
const baseCurrencySelect = document.getElementById('baseCurrencySelect');
const baseCurrencyDisplay = document.getElementById('baseCurrencyDisplay');
const currencyIndexContainer = document.getElementById('currencyIndexContainer');
const indexError = document.getElementById('indexError');

// Currency data
const currencyNames = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Yuan',
    INR: 'Indian Rupee',
    MXN: 'Mexican Peso'
};

// State
let exchangeRates = {};
let previousRates = {};
let lastUpdateTime = null;

/**
 * Initialize the application
 */
function init() {
    // Add event listeners
    amountInput.addEventListener('input', handleConversion);
    fromCurrencySelect.addEventListener('change', handleCurrencyChange);
    toCurrencySelect.addEventListener('change', handleCurrencyChange);
    swapBtn.addEventListener('click', swapCurrencies);
    baseCurrencySelect.addEventListener('change', handleBaseCurrencyChange);

    // Initial fetch
    fetchExchangeRates();

    // Auto-update exchange rates every 60 seconds
    setInterval(fetchExchangeRates, CONFIG.UPDATE_INTERVAL);
}

/**
 * Fetch exchange rates from API
 */
async function fetchExchangeRates() {
    const fromCurrency = fromCurrencySelect.value;
    const baseCurrency = baseCurrencySelect.value;

    try {
        showLoading(true);
        hideError();

        // Fetch rates for converter
        const response = await fetch(`${CONFIG.API_ENDPOINT}/${fromCurrency}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        previousRates = { ...exchangeRates };
        const data = await response.json();
        exchangeRates = data.rates;
        lastUpdateTime = new Date();

        showLoading(false);
        handleConversion();
        updateCurrencyIndex();
        updateLastUpdateTime();
    } catch (error) {
        showLoading(false);
        showError(`Failed to fetch exchange rates: ${error.message}`);
        console.error('API Error:', error);
    }
}

/**
 * Handle currency conversion
 */
function handleConversion() {
    const amount = parseFloat(amountInput.value) || 0;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount < 0) {
        convertedAmount.textContent = '0.00';
        return;
    }

    const rate = exchangeRates[toCurrency];

    if (rate === undefined) {
        showError('Exchange rate not available');
        convertedAmount.textContent = '0.00';
        return;
    }

    const converted = (amount * rate).toFixed(2);
    convertedAmount.textContent = converted;
    convertedCurrency.textContent = toCurrency;

    // Update exchange rate display
    const displayRate = rate.toFixed(4);
    exchangeRate.textContent = displayRate;
    fromCurrencyCode.textContent = fromCurrency;
    toCurrencyCode.textContent = toCurrency;
}

/**
 * Handle currency selection change
 */
function handleCurrencyChange() {
    fetchExchangeRates();
}

/**
 * Handle base currency change for index
 */
function handleBaseCurrencyChange() {
    baseCurrencyDisplay.textContent = baseCurrencySelect.value;
    updateCurrencyIndex();
}

/**
 * Update the currency index display
 */
function updateCurrencyIndex() {
    const baseCurrency = baseCurrencySelect.value;
    
    try {
        hideIndexError();
        currencyIndexContainer.innerHTML = '';

        // Get all supported currencies
        const supportedCurrencies = Object.keys(currencyNames);

        // Fetch rates for base currency
        fetch(`${CONFIG.API_ENDPOINT}/${baseCurrency}`)
            .then(response => {
                if (!response.ok) throw new Error(`API Error: ${response.status}`);
                return response.json();
            })
            .then(data => {
                const rates = data.rates;

                // Display rates for all supported currencies
                supportedCurrencies.forEach(currency => {
                    if (rates[currency]) {
                        const rate = rates[currency];
                        const previousRate = previousRates[currency] || rate;
                        
                        // Determine if rate went up or down
                        const rateChange = ((rate - previousRate) / previousRate * 100).toFixed(2);
                        const isUp = rate >= previousRate;
                        
                        // Create card
                        const card = document.createElement('div');
                        card.className = 'currency-rate-card';
                        
                        const changeText = isUp ? `↑ ${rateChange}%` : `↓ ${rateChange}%`;
                        const changeClass = isUp ? 'up' : 'down';
                        
                        card.innerHTML = `
                            <div class="currency-code">${currency}</div>
                            <div class="currency-rate-value">${rate.toFixed(4)}</div>
                            <div class="currency-name">${currencyNames[currency]}</div>
                            <div class="rate-change ${changeClass}">${changeText}</div>
                        `;
                        
                        currencyIndexContainer.appendChild(card);
                    }
                });
            })
            .catch(error => {
                showIndexError(`Failed to fetch index rates: ${error.message}`);
                console.error('Index API Error:', error);
            });
    } catch (error) {
        showIndexError(`Error updating currency index: ${error.message}`);
        console.error('Index Error:', error);
    }
}

/**
 * Swap currencies
 */
function swapCurrencies() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;

    handleCurrencyChange();
}

/**
 * Show loading indicator
 */
function showLoading(show) {
    if (show) {
        loadingIndicator.classList.add('show');
    } else {
        loadingIndicator.classList.remove('show');
    }
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

/**
 * Show index error message
 */
function showIndexError(message) {
    indexError.textContent = message;
    indexError.classList.add('show');
}

/**
 * Hide index error message
 */
function hideIndexError() {
    indexError.classList.remove('show');
    indexError.textContent = '';
}

/**
 * Update last update time display
 */
function updateLastUpdateTime() {
    if (lastUpdateTime) {
        const now = new Date();
        const diffSeconds = Math.floor((now - lastUpdateTime) / 1000);

        let timeText;
        if (diffSeconds < 60) {
            timeText = 'Just now';
        } else if (diffSeconds < 3600) {
            const minutes = Math.floor(diffSeconds / 60);
            timeText = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            const hours = Math.floor(diffSeconds / 3600);
            timeText = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }

        lastUpdate.textContent = `Last updated: ${timeText}`;
    }
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Update the "last update" time every 10 seconds
setInterval(updateLastUpdateTime, 10000);
