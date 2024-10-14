class Account {
    constructor() {
        this.total = 0;
    }

    deposit(amount) {
        this.total += amount;
        this.updateOutput(`You have deposited ₹${amount}.`);
        this.showBalance();
    }

    withdraw(amount) {
        if (amount <= this.total) {
            this.total -= amount;
            this.updateOutput(`You have withdrawn ₹${amount}.`);
            this.showBalance();
        } else {
            this.updateOutput("Insufficient balance for withdrawal.");
        }
    }

    showBalance() {
        setTimeout(() => {
            this.updateOutput(`Current balance: ₹${this.total}`);
        }, 3000);
    }

    isValidAmount(amount) {
        return !isNaN(amount) && amount > 0;
    }

    updateOutput(message) {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML += `<p>${message}</p>`;
        outputDiv.scrollTop = outputDiv.scrollHeight; 
    }

    promptUser() {
        const actionInput = document.getElementById('action');
        const amountInput = document.getElementById('amount');
        const submitButton = document.getElementById('submit');
        const exitButton = document.getElementById('exit');

        submitButton.addEventListener('click', () => {
            let action = actionInput.value.toLowerCase();
            let amount = parseFloat(amountInput.value);

            if (action === 'deposit') {
                if (this.isValidAmount(amount)) {
                    this.deposit(amount);
                } else {
                    this.updateOutput("Invalid amount. Please enter a positive number.");
                }
            } else if (action === 'withdraw') {
                if (this.isValidAmount(amount)) {
                    this.withdraw(amount);
                } else {
                    this.updateOutput("Invalid amount. Please enter a positive number.");
                }
            } else {
                this.updateOutput("Invalid action. Please type 'Deposit' or 'Withdraw'.");
            }

            actionInput.value = ''; 
            amountInput.value = ''; 
        });

        exitButton.addEventListener('click', () => {
            this.updateOutput('Transaction ended. Final balance: ₹' + this.total);
            actionInput.disabled = true; 
            amountInput.disabled = true; 
            submitButton.disabled = true; 
        });
    }
}


const account = new Account();
account.promptUser();
