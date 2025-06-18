name: 🐛 Bug Report
description: Report a bug to help us improve the project
title: "[BUG] <short description>"
labels: [bug]
assignees: ''

body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting a bug! Please fill out the details below.

  - type: input
    id: summary
    attributes:
      label: Bug Summary
      description: Provide a short summary of the bug.
      placeholder: "The app crashes when clicking on the Help button"
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: List the steps to reproduce the issue.
      placeholder: |
        1. Go to '...'
        2. Click on '...'
        3. Scroll down to '...'
        4. See error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What did you expect to happen?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened?
    validations:
      required: true

  - type: input
    id: environment
    attributes:
      label: Environment
      description: OS, browser, or tool version (if applicable)
      placeholder: "e.g. Windows 11, Chrome 122"

  - type: textarea
    id: logs
    attributes:
      label: Relevant Logs or Screenshots
      description: Attach screenshots or error logs
      placeholder: "Paste logs or upload screenshots"

  - type: checkboxes
    id: terms
    attributes:
      label: Confirmation
      options:
        - label: I have checked existing issues for duplicates.
          required: true
        - label: I want to work on this issue.
