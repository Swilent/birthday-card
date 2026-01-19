/**
 * 生日祝福贺卡
 * 功能: 生日祝福信、彩带动画、音乐控制
 */

// ==================== 全局变量 ====================
let bgm = null;
let isMusicPlaying = false;
const state = {
    confettiRunning: false,
    animationId: null
};

// ==================== DOM元素 ====================
const elements = {
    closeBtn: document.getElementById('closeBtn'),
    giftIcon: document.getElementById('giftIcon'),
    celebrationOverlay: document.getElementById('celebrationOverlay'),
    confettiCanvas: document.getElementById('confettiCanvas'),
    body: document.body
};

// ==================== 音乐控制模块 ====================
class MusicController {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.volume = 0.5;
        this.hasInteracted = false;
    }

    init() {
        if (this.audio) return;

        this.audio = new Audio('audio.mp3');
        this.audio.loop = true;
        this.audio.volume = this.volume;

        // 尝试自动播放
        this.play().catch(() => {
            console.log('自动播放被阻止，等待用户交互');
            // 自动播放失败时，添加点击页面任意位置后播放的功能
            const enablePlay = () => {
                this.play();
                document.removeEventListener('click', enablePlay);
                document.removeEventListener('touchstart', enablePlay);
                document.removeEventListener('keydown', enablePlay);
            };
            document.addEventListener('click', enablePlay, { once: true });
            document.addEventListener('touchstart', enablePlay, { once: true });
            document.addEventListener('keydown', enablePlay, { once: true });
        });
    }

    play() {
        if (!this.audio) {
            this.init();
        }
        const playPromise = this.audio?.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    this.isPlaying = true;
                })
                .catch(err => {
                    console.log('播放失败:', err);
                    this.isPlaying = false;
                });
        }

        return playPromise;
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
            return Promise.resolve(false);
        } else {
            return this.play();
        }
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        if (this.audio) {
            this.audio.volume = this.volume;
        }
    }
}

const musicController = new MusicController();

// ==================== UI控制模块 ====================
class UIController {
    static createThankYouMessage() {
        return `
            <div class="thank-you-container">
                <div class="thank-you-content">
                    <h2>感谢阅读</h2>
                    <p>希望你天天开心</p>
                    <button class="reopen-btn" id="reopenBtn">重新打开</button>
                </div>
            </div>
        `;
    }

    static showThankYou() {
        const container = document.querySelector('.container');
        if (container) {
            container.style.opacity = '0';
            setTimeout(() => {
                container.innerHTML = this.createThankYouMessage();
                container.style.opacity = '1';
                this.bindReopenButton();
            }, 300);
        }
    }

    static bindReopenButton() {
        const reopenBtn = document.getElementById('reopenBtn');
        if (reopenBtn) {
            reopenBtn.addEventListener('click', () => {
                location.reload();
            });
        }
    }

    static createMusicControl() {
        const control = document.createElement('div');
        control.className = 'music-control';
        control.innerHTML = `
            <button id="musicToggle" class="music-toggle" aria-label="切换音乐">
                <span class="music-icon">🎵</span>
            </button>
            <input type="range" id="volumeSlider" class="volume-slider"
                   min="0" max="100" value="50" aria-label="音量控制">
        `;
        return control;
    }

    static initMusicControl() {
        const control = this.createMusicControl();
        document.body.appendChild(control);

        const toggleBtn = document.getElementById('musicToggle');
        const volumeSlider = document.getElementById('volumeSlider');

        toggleBtn.addEventListener('click', async () => {
            await musicController.toggle();
            this.updateMusicButton(toggleBtn);
        });

        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            musicController.setVolume(volume);
        });

        // 初始化按钮状态
        setTimeout(() => this.updateMusicButton(toggleBtn), 100);
    }

    static updateMusicButton(button) {
        const icon = button.querySelector('.music-icon');
        if (musicController.isPlaying) {
            icon.textContent = '🎵'; // 音乐图标（播放中）
            button.classList.add('playing');
        } else {
            icon.textContent = '🔇'; // 静音图标
            button.classList.remove('playing');
        }
    }
}

