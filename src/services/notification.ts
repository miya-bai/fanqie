/**
 * 通知服务
 * 处理桌面通知和提示音
 */

import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';

// ==================== 桌面通知 ====================

/**
 * 请求通知权限
 */
export async function requestNotificationPermission(): Promise<boolean> {
  try {
    let granted = await isPermissionGranted();

    if (!granted) {
      const permission = await requestPermission();
      granted = permission === 'granted';
    }

    return granted;
  } catch (error) {
    console.error('请求通知权限失败:', error);
    return false;
  }
}

/**
 * 显示桌面通知
 * @param title 通知标题
 * @param body 通知内容
 */
export async function showNotification(
  title: string,
  body: string
): Promise<void> {
  try {
    const granted = await isPermissionGranted();

    if (granted) {
      sendNotification({ title, body });
    }
  } catch (error) {
    console.error('显示通知失败:', error);
  }
}

// ==================== 提示音 ====================

let audioContext: AudioContext | null = null;

/**
 * 播放提示音
 * 使用 Web Audio API 生成简单的提示音
 */
export function playSound(): void {
  try {
    // 创建音频上下文（懒加载）
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    // 创建振荡器生成音调
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 设置音调参数
    oscillator.frequency.value = 800; // 800Hz
    oscillator.type = 'sine';

    // 设置音量渐变
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    // 播放 0.5 秒
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.error('播放提示音失败:', error);
  }
}

/**
 * 播放完成提示音（更长一些）
 */
export function playCompleteSound(): void {
  try {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    // 播放两个音调
    const playTone = (startTime: number, freq: number) => {
      const oscillator = audioContext!.createOscillator();
      const gainNode = audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext!.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    };

    const now = audioContext.currentTime;
    playTone(now, 800);
    playTone(now + 0.15, 1000);
  } catch (error) {
    console.error('播放完成提示音失败:', error);
  }
}
