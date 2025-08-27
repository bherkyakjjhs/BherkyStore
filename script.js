// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Modal functionality
const modal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');

function selectPackage(packageName, price) {
    document.getElementById('selectedPackage').value = `${packageName} - ${price}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Form submission
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        package: document.getElementById('selectedPackage').value,
        username: document.getElementById('robloxUsername').value,
        email: document.getElementById('customerEmail').value,
        payment: document.getElementById('paymentMethod').value
    };

    // Validate form
    if (!formData.username || !formData.email || !formData.payment) {
        alert('Mohon lengkapi semua field yang diperlukan!');
        return;
    }

    // Validate Roblox username (basic validation)
    if (formData.username.length < 3 || formData.username.length > 20) {
        alert('Username Roblox harus antara 3-20 karakter!');
        return;
    }

    // Create WhatsApp message
    const adminNumber = WHATSAPP_CONFIG.adminNumber;
    const message = `🎮 *PESANAN ROBUX BARU* 🎮

📦 *Paket:* ${formData.package}
👤 *Username Roblox:* ${formData.username}
📧 *Email:* ${formData.email}
💳 *Metode Pembayaran:* ${getPaymentMethodName(formData.payment)}

Mohon proses pesanan saya. Terima kasih! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

    // Show confirmation and redirect to WhatsApp
    alert('Anda akan dialihkan ke WhatsApp untuk menyelesaikan pembayaran!');
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Clear form and close modal
    orderForm.reset();
    closeModal();
});

// Function to get payment method display name
function getPaymentMethodName(paymentCode) {
    const paymentMethods = {
        'dana': 'DANA',
        'gopay': 'GoPay',
        'ovo': 'OVO',
        'shopee': 'ShopeePay',
        'bca': 'Transfer BCA',
        'mandiri': 'Transfer Mandiri',
        'bri': 'Transfer BRI',
        'bni': 'Transfer BNI',
        'qris': 'QRIS',
        'ewallet': 'E-Wallet Lainnya'
    };
    return paymentMethods[paymentCode] || paymentCode;
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    const animatedElements = document.querySelectorAll('.package-card, .step, .testimonial-card, .contact-item');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Package cards hover effects
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('popular')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Counter animation for statistics (if needed)
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Contact form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading state to buttons
function addLoadingState(button, text = 'Memproses...') {
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
}

function removeLoadingState(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}

// Copy to clipboard functionality for contact info
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = element.innerHTML;
        element.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
        element.style.color = '#4CAF50';

        setTimeout(() => {
            element.innerHTML = originalText;
            element.style.color = '';
        }, 2000);
    }).catch(() => {
        alert('Gagal menyalin ke clipboard');
    });
}

// Add click to copy functionality to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const text = this.querySelector('p').textContent;
        copyToClipboard(text, this.querySelector('p'));
    });

    // Add cursor pointer style
    item.style.cursor = 'pointer';
    item.title = 'Klik untuk menyalin';
});

// WhatsApp Admin Configuration
const WHATSAPP_CONFIG = {
    adminNumber: '6283832222974', // Ganti dengan nomor WhatsApp admin yang benar
    storeName: 'Bherky Store',
    welcomeMessage: 'Halo! Selamat datang di Bherky Store. Ada yang bisa kami bantu?'
};

// Console welcome message
console.log(`
🚀 RobuxStore Website Loaded!
🎮 Ready to top up your Roblox account?
💎 Choose your Robux package and start playing!
📱 WhatsApp integration ready!
`);

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Prevent form submission if browser doesn't support required features
if (!window.fetch) {
    document.querySelector('.btn-primary').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Browser Anda tidak mendukung fitur ini. Mohon update browser Anda.');
    });
}
