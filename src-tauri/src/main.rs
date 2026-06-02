// 预编译指令：仅在非调试模式下启用 Windows 子系统
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    focusflow_lib::run()
}
