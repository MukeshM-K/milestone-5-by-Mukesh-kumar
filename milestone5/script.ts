// Event listener for the form submission
document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const usernameElement = document.getElementById("username") as HTMLInputElement;

    // Check if all input elements are available
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const username = usernameElement.value;
        const uniquePath = `resume/${username.replace(/\s+/g, '_')}_cv.html`;

        const profilePictureFile = profilePictureInput.files?.[0];

        // If a profile picture is uploaded, read it as a Data URL
        if (profilePictureFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64Image = e.target?.result as string;
                generateResume(base64Image, name, email, phone, education, experience, skills, uniquePath); // Pass all necessary data to generateResume
            };
            reader.readAsDataURL(profilePictureFile);
        } else {
            // Call generateResume without a profile picture if none is uploaded
            generateResume('', name, email, phone, education, experience, skills, uniquePath);
        }
    }
});

// Function to generate the resume HTML with embedded CSS
const generateResume = (
    profilePictureURL: string,
    name: string,
    email: string,
    phone: string,
    education: string,
    experience: string,
    skills: string,
    uniquePath: string
) => {
    // CSS styles embedded within the generated HTML
    const embeddedStyles = `
    <style>
        .profilePicture {
            max-width: 150px;
            max-height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 10px;
            display: block;
        }
        .editable {
            cursor: pointer;
            color: #333;
        }
        .download-button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #4CAF50;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s ease, transform 0.2s ease;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .download-button:hover {
            background-color: #45a049;
            transform: translateY(-2px);
        }
        .download-button:focus {
            outline: 2px solid #2e7d32;
            outline-offset: 2px;
        }
        .download-button:active {
            transform: translateY(1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .share-link {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 10px;
            margin-left: 10px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #2196F3;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s ease, transform 0.2s ease;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .share-link:hover {
            background-color: #1976D2;
            transform: translateY(-2px);
        }
        .share-link:focus {
            outline: 2px solid #1565C0;
            outline-offset: 2px;
        }
        .share-link:active {
            transform: translateY(1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
    </style>
    `;

    // Resume content including embedded styles
    const resumeOutput = `
    ${embeddedStyles}
    <h2>Resume</h2>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
    <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
    <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
    <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>

    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>

    <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>

    <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skills}</p>
    `;

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
    downloadLink.download = uniquePath;
    downloadLink.textContent = 'Download Your Resume';
    downloadLink.classList.add('download-button');

    // Simulate a shareable link generation
    const shareLink = document.createElement('a');
    const simulatedURL = window.URL.createObjectURL(new Blob([resumeOutput], { type: 'text/html' }));
    shareLink.href = simulatedURL;
    shareLink.textContent = 'Get Shareable Link';
    shareLink.classList.add('share-link');
    shareLink.target = '_blank'; // Open the link in a new tab

    // Append the resume to the output section
    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.appendChild(downloadLink);
        resumeOutputElement.appendChild(shareLink); // Add the shareable link
    }

    makeEditable();
};

// Function to make fields editable by clicking
function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
