// Global variables to track counts and history
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

const emergencyServices = [
    { name: "National Emergency Number", number: "999" },
    { name: "Police Helpline Number", number: "999" },
    { name: "Fire Service Number", number: "999" },
    { name: "Ambulance Service", number: "1994-999999" },
    { name: "Women & Child Helpline", number: "109" },
    { name: "Anti-Corruption Helpline", number: "106" },
    { name: "Electricity Helpline", number: "16216" },
    { name: "Brac Helpline", number: "16445" },
    { name: "Bangladesh Railway Helpline", number: "163" }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    setupEnhancedEventListeners();
    updateDisplays();
    clearCallHistory();
});

// Handle heart icon clicks
function handleHeartClick(heartButton) {
    heartCount++;
    updateDisplays();

    heartButton.classList.add('text-red-500');
    setTimeout(() => {
        heartButton.classList.remove('text-red-500');
    }, 300);
}

// Handle copy button clicks
function handleCopyClick(cardIndex) {
    if (cardIndex >= 0 && cardIndex < emergencyServices.length) {
        const service = emergencyServices[cardIndex];
        alert(`Copying ${service.name} number: ${service.number}`);
        navigator.clipboard.writeText(service.number).then(() => {
            console.log(`Successfully copied: ${service.number}`);
            copyCount++;
            updateDisplays();
        }).catch((err) => {
            console.error('Failed to copy:', err);
        });
    }
}

// Handle call button clicks
function handleCallClick(cardIndex) {
    if (cardIndex >= 0 && cardIndex < emergencyServices.length) {
        const service = emergencyServices[cardIndex];

        // Check if user has enough coins
        if (coinCount < 20) {
            alert('Insufficient coins! You need at least 20 coins to make a call.');
            return;
        }

        // Deduct coins
        coinCount -= 20;

        // Show call alert
        alert(`Calling ${service.name} at ${service.number}`);

        // Add to call history
        addToCallHistory(service);

        // Update displays
        updateDisplays();
    }
}

// Add a call to the history
function addToCallHistory(service) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
    });
    const historyItem = {
        name: service.name,
        number: service.number,
        time: timeString,
        timestamp: now.getTime()
    };

    callHistory.unshift(historyItem); // Add to beginning of array
    renderCallHistory();
}

// Render call history
function renderCallHistory() {
    const historyList = document.getElementById('call-history-list');

    if (callHistory.length === 0) {
        historyList.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <p>No calls made yet</p>
            </div>
        `;
        return;
    }

    historyList.innerHTML = callHistory.map(item => `
        <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div>
                <p class="font-semibold text-gray-700">${item.name}</p>
                <p class="text-sm text-gray-500">${item.number}</p>
            </div>
            <span class="text-xs text-gray-500">${item.time}</span>
        </div>
    `).join('');
}

// Clear call history
function clearCallHistory() {
    callHistory = [];
    renderCallHistory();
}

// Update all display counters
function updateDisplays() {
    // Update heart count
    const heartCountElement = document.getElementById('heart-count');
    if (heartCountElement) {
        heartCountElement.textContent = heartCount;
    }

    // Update coin count
    const coinCountElement = document.getElementById('coin-count');
    if (coinCountElement) {
        coinCountElement.textContent = coinCount;
    }

    // Update copy count
    const copyCountElement = document.getElementById('copy-count');
    if (copyCountElement) {
        copyCountElement.textContent = `${copyCount} Copy`;
    }
}



// Enhanced event listener setup with better card detection
function setupEnhancedEventListeners() {
    // Get all service cards
    const serviceCards = document.querySelectorAll('.bg-white.rounded-xl.shadow-sm.border.border-gray-100.p-4');

    serviceCards.forEach((card, index) => {
        // Heart button in each card
        const heartButton = card.querySelector('button svg path[d*="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"]');
        if (heartButton) {
            const button = heartButton.closest('button');
            button.addEventListener('click', () => handleHeartClick(button));
        }

        // Copy and Call buttons
        const buttons = card.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent.includes('Copy')) {
                button.addEventListener('click', () => handleCopyClick(index));
            } else if (button.textContent.includes('Call')) {
                button.addEventListener('click', () => handleCallClick(index));
            }
        });
    });

    // Clear history button
    const clearButton = document.querySelector('aside button');
    if (clearButton && clearButton.textContent.includes('Clear')) {
        clearButton.addEventListener('click', clearCallHistory);
    }
}
