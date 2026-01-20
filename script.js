// script.js - Flotsam Florist 网站交互功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 设置送达日期的最小值（明天）
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        deliveryDateInput.min = minDate;
        deliveryDateInput.value = minDate; // 默认选择明天
    }
    
    // 初始化预算滑块显示
    updateBudgetValue(75);
    
    // 表单提交处理
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }
    
    // 导航菜单高亮
    highlightCurrentPage();
    
    // 图片懒加载（如果图片很多的话）
    initializeLazyLoading();
});

// 更新预算滑块数值显示
function updateBudgetValue(value) {
    const budgetValue = document.getElementById('budgetValue');
    if (budgetValue) {
        budgetValue.textContent = value;
    }
}

// 处理表单提交
function handleFormSubmit(form) {
    // 收集表单数据
    const formData = new FormData(form);
    const orderData = {};
    
    // 转换为对象
    for (let [key, value] of formData.entries()) {
        orderData[key] = value;
    }
    
    // 这里在实际网站中应该发送到服务器
    // 现在只显示成功消息
    alert('Thank you for your order! We will contact you within 2 hours to confirm details and provide payment options.\n\nOrder Summary:\n' + 
          `Name: ${orderData.fullName}\n` +
          `Bouquet Type: ${orderData.bouquetType}\n` +
          `Delivery Date: ${orderData.deliveryDate}\n` +
          `Budget: $${orderData.budget}`);
    
    // 重置表单
    form.reset();
    
    // 重置送达日期为明天
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        deliveryDateInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    // 重置预算滑块
    updateBudgetValue(75);
}

// 高亮当前页面导航
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });
}

// 图片懒加载初始化
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// 平滑滚动到锚点
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// 表单验证辅助函数
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

// 显示/隐藏移动菜单
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        nav.classList.toggle('show');
    }
}

// 检测移动设备
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// 添加窗口调整大小事件监听器
window.addEventListener('resize', function() {
    if (!isMobileDevice()) {
        const nav = document.querySelector('nav ul');
        if (nav && nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
    }
});

// 添加 CSS 类用于移动菜单
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        nav ul {
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 20px;
            display: none;
            z-index: 1000;
        }
        
        nav ul.show {
            display: flex;
        }
        
        .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--secondary-color);
        }
    }
    
    .mobile-menu-toggle {
        display: none;
    }
`;

document.head.appendChild(style);
