
const galleryTrack = document.querySelector('.gallery-grid');

if (galleryTrack) {
    const originalItems = Array.from(
    galleryTrack.querySelectorAll('.gallery-item:not([data-index])')
);

    originalItems.forEach((item, index) => {
        item.dataset.index = index;

        const clone = item.cloneNode(true);
        clone.dataset.index = index;
        galleryTrack.appendChild(clone);
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxDate = document.getElementById('lightbox-date');
    const lightboxCaption = document.getElementById('lightbox-caption');

    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (lightbox && lightboxImg) {
        let currentIndex = 0;

        function showImage(index) {
            currentIndex = (index + originalItems.length) % originalItems.length;

            const item = originalItems[currentIndex];
            const img = item.querySelector('img');

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;

            if (lightboxDate) {
                lightboxDate.textContent =
                    item.querySelector('.gallery-date')?.textContent || '';
            }

            if (lightboxCaption) {
                lightboxCaption.textContent =
                    item.querySelector('.gallery-caption')?.textContent || '';
            }
        }

        function openLightbox(index) {
            showImage(index);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        galleryTrack.addEventListener('click', (event) => {
            const item = event.target.closest('.gallery-item');

            if (!item || !galleryTrack.contains(item)) return;

            openLightbox(Number(item.dataset.index));
        });

        closeBtn?.addEventListener('click', closeLightbox);

        prevBtn?.addEventListener('click', () => {
            showImage(currentIndex - 1);
        });

        nextBtn?.addEventListener('click', () => {
            showImage(currentIndex + 1);
        });

        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (!lightbox.classList.contains('active')) return;

            if (event.key === 'Escape') closeLightbox();
            if (event.key === 'ArrowRight') showImage(currentIndex + 1);
            if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
        });
    }
}
