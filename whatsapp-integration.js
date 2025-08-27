// WhatsApp Integration Helper Functions
class WhatsAppIntegration {
    constructor(adminNumber) {
        this.adminNumber = adminNumber;
        this.baseUrl = 'https://wa.me/';
    }

    // Create formatted message for order
    createOrderMessage(orderData) {
        const { package: packageName, username, email, payment } = orderData;
        
        return `🎮 *PESANAN ROBUX BARU* 🎮

📦 *Paket:* ${packageName}
👤 *Username Roblox:* ${username}
📧 *Email:* ${email}
💳 *Metode Pembayaran:* ${this.getPaymentMethodName(payment)}

Mohon proses pesanan saya. Terima kasih! 🙏

---
*Bherky Store - Robux Terpercaya*`;
    }

    // Get display name for payment method
    getPaymentMethodName(paymentCode) {
        const methods = {
            'dana': '💳 DANA',
            'gopay': '🟢 GoPay', 
            'ovo': '🟣 OVO',
            'shopee': '🧡 ShopeePay',
            'bca': '🏦 Transfer BCA',
            'mandiri': '🏦 Transfer Mandiri',
            'bri': '🏦 Transfer BRI',
            'bni': '🏦 Transfer BNI',
            'qris': '📱 QRIS',
            'ewallet': '💳 E-Wallet'
        };
        return methods[paymentCode] || paymentCode;
    }

    // Send order to WhatsApp
    sendOrder(orderData) {
        const message = this.createOrderMessage(orderData);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `${this.baseUrl}${this.adminNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in new window/tab
        window.open(whatsappUrl, '_blank');
        
        return whatsappUrl;
    }

    // Create payment confirmation message
    createPaymentConfirmation(orderData, paymentProof = null) {
        return `✅ *KONFIRMASI PEMBAYARAN* ✅

📦 *Paket:* ${orderData.package}
👤 *Username:* ${orderData.username}
💳 *Pembayaran:* ${this.getPaymentMethodName(orderData.payment)}

${paymentProof ? '📸 Bukti pembayaran sudah dikirim' : '📸 Bukti pembayaran menyusul'}

Mohon segera diproses. Terima kasih! 🙏`;
    }

    // Validate Indonesian phone number
    static validatePhoneNumber(phoneNumber) {
        // Remove all non-digit characters
        const cleaned = phoneNumber.replace(/\D/g, '');
        
        // Check if it's a valid Indonesian number
        const indonesianPattern = /^(62|0)8[0-9]{7,11}$/;
        
        return indonesianPattern.test(cleaned);
    }

    // Format Indonesian phone number for WhatsApp
    static formatPhoneNumber(phoneNumber) {
        let cleaned = phoneNumber.replace(/\D/g, '');
        
        // Convert 08xx to 628xx
        if (cleaned.startsWith('08')) {
            cleaned = '62' + cleaned.substring(1);
        }
        // Ensure it starts with 62
        else if (!cleaned.startsWith('62')) {
            cleaned = '62' + cleaned;
        }
        
        return cleaned;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppIntegration;
}
