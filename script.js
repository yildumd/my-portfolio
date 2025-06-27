// Import EmailJS
import emailjs from 'emailjs-com';

// Form submission
document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    'service_ptkqdfp',           // ✅ Your service ID
    'your_template_id',          // 🔁 Replace with your actual template ID
    this,
    'W6ddMcdbOg4Olavq9'          // ✅ Your public API key
  )
  .then(() => {
    alert("✅ Message sent successfully!");
    this.reset();
  })
  .catch((error) => {
    console.error("❌ Failed to send message:", error);
    alert("❌ Failed to send message. Please try again.");
  });
});