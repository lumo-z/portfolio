let currentSlide = 0;

    function showSlides(n) {
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.carousel-indicator');

        if (n >= slides.length) { currentSlide = 0; }
        if (n < 0) { currentSlide = slides.length - 1; }

        slides.forEach(slide => slide.style.display = 'none');
        indicators.forEach(indicator => indicator.classList.remove('active'));

        slides[currentSlide].style.display = 'block';
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        showSlides(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        showSlides(currentSlide);
    }

    function activateIndicator(event) {
        const target = event.target;
        if (target && target.classList.contains('carousel-indicator')) {
            currentSlide = parseInt(target.getAttribute('data-slide-to'));
            showSlides(currentSlide);
        }
    }

    document.querySelector('.carousel-indicators').addEventListener('click', activateIndicator);

    // 自动轮播
    let slideInterval = setInterval(nextSlide, 5000);

    // 鼠标悬停时暂停轮播
    document.querySelector('.carousel').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    document.querySelector('.carousel').addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    function performSearch() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const products = document.querySelectorAll('.product');
        let hasResults = false;
        
        products.forEach(product => {
            const productName = product.querySelector('.product-name').innerText.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = 'block';
                hasResults = true;
            } else {
                product.style.display = 'none';
            }
        });
        
        if (!hasResults && query !== '') {
            alert('没有找到匹配的商品，请尝试其他关键词。');
        }
    }

    // 回车键搜索
    document.getElementById('search-input').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function showProductDetails(name, description, price) {
        document.getElementById('productName').innerText = name;
        document.getElementById('productDescription').innerText = description;
        document.getElementById('productPrice').innerText = price;
        const modal = document.getElementById('productModal');
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    function hideProductDetails() {
        const modal = document.getElementById('productModal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // 点击模态框外部关闭
    window.onclick = function(event) {
        const modal = document.getElementById('productModal');
        if (event.target == modal) {
            hideProductDetails();
        }
    }

    window.onload = () => {
        showSlides(currentSlide);
    };