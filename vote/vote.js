// Toggle button to choose kind of questions
function toggleVoteType(voteType) {
    const regularVote = document.getElementById('regularVote');
    const cumulativeVote = document.getElementById('cumulativeVote');
    const questionsContainer = document.getElementById('questionsContainer');

    // Clear previous questions before adding new ones
    questionsContainer.innerHTML = '';

    // If regularVote is checked, uncheck cumulativeVote, and vice versa
    if (voteType === 'regularVote') {
        if (regularVote.checked) {
            cumulativeVote.checked = false;
            generateQuestions(false);  // Regular vote type
        }
    } else if (voteType === 'cumulativeVote') {
        if (cumulativeVote.checked) {
            regularVote.checked = false;
            generateQuestions(true);  // Cumulative vote type
        }
    }
}

// Function to dynamically generate questions based on vote type
function generateQuestions(isCumulativeVote) {
    const questionsContainer = document.getElementById('questionsContainer');
    const numQuestions = 5;  // Number of questions
    const optionsPerQuestion = 3;  // Number of options per question

    // Loop to create multiple questions dynamically
    for (let i = 1; i <= numQuestions; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('form-group');

        // Create label for the question
        const questionLabel = document.createElement('label');
        questionLabel.innerHTML = `السؤال ${i}: اختر خيارًا واحدًا`;
        questionLabel.setAttribute('for', `question${i}`);  // Add 'for' attribute for accessibility

        // Append the question label to the question div
        questionDiv.appendChild(questionLabel);

        // Loop to create options dynamically
        for (let j = 1; j <= optionsPerQuestion; j++) {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('form-check');
            
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';  // Use radio button for single choice
            optionInput.name = `question${i}`;  // Same name for all radio buttons in the question
            optionInput.classList.add('form-check-input');
            optionInput.id = `option${i}${j}`;
            optionInput.value = `الخيار ${j}`;

            const optionLabel = document.createElement('label');
            optionLabel.classList.add('form-check-label');
            optionLabel.setAttribute('for', `option${i}${j}`);
            optionLabel.innerHTML = `الخيار ${j}`;


            optionDiv.appendChild(optionInput);
            optionDiv.appendChild(optionLabel);
              
            // Add degree input if it is cumulative vote
              if (isCumulativeVote) {
                const degreeInput = document.createElement('input');
                degreeInput.type = 'number';
                degreeInput.classList.add('degree-input');
                degreeInput.id = `degree${i}${j}`;
                degreeInput.placeholder = 'درجة';
                degreeInput.min = 1;  // Minimum value
                degreeInput.max = 5;  // Maximum value
                degreeInput.step = 1; // Step value (increments by 1)

                optionDiv.appendChild(degreeInput);  // Append degree input to the option div
            }
            // Append option to the questionDiv
            questionDiv.appendChild(optionDiv);
        }

        // Append the questionDiv to the questionsContainer
        questionsContainer.appendChild(questionDiv);
    }
}


function submitData(event) {
    event.preventDefault(); // Prevents the default submit behavior

    const questionsContainer = document.getElementById('questionsContainer');
    const questionsData = [];

    // Gather selected options and degree values
    for (let i = 1; i <= 5; i++) {
        const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
        
        if (selectedOption) {
            const optionId = selectedOption.id;
            const degreeInput = document.getElementById(`degree${optionId.slice(-2)}`);
            const degreeValue = degreeInput ? degreeInput.value : null;

            questionsData.push({
                questionId: `question${i}`,
                selectedOption: selectedOption.value,
                degree: degreeValue,
            });
        }
    }
    // Get canvas image data
    const canvas = document.getElementById('signature-pad');
    let imageData = null;
    if (canvas) {
        imageData = canvas.toDataURL('image/png');
        console.log(imageData)
    } else {
        console.error("Canvas element with id 'yourCanvasId' not found.");
    }

    // Combine data into a single object
    const dataToSend = {
        questions: questionsData,
        canvasImage: imageData,
    };

    console.log(dataToSend);


    // Send data to API
    fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', data);
        window.location.href = '../login/login.html'; // Change to your actual success page

    });
}

// Initialize default view
document.addEventListener('DOMContentLoaded', () => {
    const regularVote = document.getElementById('regularVote');
    if (regularVote.checked) {
        generateQuestions(false);
    }
});        
