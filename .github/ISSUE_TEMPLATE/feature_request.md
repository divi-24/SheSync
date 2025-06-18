name: 🌟 Feature Request
description: Suggest an improvement or new feature
title: "[FEATURE] <short description>"
labels: [enhancement]
assignees: ''

body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting a feature! Fill in the details to help us evaluate it.

  - type: input
    id: summary
    attributes:
      label: Feature Summary
      description: A short title for your feature.
      placeholder: "Add dark mode toggle"
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: Description
      description: Describe the feature you'd like to add.
      placeholder: "It would be useful to have a dark mode for night users..."

  - type: textarea
    id: benefits
    attributes:
      label: Benefits
      description: How will this feature help users or the project?
  
  - type: checkboxes
    id: contribution
    attributes:
      label: Contribution
      options:
        - label: I would like to implement this feature.
        - label: I am just suggesting this idea.

  - type: checkboxes
    id: terms
    attributes:
      label: Confirmation
      options:
        - label: I have checked existing issues for duplicates.
          required: true
