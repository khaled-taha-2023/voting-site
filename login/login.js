const nationalId = document.getElementById('nationalId');
    const birthDate = document.getElementById('birthDate');
    const nationalIdError = document.getElementById('nationalIdError');
    const birthDateError = document.getElementById('birthDateError');
    const submitBtn = document.getElementById('submitBtn');

    // Real-time National ID validation (Allow only numbers)
    nationalId.addEventListener('input', function() {
        // Restrict input to only numbers (No special characters)
        nationalId.value = nationalId.value.replace(/\D/g, ''); // This removes anything that is not a number
        
        // Check if National ID is exactly 14 digits
        const isNationalIdValid = nationalId.value.length === 14;
        if (isNationalIdValid) {
            nationalIdError.style.display = 'none';
        } else {
            nationalIdError.style.display = 'block';
        }

        validateForm(); // Check the form validation status
    });

    // Real-time Birth Date validation
    birthDate.addEventListener('input', function() {
        // Check if Birth Date is not empty
        const isBirthDateValid = birthDate.value.trim() !== "";
        if (isBirthDateValid) {
            birthDateError.style.display = 'none';
        } else {
            birthDateError.style.display = 'block';
        }

        validateForm(); // Check the form validation status
    });

    // Function to enable/disable submit button based on form validity
    function validateForm() {
        const isNationalIdValid = nationalId.value.length === 14;
        const isBirthDateValid = birthDate.value.trim() !== "";

        // Enable/disable submit button based on form validity
        submitBtn.disabled = !(isNationalIdValid && isBirthDateValid);
    }

    // Handle form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Only submit if the button is not disabled
        if (!submitBtn.disabled) {
            window.location.href = '../vote/vote.html'; // Change to your actual success page
        } else {
            console.log('Form is invalid, button is disabled');
        }
    });