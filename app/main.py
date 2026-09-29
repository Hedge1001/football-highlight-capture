from __future__ import annotations

import sys
from pathlib import Path
from app.ui import HighlightCaptureUI
from app.buffer import RollingVideoBuffer


class HighlightCaptureApp:
    """Main application that integrates UI with video buffer logic."""

    def __init__(self):
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)
        self.buffer = RollingVideoBuffer(max_seconds=60.0)

    def run(self):
        """Launch the UI."""
        print("Football Highlight Capture App starting...")
        print(f"Output directory: {self.output_dir}")
        print("UI initialized with highlight button and capture controls.")


if __name__ == "__main__":
    app = HighlightCaptureApp()
    app.run()

    from PyQt5.QtWidgets import QApplication

    qt_app = QApplication(sys.argv)
    ui = HighlightCaptureUI()
    ui.show()
    sys.exit(qt_app.exec_())
