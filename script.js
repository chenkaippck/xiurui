// 当整个页面加载完毕后执行
document.addEventListener('DOMContentLoaded', function() {

    // ----------- 配置区域 -----------
    const totalAudioFiles = 6; // 你的音频文件总数
    const audioFileType = '.wav'; // 音频文件类型
    // -------------------------------

    const playButton = document.getElementById('play-button');
    let audioPlayer = new Audio(); // 创建一个音频播放器实例
    let lastPlayedIndex = -1; // 用于记录上一个播放的索引，避免连续重复

    // 创建音频文件列表
    const audioFiles = [];
    for (let i = 1; i <= totalAudioFiles; i++) {
        audioFiles.push(`audio/${i}${audioFileType}`);
    }

    /**
     * 核心功能：播放一首随机的音频
     */
    function playRandomAudio() {
        if (audioFiles.length === 0) {
            console.error("音频列表为空，请检查配置。");
            return;
        }

        let randomIndex;
        // 循环生成随机数，直到它不等于上一个播放的索引
        // 这个循环可以防止连续两次播放同一首音频，提升用户体验
        do {
            randomIndex = Math.floor(Math.random() * audioFiles.length);
        } while (audioFiles.length > 1 && randomIndex === lastPlayedIndex);

        lastPlayedIndex = randomIndex; // 更新最后播放的索引
        const randomAudioSrc = audioFiles[randomIndex];

        console.log(`正在播放: ${randomAudioSrc}`);
        
        audioPlayer.src = randomAudioSrc; // 设置音频源
        
        // 播放音频，并处理可能出现的自动播放错误
        audioPlayer.play().catch(error => {
            // 现代浏览器通常禁止在用户未与页面交互前自动播放音频。
            // 首次加载页面时的播放可能会因此失败，这是正常现象。
            // 用户点击按钮后的播放则没有问题。
            console.warn("音频自动播放失败，这可能是浏览器策略导致的。错误信息:", error);
        });
    }

    // 需求3: 为按钮添加点击事件监听器
    playButton.addEventListener('click', playRandomAudio);

    // 需求1 & 4: 页面首次加载或刷新时，播放一首随机音频
    // 注意：如上所述，这可能会被浏览器阻止，直到用户点击页面。
    playRandomAudio();

});
