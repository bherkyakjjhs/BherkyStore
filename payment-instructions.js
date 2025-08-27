// Payment Instructions for Different Methods
const PaymentInstructions = {
    // E-Wallet Instructions
    getEWalletInstructions: function(method, amount) {
        const instructions = {
            dana: {
                title: 'Pembayaran via DANA',
                steps: [
                    'Buka aplikasi DANA',
                    `Transfer ke nomor: 083832222974`,
                    `Jumlah: ${amount}`,
                    'Masukkan PIN DANA Anda',
                    'Ambil screenshot bukti transfer',
                    'Kirim bukti via WhatsApp'
                ],
                icon: '💳'
            },
            gopay: {
                title: 'Pembayaran via GoPay',
                steps: [
                    'Buka aplikasi Gojek',
                    'Pilih GoPay',
                    `Transfer ke nomor: 083832222974`,
                    `Jumlah: ${amount}`,
                    'Konfirmasi pembayaran',
                    'Ambil screenshot bukti transfer',
                    'Kirim bukti via WhatsApp'
                ],
                icon: '🟢'
            },
            ovo: {
                title: 'Pembayaran via OVO',
                steps: [
                    'Buka aplikasi OVO',
                    'Pilih Transfer',
                    `Transfer ke nomor: 083832222974`,
                    `Jumlah: ${amount}`,
                    'Masukkan PIN OVO',
                    'Ambil screenshot bukti transfer',
                    'Kirim bukti via WhatsApp'
                ],
                icon: '🟣'
            }
        };
        return instructions[method] || null;
    },

    // Bank Transfer Instructions
    getBankInstructions: function(method, amount) {
        const instructions = {
            bca: {
                title: 'Transfer Bank BCA',
                steps: [
                    'Login ke m-BCA atau KlikBCA',
                    'Pilih Transfer Dana',
                    'Rekening tujuan: 1234567890 (BCA)',
                    `Jumlah: ${amount}`,
                    'Keterangan: Username Roblox Anda',
                    'Konfirmasi transfer',
                    'Ambil screenshot bukti transfer',
                    'Kirim bukti via WhatsApp'
                ],
                icon: '🏦'
            },
            mandiri: {
                title: 'Transfer Bank Mandiri',
                steps: [
                    'Login ke Livin by Mandiri',
                    'Pilih Transfer',
                    'Rekening tujuan: 1234567890 (Mandiri)',
                    `Jumlah: ${amount}`,
                    'Berita: Username Roblox Anda',
                    'Konfirmasi dengan MPIN',
                    'Ambil screenshot bukti transfer',
                    'Kirim bukti via WhatsApp'
                ],
                icon: '🏦'
            }
        };
        return instructions[method] || null;
    },

    // Create formatted instruction message for WhatsApp
    createInstructionMessage: function(method, amount, instructions) {
        if (!instructions) return '';

        let message = `💰 *INSTRUKSI PEMBAYARAN* 💰\n\n`;
        message += `${instructions.icon} *${instructions.title}*\n`;
        message += `💵 *Jumlah: ${amount}*\n\n`;
        message += `📋 *Langkah-langkah:*\n`;

        instructions.steps.forEach((step, index) => {
            message += `${index + 1}. ${step}\n`;
        });

        message += `\n⏰ *Proses: 5-15 menit setelah pembayaran*\n`;
        message += `✅ *Garansi 100% uang kembali*\n\n`;
        message += `*Bherky Store - Robux Terpercaya* 🎮`;

        return message;
    }
};

// Export if in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentInstructions;
}
