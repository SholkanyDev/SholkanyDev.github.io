const textArea = document.getElementById('custom-text-area');
const requirements = document.getElementById('requirements');

function hasTwoUppercaseOneLowercase(str) {
    let uppercaseCount = 0;
    let lowercaseCount = 0;

    for (let char of str) {
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
            uppercaseCount++;
        } else if (char === char.toLowerCase() && char !== char.toUpperCase()) {
            lowercaseCount++;
        }
    }
    return uppercaseCount >= 2 && lowercaseCount >= 1;
}

function hasFourDifferentNumbers(input) {
    const uniqueNumbers = new Set();
    for (const char of input) {
        if (!isNaN(char) && char.trim() !== "") {
            uniqueNumbers.add(char);
        }
        if (uniqueNumbers.size === 4) {
            return true;
        }
    }
    return uniqueNumbers.size === 4;
}

function hasTwoDifferentSpecialCharacters(input) {
    const specialChars = new Set("!@#$%^&*()_+[]{}|;:',.<>?/`~\\\"-=");
    const uniqueSpecials = new Set();

    for (const char of input) {
        if (specialChars.has(char)) {
            uniqueSpecials.add(char);
        }
        if (uniqueSpecials.size >= 2) {
            return true;
        }
    }
    return uniqueSpecials.size >= 2;
}
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function containsPrime(str) {
    // Extract all numbers from the string
    const numbers = str.match(/\d+/g);

    // Check if any number is prime
    if (numbers) {
        for (let numStr of numbers) {
            const num = parseInt(numStr, 10);
            if (isPrime(num)) {
                return true;
            }
        }
    }
    return false;
}
function containsDayOfWeek(str) {
    // List of all days of the week in lower case
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    str = str.toLowerCase()
    // Check if the string contains any of the days of the week
    for (let day of daysOfWeek) {
        if (str.includes(day)) {
            return true;
        }
    }

    return false;
}
function isEven(num) {
    return num % 2 === 0;
}

function containsConsecutiveEvenDigits(str) {
    // Check for three consecutive even digits
    for (let i = 0; i < str.length - 2; i++) {
        // Extract three consecutive digits and check if they are all even
        const digit1 = parseInt(str[i]);
        const digit2 = parseInt(str[i + 1]);
        const digit3 = parseInt(str[i + 2]);

        if (isEven(digit1) && isEven(digit2) && isEven(digit3)) {
            return true;
        }
    }

    return false;
}
function isPalindrome(str) {
    // Check if the string is a palindrome and has at least 3 characters
    return str.length >= 3 && str === str.split('').reverse().join('');
}

function containsPalindrome(str) {
    // Check for palindromes of at least three characters
    for (let i = 0; i < str.length - 2; i++) {
        for (let len = 3; len <= str.length - i; len++) {
            const substring = str.substring(i, i + len);
            if (isPalindrome(substring)) {
                return true;
            }
        }
    }

    return false;
}
function containsGreekCharacter(password) {
    // Regular expression to check for Greek characters
    const greekRegex = /[\u03B1-\u03C9\u0391-\u03A9\u03B2\u03C6\u03C1\u03C3\u03A4\u03C8\u03A3\u03A5\u0396\u03A5\u0398]/;

    // Check if the password contains at least one Greek character
    return greekRegex.test(password);
}
// Define rules
const rules = [
    { id: 'length-requirement', text: 'Your password must be at least 14 characters long.', check: (value) => value.length >= 14 },
    { id: 'uppercase-requirement', text: 'Must include at least two uppercase letters and one lowercase letter.', check: (value) => hasTwoUppercaseOneLowercase(value) },
    { id: 'number-requirement', text: 'Must have at least 4 different numbers.', check: (value) => hasFourDifferentNumbers(value) },
    { id: 'special-requirement', text: 'Must have at least 2 different special characters.', check: (value) => hasTwoDifferentSpecialCharacters(value) },
    { id: 'prime-requirement', text: 'Must have a prime number.', check: (value) => containsPrime(value) },
    { id: 'dayOfWeek-requirement', text: 'Must have a day of the week.', check: (value) => containsDayOfWeek(value) },
    { id: 'EvenNumSequence-requirement', text: 'Must have a sequence of 3 consecutive even numbers.', check: (value) => containsConsecutiveEvenDigits(value) },
    { id: 'palindrome-requirement', text: 'Must have a palindrome of at least 3 characters.', check: (value) => containsPalindrome(value) },
    { id: 'greekCharacter-requirement', text: 'Must have a Greek character.', check: (value) => containsGreekCharacter(value) },
];

