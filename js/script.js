// ===== AGUARDAR CARREGAMENTO DO DOM =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FUNCIONALIDADE DO MENU MOBILE =====
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    
    // Função para alternar o menu mobile
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Prevenir scroll do body quando menu estiver aberto
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
    
    // Event listener para o botão do menu hambúrguer
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }
    
    // Fechar menu ao clicar em um link de navegação (mobile)
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });
    
    // Fechar menu ao redimensionar a janela para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ===== VALIDAÇÃO DO FORMULÁRIO DE CONTATO =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envio padrão do formulário
            
            // Obter elementos do formulário
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            // Limpar mensagens de erro anteriores
            clearErrorMessages();
            
            let isValid = true;
            
            // Validação do campo Nome
            if (!nameField.value.trim()) {
                showError(nameField, 'Por favor, insira seu nome.');
                isValid = false;
            } else if (nameField.value.trim().length < 2) {
                showError(nameField, 'O nome deve ter pelo menos 2 caracteres.');
                isValid = false;
            }
            
            // Validação do campo Email
            if (!emailField.value.trim()) {
                showError(emailField, 'Por favor, insira seu email.');
                isValid = false;
            } else if (!isValidEmail(emailField.value.trim())) {
                showError(emailField, 'Por favor, insira um email válido.');
                isValid = false;
            }
            
            // Validação do campo Mensagem
            if (!messageField.value.trim()) {
                showError(messageField, 'Por favor, insira sua mensagem.');
                isValid = false;
            } else if (messageField.value.trim().length < 10) {
                showError(messageField, 'A mensagem deve ter pelo menos 10 caracteres.');
                isValid = false;
            }
            
            // Se todas as validações passaram
            if (isValid) {
                showSuccessMessage();
                contactForm.reset(); // Limpar formulário
            }
        });
    }
    
    // ===== FUNÇÕES AUXILIARES PARA VALIDAÇÃO =====
    
    // Função para validar formato de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Função para mostrar mensagem de erro
    function showError(field, message) {
        // Remover erro anterior se existir
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Criar elemento de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        
        // Adicionar borda vermelha ao campo
        field.style.borderColor = '#e74c3c';
        
        // Inserir mensagem de erro após o campo
        field.parentNode.appendChild(errorElement);
    }
    
    // Função para limpar todas as mensagens de erro
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const successMessages = document.querySelectorAll('.success-message');
        successMessages.forEach(success => success.remove());
        
        // Restaurar bordas dos campos
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.style.borderColor = '#e0e0e0';
        });
    }
    
    // Função para mostrar mensagem de sucesso
    function showSuccessMessage() {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        successElement.style.color = '#27ae60';
        successElement.style.fontSize = '1rem';
        successElement.style.marginTop = '20px';
        successElement.style.padding = '15px';
        successElement.style.backgroundColor = '#d5f4e6';
        successElement.style.border = '1px solid #27ae60';
        successElement.style.borderRadius = '5px';
        successElement.style.textAlign = 'center';
        
        // Inserir mensagem após o formulário
        contactForm.appendChild(successElement);
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }
    
    // ===== NAVEGAÇÃO SUAVE =====
    // Adicionar comportamento suave para links de navegação interna
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calcular posição considerando o header fixo
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== EFEITO DE SCROLL NO HEADER =====
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adicionar/remover classe baseada na posição do scroll
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(28, 112, 94, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#1c705e';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== ANIMAÇÃO DE ENTRADA DOS ELEMENTOS =====
    // Função para verificar se elemento está visível na tela
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Função para animar elementos quando entram na tela
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.product-item, .gallery-grid img');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.classList.add('animated');
                }, 100);
            }
        });
    }
    
    // Executar animação no scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Executar animação no carregamento da página
    animateOnScroll();
    
    // ===== GALERIA DE IMAGENS (LIGHTBOX SIMPLES) =====
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // Criar overlay para lightbox
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            overlay.style.zIndex = '9999';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.cursor = 'pointer';
            
            // Criar imagem ampliada
            const enlargedImage = document.createElement('img');
            enlargedImage.src = this.src;
            enlargedImage.alt = this.alt;
            enlargedImage.style.maxWidth = '90%';
            enlargedImage.style.maxHeight = '90%';
            enlargedImage.style.objectFit = 'contain';
            enlargedImage.style.borderRadius = '10px';
            
            overlay.appendChild(enlargedImage);
            document.body.appendChild(overlay);
            
            // Fechar lightbox ao clicar no overlay
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
            
            // Fechar lightbox com tecla ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                }
            });
        });
    });
    
    console.log('Site Duo Gelatto carregado com sucesso!');
});

