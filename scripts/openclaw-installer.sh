#!/bin/bash
# 🦞 OpenClaw Universal Installer for macOS
# Install by running:
#   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/genaforvena/one-time-scripts-catalog/main/scripts/openclaw-installer.sh)"

set -e

# --- Configuration ---
OPENCLAW_PACKAGE="openclaw"
MIN_NODE_VERSION="18.0.0"
LOG_FILE="/tmp/openclaw_install.log"

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# --- Helper Functions ---
log() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

divider() {
    echo -e "${BOLD}----------------------------------------${NC}"
}

check_macos() {
    if [[ "$(uname)" != "Darwin" ]]; then
        error "This installer is designed for macOS only. Please check the documentation for Linux/Windows instructions."
    fi
}

check_dependencies() {
    divider
    log "Checking system dependencies..."
    
    # Check Architecture
    ARCH=$(uname -m)
    if [[ "$ARCH" == "arm64" ]]; then
        log "Detected Apple Silicon (M1/M2/M3)"
    else
        log "Detected Intel Mac"
    fi

    # Check Xcode Command Line Tools
    if ! xcode-select -p &>/dev/null; then
        warn "Xcode Command Line Tools not found. Installing..."
        xcode-select --install
        echo "Please follow the prompt to install Xcode Command Line Tools, then run this script again."
        exit 0
    else
        success "Xcode Command Line Tools found"
    fi
}

install_homebrew() {
    if ! command -v brew &>/dev/null; then
        warn "Homebrew not found. It is recommended for installing dependencies."
        read -p "Do you want to install Homebrew now? (y/N) " response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            log "Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            
            # Add Homebrew to PATH for the current session
            if [[ "$ARCH" == "arm64" ]]; then
                eval "$(/opt/homebrew/bin/brew shellenv)"
            else
                eval "$(/usr/local/bin/brew shellenv)"
            fi
        else
            warn "Skipping Homebrew installation. Some dependencies might be missing."
        fi
    else
        success "Homebrew found"
    fi
}

install_node() {
    if ! command -v node &>/dev/null; then
        warn "Node.js not found."
        if command -v brew &>/dev/null; then
            read -p "Install Node.js via Homebrew? (y/N) " response
            if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
                log "Installing Node.js..."
                brew install node
            else
                error "Node.js is required to install OpenClaw. Please install it manually and run this script again."
            fi
        else
             error "Node.js is required. Please install it from https://nodejs.org/"
        fi
    else
        NODE_VER=$(node -v)
        success "Node.js found ($NODE_VER)"
    fi
}

install_openclaw() {
    divider
    log "Installing OpenClaw..."
    
    if npm list -g "$OPENCLAW_PACKAGE" &>/dev/null; then
        warn "OpenClaw is already installed globally."
        read -p "Reinstall/Update? (y/N) " response
        if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            return
        fi
    fi

    echo "This may require your password for global installation (sudo)."
    if npm install -g "$OPENCLAW_PACKAGE"; then
        success "OpenClaw installed successfully!"
    else
        warn "Permission denied or installation failed. Trying with sudo..."
        sudo npm install -g "$OPENCLAW_PACKAGE" || error "Failed to install OpenClaw."
    fi
}

post_install() {
    divider
    success "Installation Complete! 🦞"
    echo
    echo -e "To verify installation, run:"
    echo -e "  ${BOLD}openclaw --version${NC}"
    echo
    echo -e "To get started:"
    echo -e "  ${BOLD}openclaw init${NC}"
    echo
    echo -e "For documentation, visit: https://github.com/openclaw/docs"
    divider
}

# --- Main Execution ---
trap 'echo -e "\n${RED}[ABORTED]${NC} Installation cancelled by user."; exit 1' SIGINT

echo -e "${BOLD}🦞 OpenClaw Installer${NC}"
echo "Logs will be saved to: $LOG_FILE"
echo ""

check_macos
check_dependencies
install_homebrew
install_node
install_openclaw
post_install