let currentIndex = 0;

// Initialize requirements dynamically
function initializeRequirements() {
    requirements.innerHTML = ''; // Clear existing requirements

    rules.forEach((rule) => {
        const requirement = document.createElement('div');
        requirement.id = rule.id;
        requirement.className = 'requirement';
        requirement.style.display = 'none'; // Initially hide all requirements
        requirement.style.backgroundColor = 'black'; // Default background color

        const textSpan = document.createElement('span');
        textSpan.className = 'requirement-text';
        textSpan.textContent = rule.text;

        requirement.appendChild(textSpan);
        requirements.appendChild(requirement);
    });
}

initializeRequirements();

async function updateConditions() {
    const value = textArea.value;

    let satisfied = true;
    let lastConditionMet = false;

    // Loop through the rules and check each one
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const requirement = document.getElementById(rule.id);

        // Show the current requirement if it has been satisfied or is part of the current sequence
        if (i <= currentIndex) {
            requirement.style.display = 'block';

            let result = rule.check(value);

            // Handle asynchronous checks
            if (result instanceof Promise) {
                result = await result;
            }

            if (result) {
                requirement.style.backgroundImage = 'url("green_box.svg")';
                requirement.style.color = 'black';
            } else {
                requirement.style.backgroundImage = 'url("red_box.svg")';
                requirement.style.color = 'black';
                satisfied = false; // Mark as unsatisfied if any condition fails
            }
        } else {
            requirement.style.display = 'none'; // Hide conditions that are not yet met
        }
    }

    // If all conditions are satisfied and we are not at the last condition, move to the next
    if (satisfied && currentIndex < rules.length - 1) {
        currentIndex++;
        updateConditions(); // Recursively check for the next condition
        return; // Exit here, so we don't continue checking paywall prematurely
    }

    // If we've reached the last condition and all conditions are satisfied, show the paywall
    if (satisfied && currentIndex === rules.length - 1) {
        lastConditionMet = true;
    }

    // Now that all conditions have been processed, check for the paywall
    if (lastConditionMet) {
        textArea.disabled = true; // Disable the text area when all conditions are met
        document.getElementById('paywall').classList.remove('hidden'); // Show the paywall
    }

    // Optionally reorder the conditions
    reorderConditions(value);
}



function reorderConditions(value) {
    const requirementDivs = Array.from(requirements.children);

    // Separate unsatisfied and satisfied conditions
    const unsatisfiedDivs = [];
    const satisfiedDivs = [];

    for (const div of requirementDivs) {
        const rule = rules.find(rule => rule.id === div.id);
        if (rule) {
            const result = rule.check(value); // Check the rule condition
            if (result) {
                satisfiedDivs.push(div);
            } else {
                unsatisfiedDivs.push(div);
            }
        }
    }

    // Clear the container and append unsatisfied conditions first, then satisfied conditions
    requirements.innerHTML = '';
    unsatisfiedDivs.forEach(div => requirements.appendChild(div)); // Unsatisfied conditions at the top
    satisfiedDivs.forEach(div => requirements.appendChild(div));   // Satisfied conditions at the bottom
}

textArea.addEventListener('input', updateConditions);