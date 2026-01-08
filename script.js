// 当整个页面加载完毕后执行
document.addEventListener('DOMContentLoaded', function() {

    // ----------- 配置区域 -----------
    const totalAudioFiles = 6;    // 你的音频文件总数
    const audioFileType = '.mp3'; // 音频文件类型
    // -------------------------------

    const playButton = document.getElementById('play-button');
    const audioFilePaths = Array.from({ length: totalAudioFiles }, (_, i) => `audio/${i + 1}${audioFileType}`);
    
    let currentAudio = null; // 用于跟踪当前正在播放的音频
    let lastPlayedIndex = -1;

    /**
     * 核心功能：播放一首随机的音频（专业版）
     */
    function playRandomAudio() {
        if (audioFilePaths.length === 0) {
            console.error("音频列表为空，请检查配置。");
            return;
        }

        // 1. 如果有音频正在播放，先停止并重置它
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // 2. 获取一个新的随机音频
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * audioFilePaths.length);
        } while (audioFilePaths.length > 1 && randomIndex === lastPlayedIndex);
        
        lastPlayedIndex = randomIndex;
        const randomAudioSrc = audioFilePaths[randomIndex];

        console.log(`准备播放: ${randomAudioSrc}`);

        // 3. 创建一个全新的 Audio 对象来播放
        currentAudio = new Audio(randomAudioSrc);

        // 4. 尝试播放，并处理可能的错误
        currentAudio.play()
            .then(() => {
                console.log(`播放成功: ${randomAudioSrc}`);
            })
            .catch(error => {
                // 这个错误只在页面初次加载时出现是正常的
                console.warn(`播放 ${randomAudioSrc} 失败，可能是浏览器策略。错误:`, error);
            });
    }

    // 为按钮添加点击事件监听器
    playButton.addEventListener('click', playRandomAudio);

    // 页面首次加载或刷新时，尝试播放一首随机音频
    playRandomAudio();

});
// ... (上面 playRandomAudio 函数的代码保持不变)

// 为按钮添加点击事件监听器
playButton.addEventListener('click', playRandomAudio);

// --- 新增的入口逻辑 ---
const enterOverlay = document.getElementById('enter-overlay');
const enterButton = document.getElementById('enter-button');

enterButton.addEventListener('click', () => {
    // 隐藏遮罩层
    enterOverlay.style.display = 'none';
    
    // 在用户第一次点击后，播放第一首随机音频
    playRandomAudio();
});

// 页面首次加载或刷新时，不再直接调用播放，而是等待用户点击入口
// playRandomAudio(); // <-- 把这一行注释掉或删除
