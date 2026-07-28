const emailInput = document.getElementById('emailInput');
    const maskBtn = document.getElementById('maskBtn');
    const originalDisplay = document.getElementById('originalDisplay');
    const maskedDisplay = document.getElementById('maskedDisplay');
    const copyBtn = document.getElementById('copyBtn');

    // =============================================
    // MASK FUNCTION
    // =============================================
    function maskEmail(email) {
      // Remove extra spaces
      email = email.trim();

      // Must contain @
      if (!email.includes('@')) {
        throw new Error('Invalid email – missing "@"');
      }

      // Split into local part and domain
      const [local, domain] = email.split('@');

      // If local part is too short, return as-is
      if (local.length <= 2) {
        return email;
      }

      // Keep first char, mask middle, keep last char before @
      const first = local[0];
      const last = local[local.length - 1];
      const middle = '*'.repeat(Math.min(local.length - 2, 6));

      const maskedLocal = first + middle + last;

      return maskedLocal + '@' + domain;
    }

    // =============================================
    // HANDLE MASK
    // =============================================
    function handleMask() {
      const raw = emailInput.value;

      // Empty input
      if (!raw.trim()) {
        originalDisplay.textContent = '—';
        maskedDisplay.textContent = '—';
        return;
      }

      try {
        const masked = maskEmail(raw);
        originalDisplay.textContent = raw.trim();
        maskedDisplay.textContent = masked;
      } catch (err) {
        originalDisplay.textContent = raw.trim();
        maskedDisplay.textContent = '⚠️ ' + err.message;
      }
    }

    // =============================================
    // COPY TO CLIPBOARD
    // =============================================
    function copyMasked() {
      const text = maskedDisplay.textContent;
      if (!text || text === '—' || text.startsWith('⚠️')) return;

      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
          copyBtn.textContent = '📋 Copy';
        }, 1500);
      }).catch(() => {
        alert('Press Ctrl+C to copy');
      });
    }

    // =============================================
    // EVENT LISTENERS
    // =============================================
    maskBtn.addEventListener('click', handleMask);

    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleMask();
    });

    copyBtn.addEventListener('click', copyMasked);

    // Auto-mask on page load (demo)
    window.addEventListener('DOMContentLoaded', () => {
      emailInput.value = 'john.doe@gmail.com';
      handleMask();
    });