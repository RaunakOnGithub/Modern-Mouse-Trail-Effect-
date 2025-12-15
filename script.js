document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis({ autoRaf: true });
    const container = document.querySelector(".trail-container");

    const config = {
        imageCount: 5,
        imageLifeSpan: 750,
        removeDelay: 50,
        mouseThreshold: 100,
        scrollThresold: 50,
        idleCursorInterval: 300,
        outDuration: 1000,
        inDuration: 200, // Added this (it was missing!)
        inEasing: "cubic-bezier(.07, .5, .5, .5)", 
        outEasing: "cubic-bezier(.87, 0, .13, 1)",
    };
    const images = Array.from(
        { length: config.imageCount },
        (_, i) => `assets/img${i + 1}.jpg`
    );

    const trail = [];
    let mouseX = 0,
        mouseY = 0,
        lastMouseX = 0,
        lastMouseY = 0;
    let isMoving = false,
        isCursorInContainer = false;
    let lastRemoveTime = 0,
        lastSteadyImageTime = 0,
        lastScrollTime = 0;
    
    // Fixed the syntax error here
    let isScrolling = false, 
        scrollTicking = false;

    const isInContainer = (x, y) => {
        const rect = container.getBoundingClientRect();
        return (
            x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
        );
    };

    const setInitialMousePos = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        isCursorInContainer = isInContainer(mouseX, mouseY);
        document.removeEventListener("mouseover", setInitialMousePos, false);
    };
    document.addEventListener("mouseover", setInitialMousePos, false);

    const hasMovedEnough = () => {
        const distance = Math.sqrt(
            Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
        );
        return distance > config.mouseThreshold;
    };

    const createTrailImage = () => {
        if (!isCursorInContainer) return;

        const now = Date.now();
        if (isMoving && hasMovedEnough()) {
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            createImage();
            return;
        }
        if (!isMoving && now - lastSteadyImageTime >= config.idleCursorInterval) {
            lastSteadyImageTime = now;
            createImage();
        }
    };

    const createImage = () => {
        const img = document.createElement("img");
        img.classList.add("trail-img");

        const randomIndex = Math.floor(Math.random() * images.length);
        const rotation = (Math.random() - 0.5) * 50;
        
        img.src = images[randomIndex];

        const rect = container.getBoundingClientRect();
        const relativeX = mouseX - rect.left;
        const relativeY = mouseY - rect.top;

        img.style.left = `${relativeX}px`;
        img.style.top = `${relativeY}px`;
        
        // Fixed transform syntax
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
        img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;
        
        container.appendChild(img);

        setTimeout(() => {
            img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
        }, 10);

        trail.push({
            element: img,
            rotation: rotation,
            removeTime: Date.now() + config.imageLifeSpan,
        });
    };

    const createScrollTrailImages = () => {
        if (!isCursorInContainer) return;
        lastMouseX += (config.mouseThreshold + 10) * (Math.random() > 0.5 ? 1 : -1);
        lastMouseY += (config.mouseThreshold + 10) * (Math.random() > 0.5 ? 1 : -1);

        createImage();
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    };

    const removeOldImages = () => {
        const now = Date.now(); // 'now' was undefined before
        if (now - lastRemoveTime < config.removeDelay || trail.length === 0) return;

        const oldImageObj = trail[0];
        
        if (now >= oldImageObj.removeTime) {
            const imgToRemove = trail.shift(); 
            
            // Fixed typo: translate(=50% -> -50%)
            imgToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
            imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`;
            
            lastRemoveTime = now;

            // Fixed setTimeout syntax placement
            setTimeout(() => {
                if (imgToRemove.element.parentNode) {
                    imgToRemove.element.parentNode.removeChild(imgToRemove.element);
                }
            }, config.outDuration); 
        }
    };

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isCursorInContainer = isInContainer(mouseX, mouseY);
        if (isCursorInContainer) {
            isMoving = true;
            clearTimeout(window.moveTimeout);
            window.moveTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        }
    });

    window.addEventListener('scroll', () => {
        isCursorInContainer = isInContainer(mouseX, mouseY);

        if (isCursorInContainer) {
            isMoving = true;
            lastMouseX += (Math.random() - 0.5) * 10;
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        }

        const now = Date.now();
        isScrolling = true;

        if (now - lastScrollTime < config.scrollThresold) return;
        lastScrollTime = now;
        
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                if (isScrolling) {
                    createScrollTrailImages();
                    isScrolling = false;
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: false });

    const animate = () => {
        createTrailImage();
        removeOldImages();
        requestAnimationFrame(animate);
    };
    animate();
});