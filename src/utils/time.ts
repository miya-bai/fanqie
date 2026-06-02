/**
 * 时间工具函数
 * 包含时间格式化、日期计算等功能
 */

/**
 * 格式化时间：将秒转换为 MM:SS 格式
 * @param seconds 秒数
 * @returns 格式化后的字符串，如 "25:00"
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 获取今天的日期字符串 (YYYY-MM-DD)
 * @returns 日期字符串
 */
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * 获取最近 n 天的日期字符串数组
 * @param n 天数
 * @returns 日期字符串数组
 */
export function getRecentDays(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
}

/**
 * 计算连续专注天数
 * @param records 番茄记录数组
 * @returns 连续天数
 */
export function calculateStreak(records: { completedAt: string }[]): number {
  if (records.length === 0) return 0;

  // 提取所有有记录的日期
  const dates = new Set(
    records.map((r) => r.completedAt.split('T')[0])
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    if (dates.has(dateStr)) {
      streak++;
    } else if (i > 0) {
      // 今天没有记录则中断（昨天开始断掉）
      break;
    }
  }

  return streak;
}

/**
 * 格式化日期为友好显示
 * @param dateStr 日期字符串 (YYYY-MM-DD)
 * @returns 格式化后的字符串，如 "周一"
 */
export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  return `周${days[date.getDay()]}`;
}

/**
 * 格式化分钟为小时+分钟
 * @param minutes 分钟数
 * @returns 格式化后的字符串，如 "1小时30分钟"
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}分钟`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}小时`;
  }
  return `${hours}小时${mins}分钟`;
}
