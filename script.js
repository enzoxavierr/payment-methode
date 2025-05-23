document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menyalin nomor dompet digital
    const ewalletButtons = document.querySelectorAll('.ewallet-btn');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    ewalletButtons.forEach(button => {
        button.addEventListener('click', function() {
            const number = this.getAttribute('data-number');
            
            // Salin ke clipboard
            navigator.clipboard.writeText(number).then(() => {
                // Tampilkan notifikasi
                notificationMessage.textContent = `Nomor ${this.querySelector('img').alt} berhasil disalin!`;
                notification.classList.add('show');
                
                // Ubah ikon menjadi centang sementara
                const icon = this.querySelector('i');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                }, 2000);
            }).catch(err => {
                console.error('Gagal menyalin: ', err);
                notificationMessage.textContent = 'Gagal menyalin!';
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
            });
        });
    });
    
    // Fungsi tombol download QR
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Pada implementasi nyata, ini akan memicu download
            // Untuk contoh ini, kita hanya menampilkan notifikasi
            notificationMessage.textContent = 'Kode QR berhasil disimpan!';
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
            
            // Implementasi sebenarnya akan seperti:
            /*
            const qrImage = document.querySelector('.qris-image');
            const link = document.createElement('a');
            link.href = qrImage.src;
            link.download = 'qris-payment.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            */
        });
    }
});