// ==================== 彩带动画模块 ====================
class ConfettiAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = null;
        this.pieces = [];
        this.animationId = null;
        this.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#FFD700', '#FF69B4'];
    }

    init() {
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.createPieces();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createPieces() {
        this.pieces = [];
        const pieceCount = Math.min(150, Math.floor((this.canvas.width * this.canvas.height) / 10000));

        for (let i = 0; i < pieceCount; i++) {
            this.pieces.push(this.createPiece());
        }
    }

    createPiece(resetY = false) {
        return {
            x: Math.random() * this.canvas.width,
            y: resetY ? -20 : Math.random() * this.canvas.height - this.canvas.height,
            rotation: Math.random() * 360,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            size: Math.random() * 10 + 5,
            speed: Math.random() * 3 + 2,
            rotationSpeed: Math.random() * 4 - 2,
            wobble: Math.random() * 10 - 5,
            wobbleSpeed: Math.random() * 0.1 + 0.05
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.pieces.forEach(piece => {
            this.ctx.save();
            this.ctx.translate(piece.x, piece.y);
            this.ctx.rotate(piece.rotation * Math.PI / 180);
            this.ctx.fillStyle = piece.color;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            this.ctx.restore();

            piece.y += piece.speed;
            piece.rotation += piece.rotationSpeed;
            piece.x += Math.sin(piece.y * piece.wobbleSpeed) * piece.wobble;

            if (piece.y > this.canvas.height + 20) {
                Object.assign(piece, this.createPiece(true));
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (this.animationId) return;
        this.init();
        this.animate();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// 创建彩带动画实例
const confettiAnimation = new ConfettiAnimation(elements.confettiCanvas);

// ==================== 音效模块 ====================
function playBirthdaySound() {
    try {
        // 兼容不同浏览器的 AudioContext
        const AudioContextClass = window.AudioContext || window['webkitAudioContext'];
        const audioContext = new AudioContextClass();

        const notes = [
            { freq: 262, duration: 0.3 },
            { freq: 262, duration: 0.3 },
            { freq: 294, duration: 0.6 },
            { freq: 262, duration: 0.6 },
            { freq: 349, duration: 0.6 },
            { freq: 330, duration: 1.2 },
        ];

        let startTime = audioContext.currentTime;

        notes.forEach(note => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = note.freq;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);

            oscillator.start(startTime);
            oscillator.stop(startTime + note.duration);

            startTime += note.duration;
        });
    } catch (e) {
        console.log('Audio not supported');
    }
}

// ==================== 事件监听 ====================

// 关闭按钮
elements.closeBtn.addEventListener('click', () => {
    if (confirm('确定要关闭这封信吗？')) {
        musicController.pause();
        UIController.showThankYou();
    }
});

// 礼物点击事件
elements.giftIcon.addEventListener('click', () => {
    elements.celebrationOverlay.classList.add('active');
    confettiAnimation.start();
    playBirthdaySound();
});

// 点击覆盖层任意位置关闭
elements.celebrationOverlay.addEventListener('click', () => {
    elements.celebrationOverlay.classList.remove('active');
    confettiAnimation.stop();
});

// 窗口大小改变
window.addEventListener('resize', () => {
    if (elements.celebrationOverlay.classList.contains('active')) {
        confettiAnimation.resize();
    }
});

// ==================== 图片加载处理 ====================
function handleImageError() {
    const qrCode = document.querySelector('.qr-code');
    if (qrCode) {
        qrCode.style.display = 'none';
        const container = qrCode.closest('.qr-code-container');
        if (container) {
            const errorHint = document.createElement('p');
            errorHint.className = 'qr-error';
            errorHint.textContent = '💝 生日礼物正在准备中...';
            errorHint.style.cssText = 'font-size: 18px; color: #FFD700; margin-top: 20px;';
            container.appendChild(errorHint);
        }
    }
}

// 预加载二维码图片
function preloadQRCode() {
    const qrCode = document.querySelector('.qr-code');
    if (qrCode) {
        qrCode.addEventListener('error', handleImageError);

        // 预加载图片
        const img = new Image();
        img.src = qrCode.src;
        img.addEventListener('error', handleImageError);
    }
}

// ==================== 页面初始化 ====================
window.addEventListener('load', () => {
    // 页面淡入动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // 初始化音乐
    musicController.init();

    // 初始化音乐控制UI
    UIController.initMusicControl();

    // 预加载二维码
    preloadQRCode();
});

// ==================== 清理 ====================
window.addEventListener('beforeunload', () => {
    musicController.pause();
    confettiAnimation.stop();
});
