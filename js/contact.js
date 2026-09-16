/* =====================================================
   GARG MODULAR FURNITURE — CONTACT FORM JS
   contact.js
   ===================================================== */

(function () {
  'use strict';

  const form = document.getElementById('consultation-form');
  const successMsg = document.getElementById('form-success');

  if (!form) return;

  /* -------------------------------------------------------
     REAL-TIME VALIDATION HELPERS
  ------------------------------------------------------- */
  function showError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    const existing = formGroup.querySelector('.form-error');
    if (existing) existing.remove();
    formGroup.classList.add('has-error');
    const error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = message;
    formGroup.appendChild(error);
  }

  function clearError(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    formGroup.classList.remove('has-error');
    const existing = formGroup.querySelector('.form-error');
    if (existing) existing.remove();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\+]?[\d\s\-]{7,15}$/.test(phone.trim());
  }

  /* -------------------------------------------------------
     BLUR VALIDATION
  ------------------------------------------------------- */
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  function validateField(field) {
    const val = field.value.trim();

    if (field.required && !val) {
      showError(field, 'This field is required.');
      return false;
    }

    if (field.type === 'email' && val && !isValidEmail(val)) {
      showError(field, 'Please enter a valid email address.');
      return false;
    }

    if (field.name === 'phone' && val && !isValidPhone(val)) {
      showError(field, 'Please enter a valid phone number.');
      return false;
    }

    clearError(field);
    return true;
  }

  /* -------------------------------------------------------
     FORM SUBMIT
  ------------------------------------------------------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Submit button loading state
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // Simulate async submission (replace with real endpoint)
    setTimeout(() => {
      form.style.opacity = '0';
      form.style.transform = 'translateY(-10px)';
      form.style.transition = 'all 0.4s ease';

      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) {
          successMsg.style.display = 'flex';
          requestAnimationFrame(() => {
            successMsg.style.opacity = '1';
            successMsg.style.transform = 'translateY(0)';
          });
        }
        if (typeof window.showToast === 'function') {
          window.showToast('Consultation request sent! We will contact you shortly.');
        }
      }, 400);
    }, 1200);
  });

})();
