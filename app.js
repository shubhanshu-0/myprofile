/**
 * Portfolio Interactive HUD Scripts
 * Handles section tabs filtering, copy to clipboard, and print.
 */
document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('toast');

  // 1. Tab Navigation (Projects, Experience, Technical Stack)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const contentSections = document.querySelectorAll('.content-section');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');

      contentSections.forEach(section => {
        const sectionType = section.getAttribute('data-section');
        if (sectionType === targetTab) {
          section.style.display = 'flex';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });

  // 2. Copy to Clipboard
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const input = document.createElement('input');
          input.value = textToCopy;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
        }
        btn.textContent = 'COPIED!';
        showToast(`COPIED: ${textToCopy}`);
        setTimeout(() => { btn.textContent = 'COPY'; }, 2000);
      } catch (err) {
        showToast('FAILED TO COPY');
      }
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => { toast.classList.remove('active'); }, 2200);
  }

  // 3. Resume Request Notification
  const resumeBtn = document.getElementById('resume-request-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      showToast('Opening email to request resume...');
    });
  }
});
