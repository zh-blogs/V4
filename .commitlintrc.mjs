/**
 * @type {import("@commitlint/types").UserConfig}
 */
const Configuration = {
  extends: ['@commitlint/config-conventional'], //
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
        'ci',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [0],
    'scope-empty': [0],
    'scope-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 72],
  },
  defaultIgnores: true,
  helpUrl: 'https://www.conventionalcommits.org/',
  prompt: {
    messages: {
      skip: 'Optional (press enter to skip)',
      max: 'Maximum %d characters',
      min: 'Minimum %d characters',
      emptyWarning: 'Cannot be empty',
      upperLimitWarning: 'Over limit',
      lowerLimitWarning: 'Below limit',
    },
    questions: {
      type: {
        description: 'Select the type of change you are committing:',
        enum: {
          feat: 'A new feature',
          fix: 'A bug fix',
          docs: 'Documentation changes',
          style: 'Code formatting changes',
          refactor: 'Code refactoring',
          perf: 'Performance improvements',
          test: 'Adding or updating tests',
          chore: 'Changes to build process or tools',
          revert: 'Revert a previous commit',
          build: 'Changes that affect the build system',
          ci: 'Changes to CI/CD configuration',
        },
      },
      scope: {
        description: 'Enter the scope of this change (optional):',
      },
      subject: {
        description: 'Write a short description of the change:',
      },
      body: {
        description: 'Provide a longer description of the change (optional):',
      },
    },
  },
}

export default Configuration
