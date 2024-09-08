var _a;
// Event listener for the form submission
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var profilePictureInput = document.getElementById("profilePicture");
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var usernameElement = document.getElementById("username");
    // Check if all input elements are available
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        var name_1 = nameElement.value;
        var email_1 = emailElement.value;
        var phone_1 = phoneElement.value;
        var education_1 = educationElement.value;
        var experience_1 = experienceElement.value;
        var skills_1 = skillsElement.value;
        var username = usernameElement.value;
        var uniquePath_1 = "resume/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        // If a profile picture is uploaded, read it as a Data URL
        if (profilePictureFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var base64Image = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                generateResume(base64Image, name_1, email_1, phone_1, education_1, experience_1, skills_1, uniquePath_1); // Pass all necessary data to generateResume
            };
            reader.readAsDataURL(profilePictureFile);
        }
        else {
            // Call generateResume without a profile picture if none is uploaded
            generateResume('', name_1, email_1, phone_1, education_1, experience_1, skills_1, uniquePath_1);
        }
    }
});
// Function to generate the resume HTML with embedded CSS
var generateResume = function (profilePictureURL, name, email, phone, education, experience, skills, uniquePath) {
    // CSS styles embedded within the generated HTML
    var embeddedStyles = "\n    <style>\n        .profilePicture {\n            max-width: 150px;\n            max-height: 150px;\n            border-radius: 50%;\n            object-fit: cover;\n            margin-bottom: 10px;\n            display: block;\n        }\n        .editable {\n            cursor: pointer;\n            color: #333;\n        }\n        .download-button {\n            display: inline-block;\n            padding: 10px 20px;\n            margin-top: 20px;\n            font-size: 16px;\n            font-weight: bold;\n            color: #fff;\n            background-color: #4CAF50;\n            border: none;\n            border-radius: 5px;\n            text-decoration: none;\n            text-align: center;\n            transition: background-color 0.3s ease, transform 0.2s ease;\n            cursor: pointer;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n        }\n        .download-button:hover {\n            background-color: #45a049;\n            transform: translateY(-2px);\n        }\n        .download-button:focus {\n            outline: 2px solid #2e7d32;\n            outline-offset: 2px;\n        }\n        .download-button:active {\n            transform: translateY(1px);\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n        }\n        .share-link {\n            display: inline-block;\n            padding: 10px 20px;\n            margin-top: 10px;\n            margin-left: 10px;\n            font-size: 16px;\n            font-weight: bold;\n            color: #fff;\n            background-color: #2196F3;\n            border: none;\n            border-radius: 5px;\n            text-decoration: none;\n            text-align: center;\n            transition: background-color 0.3s ease, transform 0.2s ease;\n            cursor: pointer;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n        }\n        .share-link:hover {\n            background-color: #1976D2;\n            transform: translateY(-2px);\n        }\n        .share-link:focus {\n            outline: 2px solid #1565C0;\n            outline-offset: 2px;\n        }\n        .share-link:active {\n            transform: translateY(1px);\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n        }\n    </style>\n    ";
    // Resume content including embedded styles
    var resumeOutput = "\n    ".concat(embeddedStyles, "\n    <h2>Resume</h2>\n    ").concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : "", "\n    <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name, "</span></p>\n    <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n    <p><strong>Phone:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n\n    <h3>Education</h3>\n    <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n\n    <h3>Experience</h3>\n    <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n    <h3>Skills</h3>\n    <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n    ");
    // Create download link
    var downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
    downloadLink.download = uniquePath;
    downloadLink.textContent = 'Download Your Resume';
    downloadLink.classList.add('download-button');
    // Simulate a shareable link generation
    var shareLink = document.createElement('a');
    var simulatedURL = window.URL.createObjectURL(new Blob([resumeOutput], { type: 'text/html' }));
    shareLink.href = simulatedURL;
    shareLink.textContent = 'Get Shareable Link';
    shareLink.classList.add('share-link');
    shareLink.target = '_blank'; // Open the link in a new tab
    // Append the resume to the output section
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.appendChild(downloadLink);
        resumeOutputElement.appendChild(shareLink); // Add the shareable link
    }
    makeEditable();
};
// Function to make fields editable by clicking
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
