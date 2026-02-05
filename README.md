# bash-flutter extension

A VS Code extension that provides Flutter code generation capabilities through integration with the bash-flutter-cli tool. This extension allows you to quickly generate Flutter pages and BLoC patterns directly from VS Code.

## Features

This extension provides the following Flutter code generation features:

- **Generate New Page**: Create a new Flutter page with boilerplate code
- **Generate New BLoC Page**: Create a new Flutter page with BLoC pattern implementation
- **Generate New Golden Test**: Create a simple golden test scaffold for a single component case
- **Context Menu Integration**: Right-click on folders in the Explorer to generate code directly in the selected directory
- **Command Palette Support**: Access all commands through Ctrl+Shift+P (Cmd+Shift+P on macOS)

> **Note**: All code generation features depend on the `bash-flutter-cli` tool being installed and available in your system PATH.

## Requirements

This extension requires the following dependencies to function properly:

### bash-flutter-cli
**Required**: This extension depends on the `bash-flutter-cli` command-line tool for all code generation functionality.

To install bash-flutter-cli:
```bash
# Install using Homebrew
brew install bash-flutter-cli
```

**Important**: Make sure the `bf` command is available in your system PATH after installation. You can verify the installation by running:
```bash
bf --version
```

### Flutter SDK
- Flutter SDK must be installed and configured
- Flutter command should be available in your PATH



## Known Issues

- **Command fails with "command not found"**: Ensure `bash-flutter-cli` is properly installed and available in your system PATH
- **Generation fails silently**: Check that you're running the command in a valid Flutter project directory
- **Permission errors**: Ensure VS Code has write permissions to the target directory

If you encounter issues, first verify that bash-flutter-cli works correctly from your terminal:
```bash
bf --help
```

## Release Notes

### 1.0.0

Initial release of bash-flutter VS Code extension with Flutter page and BLoC generation capabilities.

Authored by: _Karabo Matabane_