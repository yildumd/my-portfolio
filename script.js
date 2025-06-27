// Initialize EmailJS with your public key
emailjs.init('W6ddMcdbOg4Olavq9');

// Form submission handler
document.querySelector(".contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Get form data
  const formData = new FormData(this);
  const formProps = Object.fromEntries(formData);
  
  // Simple validation
  if (!formProps.name || !formProps.email || !formProps.message) {
    showAlert('Please fill in all required fields', 'error');
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    return;
  }

  // Email validation
  if (!validateEmail(formProps.email)) {
    showAlert('Please enter a valid email address', 'error');
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    return;
  }

  // Send email
  emailjs.send(
    'service_ptkqdfp',           // Your service ID
    'template_123456',          // Replace with your actual template ID
    {
      from_name: formProps.name,
      from_email: formProps.email,
      subject: formProps.subject || 'Message from Portfolio Contact Form',
      message: formProps.message
    }
  )
  .then(() => {
    showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
    this.reset();
  })
  .catch((error) => {
    console.error("Email sending failed:", error);
    showAlert('Failed to send message. Please try again or contact me directly at dyildum@gmail.com', 'error');
  })
  .finally(() => {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  });
});

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Custom alert/notification function
function showAlert(message, type = 'success') {
  // Remove any existing alerts
  const existingAlert = document.querySelector('.custom-alert');
  if (existingAlert) existingAlert.remove();

  // Create alert element
  const alert = document.createElement('div');
  alert.className = `custom-alert ${type}`;
  alert.innerHTML = `
    <span>${type === 'success' ? '✓' : '⚠'}</span>
    <p>${message}</p>
    <button class="close-alert">&times;</button>
  `;

  // Add to DOM
  document.body.appendChild(alert);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    alert.classList.add('fade-out');
    setTimeout(() => alert.remove(), 300);
  }, 5000);

  // Manual close
  alert.querySelector('.close-alert').addEventListener('click', () => {
    alert.classList.add('fade-out');
    setTimeout(() => alert.remove(), 300);
  });
}

// Dark mode toggle
const toggleTheme = document.getElementById('toggle-theme');
const html = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (savedTheme === 'dark') {
  html.setAttribute('data-theme', 'dark');
  toggleTheme.checked = true;
}

toggleTheme.addEventListener('change', () => {
  if (toggleTheme.checked) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenu.innerHTML = navLinks.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.boxShadow = window.scrollY > 10 ? 
    '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none';
});

// Add CSS for custom alerts
const style = document.createElement('style');
style.textContent = `
  .custom-alert {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    animation: slide-in 0.3s ease-out;
    transition: opacity 0.3s;
  }
  
  .custom-alert.success {
    background: #4caf50;
    color: white;
  }
  
  .custom-alert.error {
    background: #f44336;
    color: white;
  }
  
  .custom-alert.fade-out {
    opacity: 0;
  }
  
  .close-alert {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 10px;
  }
  
  @keyframes slide-in {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;
document.head.appendChild(style);