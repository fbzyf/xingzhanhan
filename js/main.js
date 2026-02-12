/**
 * 上海星展瀚电子 企业官网 - 交互逻辑
 * 
 * 功能模块：
 * 1. 导航栏滚动固定 + 背景切换
 * 2. 平滑滚动到锚点
 * 3. 移动端汉堡菜单开关
 * 4. 滚动进入视口的淡入动画
 * 5. 导航栏当前区域高亮
 */

document.addEventListener('DOMContentLoaded', function () {

  // ========== 1. 导航栏滚动效果 ==========
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  /**
   * 监听页面滚动，当滚动超过 50px 时，
   * 为导航栏添加白色背景和阴影效果
   */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  // ========== 2. 平滑滚动到锚点 ==========

  /**
   * 为所有带有 href="#xxx" 的导航链接绑定点击事件，
   * 点击后平滑滚动到目标区域，并考虑导航栏高度的偏移
   */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var targetElement = document.querySelector(targetId);

      if (targetElement) {
        var navbarHeight = navbar.offsetHeight;
        var targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // 如果移动端菜单打开了，点击后关闭
        closeMobileMenu();
      }
    });
  });

  // ========== 3. 移动端汉堡菜单 ==========
  var hamburgerBtn = document.getElementById('hamburger-btn');
  var mobileMenu = document.getElementById('mobile-menu');

  /**
   * 切换移动端菜单的展开/收起状态
   */
  function toggleMobileMenu() {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  }

  /**
   * 关闭移动端菜单
   */
  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('open');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  // ========== 4. 滚动淡入动画 ==========

  /**
   * 使用 IntersectionObserver 监听带有 fade-in、fade-in-left、fade-in-right 类名的元素，
   * 当元素进入视口 10% 时，添加 visible 类触发 CSS 过渡动画
   */
  var fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // 动画只触发一次
        }
      });
    }, {
      threshold: 0.1, // 元素 10% 可见时触发
      rootMargin: '0px 0px -50px 0px' // 稍微提前触发
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // 如果浏览器不支持 IntersectionObserver，直接显示所有元素
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ========== 5. 导航栏当前区域高亮 ==========

  /**
   * 根据页面滚动位置，自动高亮对应区域的导航链接
   */
  var sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    var scrollPosition = window.scrollY + 100;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - navbar.offsetHeight - 20;
      var sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        var currentId = section.getAttribute('id');

        // 移除所有导航链接的高亮
        navLinks.forEach(function (link) {
          link.classList.remove('font-bold');
        });

        // 为当前区域对应的导航链接添加高亮
        var activeLink = document.querySelector('.nav-link[href="#' + currentId + '"]');
        if (activeLink) {
          activeLink.classList.add('font-bold');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // 页面加载完成后立即执行一次
  handleNavbarScroll();
  highlightNavLink();

  console.log('[星展瀚电子官网] 页面初始化完成');
});
