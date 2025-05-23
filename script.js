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
    
    // Fungsi tombol download QR yang sudah diperbaiki
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            try {
                const qrImage = document.querySelector('.qris-image');
                
                // Buat elemen <a> sementara untuk download
                const link = document.createElement('a');
                link.href = qrImage.src;
                link.download = 'qris-payment.jpg'; // Nama file saat didownload
                
                // Tambahkan ke DOM dan trigger click
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Tampilkan notifikasi
                notificationMessage.textContent = 'Kode QR berhasil didownload!';
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
                
            } catch (error) {
                console.error('Error downloading QR:', error);
                notificationMessage.textContent = 'Gagal mendownload QR';
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
            }
        });
    }
});
