# Contributing to Game Store Link Extractor

Thank you for your interest in contributing to this project. We welcome contributions that help improve the extension's functionality, code quality, and store support.

## How to Contribute

### Reporting Bugs
If you encounter an issue, please create a new ticket in the **Issues** tab. To help us resolve the problem quickly, please include:
* **Target Store**: Google Play or Apple App Store?
* **Description**: A clear summary of the bug.
* **Steps to Reproduce**: Detailed steps to make the bug appear.
* **Context**: The specific search URL or query used.
* **Environment**: Your browser version and OS.

### Suggesting Enhancements
We appreciate ideas for new features. Please open an issue labeled `enhancement` and describe:
* The current limitation or problem.
* The proposed solution or feature behavior.

### Pull Request Process
1.  **Fork** the repository to your own GitHub account.
2.  **Clone** the project to your local machine.
3.  Create a new **branch** for your feature or fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4.  **Commit** your changes with clear, descriptive messages.
5.  **Push** to your fork and submit a **Pull Request** to the `main` branch.

## Development Guidelines

* **Manifest V3**: Ensure all changes comply with Chrome's Manifest V3 architecture. The extension relies on `activeTab` and `scripting` permissions.
* **Dual Store Support**: 
    * Logic for Google Play resides in `extractGooglePlayLinks`.
    * Logic for App Store resides in `extractAppleStoreLinks`.
    * Ensure changes in `popup.js` do not break functionality for the opposing store.
* **Code Style**: Maintain consistency with the existing JavaScript coding style (ES6+).
* **Testing**: Verify that your changes work on **both** `play.google.com` and `apps.apple.com` search results pages before submitting.
