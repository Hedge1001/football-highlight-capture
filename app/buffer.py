from __future__ import annotations

import os
import time
from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class HighlightEvent:
    started_at: float
    duration_seconds: float = 60.0
    file_path: Optional[str] = None
    label: str = "highlight"


class RollingVideoBuffer:
    """Simple in-memory buffer model for a rolling capture window."""

    def __init__(self, max_seconds: float = 60.0):
        self.max_seconds = max_seconds
        self.frames: List[object] = []
        self.timestamps: List[float] = []

    def add_frame(self, frame: object, timestamp: Optional[float] = None):
        current_time = time.time() if timestamp is None else timestamp
        self.frames.append(frame)
        self.timestamps.append(current_time)

        if len(self.timestamps) > 1:
            while self.timestamps and (current_time - self.timestamps[0]) > self.max_seconds:
                self.frames.pop(0)
                self.timestamps.pop(0)

    def get_window(self, seconds_before: float = 30.0, seconds_after: float = 30.0):
        if not self.timestamps:
            return []

        now = self.timestamps[-1]
        start_time = now - seconds_before
        end_time = now + seconds_after

        window = []
        for frame, ts in zip(self.frames, self.timestamps):
            if start_time <= ts <= end_time:
                window.append((frame, ts))
        return window

    def clear(self):
        self.frames.clear()
        self.timestamps.clear()


if __name__ == "__main__":
    buffer = RollingVideoBuffer(max_seconds=60.0)
    print("RollingVideoBuffer initialized")
