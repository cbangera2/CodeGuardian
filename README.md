# codeguardian README

This is the README for your extension "codeguardian". After writing up a brief description, we recommend including the following sections.

# Project Tasks and Assignments

This document outlines the tasks and subtasks for our project, including estimated time for completion and assignments. Please check off tasks as they are completed.

## Task List

### Task 1: Setup Development Environment (2 hours)
- [ ] **Subtask 1.1:** Install VS Code, Node.js, and necessary VS Code Extension API libraries. - Assigned to: `@username1`
- [ ] **Subtask 1.2:** Initialize a new extension project using `yo code` generator. - Assigned to: `@username2`

### Task 2: Develop Typing and Pasting Detection (6 hours)
- [ ] **Subtask 2.1:** Implement an event listener for keypresses to capture typing. Log every word typed within 5-second intervals. (3 hours) - Assigned to: `@username3`
- [ ] **Subtask 2.2:** Create an event listener for paste events using VS Code API to detect and log pasted content along with timestamps. (3 hours) - Assigned to: `@username4`

### Task 3: Implement Logging Mechanism (4 hours)
- [ ] **Subtask 3.1:** Develop a logging function to save typing and pasting data to a local file system in a predefined format. (2 hours) - Assigned to: `@username1`
- [ ] **Subtask 3.2:** Implement a function to periodically save logs to prevent data loss. (2 hours) - Assigned to: `@username2`

### Task 4: Basic Encryption for Log Files (4 hours)
- [ ] **Subtask 4.1:** Choose a simple encryption algorithm (e.g., AES) for encrypting log files. (1 hour) - Assigned to: `@username3`
- [ ] **Subtask 4.2:** Implement encryption before saving logs and decryption for analysis. Use a static key for MVP purposes. (3 hours) - Assigned to: `@username4`

### Task 5: Mock-up Data Analysis Scripts (8 hours)
- [ ] **Subtask 5.1:** Write a script to decrypt log files and analyze for typing speed deviations. Use simple statistical calculations (mean, standard deviation). (4 hours) - Assigned to: `@username1`
- [ ] **Subtask 5.2:** Develop a basic similarity check for pasted code against the rest of the file using a simple hash-based comparison. (4 hours) - Assigned to: `@username2`

### Task 6: Simplified Integration with MOSS (4 hours)
- [ ] **Subtask 6.1:** Mock-up integration with MOSS for plagiarism detection. For the MVP, simulate MOSS output for demonstration purposes. (4 hours) - Assigned to: `@username3`

### Task 7: Develop Dashboard Framework (8 hours)
- [ ] **Subtask 7.1:** Set up a basic web application using a simple framework (e.g., Flask for Python or Express for Node.js). (2 hours) - Assigned to: `@username4`
- [ ] **Subtask 7.2:** Implement basic UI components for instructor and student dashboards using Bootstrap or similar CSS frameworks. (6 hours) - Assigned to: `@username1`

### Task 8: Static Data Visualization on Dashboards (6 hours)
- [ ] **Subtask 8.1:** Create static visualizations (e.g., average typing speed, suspicious instances) using Chart.js or similar libraries. (6 hours) - Assigned to: `@username2`

### Task 9: Implement a Basic Chatbot for Student Dashboard (4 hours)
- [ ] **Subtask 9.1:** Integrate a pre-built chatbot API (e.g., Dialogflow or GPT-3) to provide coding improvement tips. Simplify interaction for MVP. (4 hours) - Assigned to: `@username3`

### Task 10: Prepare Demo and Documentation (4 hours)
- [ ] **Subtask 10.1:** Prepare a brief presentation highlighting key features, design choices, and a demo walkthrough. (2 hours) - Assigned to: `@username4`
- [ ] **Subtask 10.2:** Write basic documentation covering setup, usage, and limitations. (2 hours) - Assigned to: `@username1`

## Notes
- Assignments are subject to change based on team availability and skill sets.
- Please update this document regularly to reflect progress and reassignments.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
