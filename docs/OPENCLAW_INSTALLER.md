# 🦞 OpenClaw Universal Installer

This script automates the setup of the OpenClaw development environment on macOS. It handles all dependencies and configuration steps to get you up and running with a single command.

## 🚀 Quick Start

Open your terminal and run:

```bash
curl -fsSL https://raw.githubusercontent.com/genaforvena/one-time-scripts-catalog/main/scripts/openclaw-installer.sh | bash
```

## ✨ What it does

The installer performs the following steps in order:

1.  **Environment Check**: Verifies that you are running on macOS.
2.  **Architecture Detection**: Detects if you are on an Intel or Apple Silicon (M1/M2/M3) Mac.
3.  **Xcode Command Line Tools**: Checks for and installs the necessary developer tools from Apple.
4.  **Homebrew Installation**: Installs the Homebrew package manager if it's missing (essential for installing other tools).
5.  **Node.js Setup**: Checks for Node.js and installs it via Homebrew if needed.
6.  **OpenClaw Installation**: Installs the `openclaw` package globally using `npm`.

## 🛡️ Safety Features

-   **Interactive Prompts**: The script asks for permission before installing major components (Homebrew, Node.js).
-   **Error Handling**: Stops immediately if a critical error occurs.
-   **Logging**: All actions are logged to `/tmp/openclaw_install.log` for troubleshooting.
-   **No Hidden Changes**: The script is transparent about what it's doing at each step.

## 📋 Prerequisites

-   **OS**: macOS (Intel or Apple Silicon)
-   **Internet Connection**: Required to download dependencies.
-   **Administrator Privileges**: You may be prompted for your password (`sudo`) during the installation of Xcode tools or global npm packages.

## 🛠 Troubleshooting

If the installation fails, check the log file:

```bash
cat /tmp/openclaw_install.log
```

Common issues:
-   **Permission Denied**: Ensure you have admin rights on your machine.
-   **Network Errors**: Check your internet connection.

## 📦 Uninstallation

To remove OpenClaw and its global package:

```bash
npm uninstall -g openclaw
```

(Note: This does not remove Homebrew or Node.js if they were installed by the script, as other applications might depend on them.)
