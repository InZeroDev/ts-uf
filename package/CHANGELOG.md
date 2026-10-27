# Changelog

## [0.2.0] - 2026-11-27

### Added

- Added regular expression utilities.
- Added `findLastMatch` and `weightedRandom` utilities.

### Changed

- Exported types from their respective categories instead of exclusively from the types entry point.
- Removed the types entry point.
- Renamed `inclusive` parameter to `inclusiveMax` in `getRandomInteger`

### Fixed

- Fixed `getRandomFloat()` returning values outside the specified range due to an incorrect `+1` in the calculation.

## [0.1.0] - 2026-11-27

### Added

- `toArray`: Converts a value to an array if it's not already one.
- `unwrapValue` Extracts a value by invoking it if it's a function, otherwise returns it unchanged.

## [0.0.2] - 2026-11-26

### Added

- Added content to `README.md`.

## [0.0.1] - 2026-11-26

First release.
