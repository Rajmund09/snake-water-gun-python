async function makeChoice(choice) {
    const choicesContainer = document.querySelector('.choices');
    const resultDisplay = document.getElementById('result-display');
    const userPickText = document.getElementById('user-pick-text');
    const computerPickText = document.getElementById('computer-pick-text');
    const resultText = document.getElementById('result-text');

    // Add loading state or feedback
    document.getElementById(choice).style.borderColor = 'var(--accent-blue)';
    
    try {
        const response = await fetch('/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ choice: choice }),
        });

        const data = await response.json();

        if (data.error) {
            alert('Something went wrong!');
            return;
        }

        // Hide choices and show result
        choicesContainer.classList.add('hidden');
        resultDisplay.classList.remove('hidden');

        // Update UI with results
        userPickText.innerText = data.user_choice;
        computerPickText.innerText = data.computer_choice;

        // Reset classes
        resultText.classList.remove('win-text', 'lose-text', 'draw-text');

        if (data.result === 'win') {
            resultText.innerText = 'You Win!';
            resultText.classList.add('win-text');
        } else if (data.result === 'lose') {
            resultText.innerText = 'You Lose!';
            resultText.classList.add('lose-text');
        } else {
            resultText.innerText = "It's a Draw";
            resultText.classList.add('draw-text');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Could not connect to the server.');
    }
}

function resetGame() {
    const choicesContainer = document.querySelector('.choices');
    const resultDisplay = document.getElementById('result-display');
    
    // Reset cards border
    document.querySelectorAll('.choice-card').forEach(card => {
        card.style.borderColor = 'var(--card-border)';
    });

    resultDisplay.classList.add('hidden');
    choicesContainer.classList.remove('hidden');
}
