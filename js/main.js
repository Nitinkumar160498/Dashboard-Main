document.addEventListener('DOMContentLoaded', function() {
    var hamburgerMenu = document.getElementById('hamburgerMenu');
    var hamburgerMenuDesktop = document.getElementById('hamburgerMenuDesktop');
    var sidebar = document.querySelector('.sidebar');
    var mobileOverlay = document.getElementById('mobileOverlay');
    
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleSidebar);
    }
    
    if (hamburgerMenuDesktop) {
        hamburgerMenuDesktop.addEventListener('click', toggleSidebar);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            if (sidebar) sidebar.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    var form = document.querySelector('.form');
    var submitButton = document.querySelector('.create-account-btn');
    
    if (form && submitButton) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitButton.disabled = true;
                submitButton.textContent = 'Creating Account...';
                submitButton.style.opacity = '0.7';
                
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }
        });
        
        function validateForm() {
            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var countryCode = document.getElementById('countryCode').value;
            var phoneNumber = document.getElementById('phoneNumber').value;
            var agreeTerms = document.getElementById('terms').checked;
            
            clearErrors();
            
            var isValid = true;
            
            if (!firstName) {
                showError('firstName', 'Please enter your first name');
                isValid = false;
            }
            
            if (!lastName) {
                showError('lastName', 'Please enter your last name');
                isValid = false;
            }
            
            if (!email) {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!password) {
                showError('password', 'Please enter a password');
                isValid = false;
            } else if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters');
                isValid = false;
            }
            
            if (!countryCode) {
                showError('countryCode', 'Please enter country code');
                isValid = false;
            }
            
            if (!phoneNumber) {
                showError('phoneNumber', 'Please enter your phone number');
                isValid = false;
            } else if (!isValidPhone(phoneNumber)) {
                showError('phoneNumber', 'Please enter a valid phone number');
                isValid = false;
            }
            
            if (!agreeTerms) {
                alert('Please agree to the terms and conditions');
                isValid = false;
            }
            
            if (isValid) {
                localStorage.setItem('userFirstName', firstName);
            }
            
            return isValid;
        }
        
        function isValidEmail(email) {
            return email.includes('@') && email.includes('.');
        }
        
        function isValidPhone(phone) {
            var numbers = phone.replace(/[^0-9]/g, '');
            return numbers.length >= 10;
        }
        
        function showError(fieldId, message) {
            var field = document.getElementById(fieldId);
            field.style.borderColor = '#FF5722';
            
            var errorDiv = document.createElement('div');
            errorDiv.innerHTML = message;
            errorDiv.style.color = '#FF5722';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '4px';
            errorDiv.className = 'error-msg';
            
            field.parentNode.appendChild(errorDiv);
        }
        
        function clearErrors() {
            var errors = document.querySelectorAll('.error-msg');
            for (var i = 0; i < errors.length; i++) {
                errors[i].remove();
            }
            
            var inputs = document.querySelectorAll('input');
            for (var j = 0; j < inputs.length; j++) {
                inputs[j].style.borderColor = '#D7DBDF';
            }
        }
        
        submitButton.addEventListener('click', function() {
            this.style.transform = 'translateY(1px)';
            setTimeout(function() {
                submitButton.style.transform = '';
            }, 100);
        });
    }
    
    var userAvatar = document.querySelector('.user-avatar');
    
    if (userAvatar) {
        var userFirstName = localStorage.getItem('userFirstName');
        if (userFirstName) {
            userAvatar.textContent = userFirstName.charAt(0).toUpperCase();
        }
        
        userAvatar.style.cursor = 'pointer';
        
        userAvatar.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('userFirstName');
                window.location.href = 'create-account.html';
            }
        });
    }
});
