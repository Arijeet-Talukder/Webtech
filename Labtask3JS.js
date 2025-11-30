document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.donation-form');

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const otherAmountInput = document.getElementById('otherAmount');
    const recurringCheckbox = document.getElementById('recurringCheck');
    const monthlyAmountInput = document.getElementById('monthlyAmount');
    const monthsInput = document.getElementById('months');

    const donationRadios = document.querySelectorAll('input[name="amt"]');
    const honorRadios = document.querySelectorAll('input[name="honor"]');
    const acknowledgeSection = document.querySelector('.section:nth-of-type(2)');
    const comments = document.querySelector('textarea.comments');
    const resetBtn = document.querySelector('input[type="reset"]');

    const totalDisplay = document.createElement('p');
    monthsInput.parentElement.appendChild(totalDisplay);
    totalDisplay.style.fontWeight = 'bold';
    totalDisplay.style.marginTop = '5px';

    otherAmountInput.style.display = 'none';
    [monthlyAmountInput, monthsInput].forEach(f => f.parentElement.style.display = 'none');
    acknowledgeSection.style.display = 'none';

    const stateSelects = document.querySelectorAll('select');
    stateSelects.forEach(select => select.selectedIndex = 0);

    donationRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.nextSibling.textContent.trim() === 'Other' && radio.checked) {
                otherAmountInput.style.display = 'inline-block';
            } else if (radio.checked) {
                otherAmountInput.style.display = 'none';
                otherAmountInput.value = '';
            }
            updateTotalDonation();
        });
    });

    recurringCheckbox.addEventListener('change', () => {
        const displayStyle = recurringCheckbox.checked ? 'inline-block' : 'none';
        [monthlyAmountInput, monthsInput].forEach(f => f.parentElement.style.display = displayStyle);
        updateTotalDonation();
    });

    honorRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            acknowledgeSection.style.display = radio.checked ? 'block' : 'none';
        });
    });

    const commentLimit = 200;
    comments.addEventListener('input', () => {
        if (comments.value.length > commentLimit) {
            comments.value = comments.value.substring(0, commentLimit);
            alert(`Comments cannot exceed ${commentLimit} characters.`);
        }
    });

    function updateTotalDonation() {
        let total = 0;

        donationRadios.forEach(radio => {
            if (radio.checked) {
                const val = radio.nextSibling.textContent.trim();
                if (val === 'Other') {
                    total += parseFloat(otherAmountInput.value) || 0;
                } else if (val !== 'None') {
                    total += parseFloat(val.replace('$', '')) || 0;
                }
            }
        });

        if (recurringCheckbox.checked) {
            const monthly = parseFloat(monthlyAmountInput.value) || 0;
            const months = parseInt(monthsInput.value) || 0;
            total += monthly * months;
        }

        totalDisplay.textContent = `Total Donation: $${total.toFixed(2)}`;
    }

    [otherAmountInput, monthlyAmountInput, monthsInput].forEach(f => f.addEventListener('input', updateTotalDonation));
    donationRadios.forEach(r => r.addEventListener('change', updateTotalDonation));
    recurringCheckbox.addEventListener('change', updateTotalDonation);

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!firstName.value.trim()) { alert('First Name is required.'); firstName.focus(); return; }
        if (!lastName.value.trim()) { alert('Last Name is required.'); lastName.focus(); return; }
        if (!email.value.trim()) { alert('Email is required.'); email.focus(); return; }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) { alert('Please enter a valid email.'); email.focus(); return; }

        if (!password.value.trim()) { alert('Password is required.'); password.focus(); return; }
        if (!confirmPassword.value.trim()) { alert('Please confirm your password.'); confirmPassword.focus(); return; }
        if (password.value !== confirmPassword.value) { alert('Passwords do not match.'); confirmPassword.focus(); return; }

        let selectedDonation = '';
        donationRadios.forEach(r => { if (r.checked) selectedDonation = r.nextSibling.textContent.trim(); });
        if (!selectedDonation) { alert('Please select a donation amount.'); return; }
        if (selectedDonation === 'Other' && (!otherAmountInput.value.trim() || isNaN(otherAmountInput.value) || Number(otherAmountInput.value) <= 0)) {
            alert('Please enter a valid "Other Amount".'); otherAmountInput.focus(); return;
        }

        alert(`Form submitted successfully!\n${totalDisplay.textContent}`);
        form.submit();
    });

    resetBtn.addEventListener('click', function (e) {
        if (!confirm('Are you sure you want to reset the form?')) e.preventDefault();
    });
});
