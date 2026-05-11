(function () {
    'use strict';

    const form = document.getElementById('feedbackForm');
    const successBanner = document.getElementById('successBanner');

    // --- Validation helpers ---

    function showError(fieldId, errorId) {
        document.getElementById(fieldId).style.borderColor = '#d93025';
        document.getElementById(errorId).style.display = 'block';
    }

    function clearError(fieldId, errorId) {
        document.getElementById(fieldId).style.borderColor = '';
        document.getElementById(errorId).style.display = 'none';
    }

    function isValidEmail(value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    }

    // Clear errors on input change
    document.getElementById('name').addEventListener('input', function () {
        if (this.value.trim()) clearError('name', 'nameError');
    });

    document.getElementById('email').addEventListener('input', function () {
        if (isValidEmail(this.value.trim())) clearError('email', 'emailError');
    });

    document.getElementById('presentation').addEventListener('change', function () {
        if (this.value) clearError('presentation', 'presentationError');
    });

    document.querySelectorAll('input[name="rating"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            document.getElementById('ratingError').style.display = 'none';
        });
    });

    // --- Form submission ---

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let valid = true;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const presentation = document.getElementById('presentation').value;
        const rating = document.querySelector('input[name="rating"]:checked');

        if (!name) {
            showError('name', 'nameError');
            valid = false;
        } else {
            clearError('name', 'nameError');
        }

        if (!email || !isValidEmail(email)) {
            showError('email', 'emailError');
            valid = false;
        } else {
            clearError('email', 'emailError');
        }

        if (!presentation) {
            showError('presentation', 'presentationError');
            valid = false;
        } else {
            clearError('presentation', 'presentationError');
        }

        if (!rating) {
            document.getElementById('ratingError').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('ratingError').style.display = 'none';
        }

        if (!valid) return;

        // Collect form data
        const data = {
            name: name,
            email: email,
            presentation: presentation,
            rating: rating.value,
            clarity: document.getElementById('clarity').value.trim() || null,
            comments: document.getElementById('comments').value.trim() || null,
        };

        console.log('Feedback submitted:', data);

        // Show success message and hide the form
        form.style.display = 'none';
        successBanner.style.display = 'block';
    });
}());
