#!/bin/bash

# Personal Website Deployment Script
# Automates the process of pushing changes to GitHub Pages

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/pruthvi54/pruthvi54.github.io.git"
GITHUB_PAGES_URL="https://pruthvi54.github.io"
PROJECT_DIR="/home/pruthvi/Desktop/personal_website"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in the right directory
check_directory() {
    if [ ! -d ".git" ]; then
        print_error "Not in a git repository. Please run this script from the project directory."
        exit 1
    fi
    
    if [ "$(pwd)" != "$PROJECT_DIR" ]; then
        print_warning "Not in expected directory. Changing to $PROJECT_DIR"
        cd "$PROJECT_DIR" || exit 1
    fi
}

# Function to check if git is configured
check_git_config() {
    if ! git config user.name > /dev/null 2>&1; then
        print_error "Git user.name not configured."
        read -p "Enter your name: " user_name
        git config --global user.name "$user_name"
        print_success "Git user.name set to: $user_name"
    fi
    
    if ! git config user.email > /dev/null 2>&1; then
        print_error "Git user.email not configured."
        read -p "Enter your email: " user_email
        git config --global user.email "$user_email"
        print_success "Git user.email set to: $user_email"
    fi
}

# Function to check authentication
check_auth() {
    print_status "Checking GitHub authentication..."
    
    # Try to fetch from remote to test authentication
    if ! git fetch origin --dry-run > /dev/null 2>&1; then
        print_warning "GitHub authentication not configured or expired."
        print_status "Setting up GitHub CLI authentication..."
        
        # Check if gh is installed
        if ! command -v gh &> /dev/null; then
            print_status "Installing GitHub CLI..."
            sudo apt update && sudo apt install -y gh
        fi
        
        print_status "Please authenticate with GitHub:"
        gh auth login
        
        # Test authentication again
        if ! git fetch origin --dry-run > /dev/null 2>&1; then
            print_error "Authentication failed. Please check your credentials."
            exit 1
        fi
    fi
    
    print_success "GitHub authentication verified!"
}

# Function to check for changes
check_changes() {
    print_status "Checking for changes..."
    
    if git diff-index --quiet HEAD --; then
        print_warning "No changes detected in tracked files."
        
        # Check for untracked files
        if [ -z "$(git ls-files --others --exclude-standard)" ]; then
            print_warning "No untracked files found either."
            read -p "Do you want to continue anyway? (y/N): " continue_anyway
            if [[ ! "$continue_anyway" =~ ^[Yy]$ ]]; then
                print_status "Deployment cancelled."
                exit 0
            fi
        else
            print_status "Found untracked files:"
            git ls-files --others --exclude-standard
        fi
    else
        print_success "Changes detected!"
        git status --short
    fi
}

# Function to stage and commit changes
commit_changes() {
    print_status "Staging all changes..."
    git add .
    
    # Show what will be committed
    if ! git diff-index --quiet --cached HEAD --; then
        print_status "Files to be committed:"
        git diff --cached --name-status
        
        # Get commit message
        echo ""
        read -p "Enter commit message (or press Enter for default): " commit_msg
        
        if [ -z "$commit_msg" ]; then
            commit_msg="Update website content - $(date '+%Y-%m-%d %H:%M')"
        fi
        
        print_status "Committing changes with message: '$commit_msg'"
        git commit -m "$commit_msg"
        print_success "Changes committed successfully!"
    else
        print_warning "No changes to commit."
    fi
}

# Function to push to GitHub
push_changes() {
    print_status "Pushing to GitHub..."
    
    # Get current branch
    current_branch=$(git rev-parse --abbrev-ref HEAD)
    print_status "Pushing branch: $current_branch"
    
    git push origin "$current_branch"
    print_success "Successfully pushed to GitHub!"
}

# Function to monitor deployment
monitor_deployment() {
    print_status "Monitoring GitHub Actions deployment..."
    print_status "You can view the deployment progress at:"
    echo "  https://github.com/pruthvi54/pruthvi54.github.io/actions"
    
    print_status "Waiting for deployment to complete..."
    
    # Wait for a reasonable amount of time
    sleep 30
    
    print_status "Deployment should be complete. Checking site..."
    
    # Try to ping the site
    if curl -s --head "$GITHUB_PAGES_URL" | head -n 1 | grep -q "200 OK"; then
        print_success "Site is responding!"
    else
        print_warning "Site may still be deploying. Please check manually."
    fi
}

# Function to open the website
open_website() {
    print_success "Your website should be live at: $GITHUB_PAGES_URL"
    
    read -p "Do you want to open the website in your browser? (y/N): " open_browser
    if [[ "$open_browser" =~ ^[Yy]$ ]]; then
        if command -v xdg-open &> /dev/null; then
            xdg-open "$GITHUB_PAGES_URL"
        elif command -v firefox &> /dev/null; then
            firefox "$GITHUB_PAGES_URL" &
        else
            print_warning "Could not detect browser. Please manually visit: $GITHUB_PAGES_URL"
        fi
    fi
}

# Main deployment function
main() {
    echo ""
    echo "=================================="
    echo "🚀 Personal Website Deployment"
    echo "=================================="
    echo ""
    
    # Run all checks and deployment steps
    check_directory
    check_git_config
    check_auth
    check_changes
    commit_changes
    push_changes
    monitor_deployment
    open_website
    
    echo ""
    echo "=================================="
    print_success "Deployment Complete! ✨"
    echo "=================================="
    echo ""
    print_status "Next steps:"
    echo "  • Wait 2-3 minutes for full propagation"
    echo "  • Hard refresh (Ctrl+F5) to see changes"
    echo "  • Check GitHub Actions if issues occur"
    echo ""
}

# Run main function
main "$@"
