# Changelog

## [0.3.1] - 2026-11-15

### Fixed

- Correct exports field in `package.json`.

## [0.3.0] - 2026-11-15

### Breaking Changes

- Drop support for CJS. The package is now ESM-only

### Added

- Added boolean validation utils: `isTrue`, `isFalse`, `isNotTrue`, `isNotFalse`, `isTruthy` and `isFalsy`.
- Added `len` utility.
- Added object update utils: `updateObject`, `updateKeys`, `updateValues` and `deleteKeys`.
- Added object merge utils: `mergeIntersection`, `mergeUnion`, `mergePatch`, `mergeDifference`, `mergeSymDifference`, `mergeDefaults` and `mergeDefaultsDeep`.

### Changed

- Utility implementation improvements. Same behavior.
- Upgrade `@inzero/ts-ut` to **v0.5.0**
- Validation utilities now accept any value originating from a generic type parameter.

### Fixed

- Set `@inzero/ts-ut` as a dependency.
- Correct `getEntries` return type.

## [0.2.0] - 2026-10-27

### Added

- Added regular expression utilities.
- Added `findLastMatch` and `weightedRandom` utilities.

### Changed

- Exported types from their respective categories instead of exclusively from the types entry point.
- Removed the types entry point.
- Renamed `inclusive` parameter to `inclusiveMax` in `getRandomInteger`

### Fixed

- Fixed `getRandomFloat()` returning values outside the specified range due to an incorrect `+1` in the calculation.

## [0.1.0] - 2026-10-27

### Added

- `toArray`: Converts a value to an array if it's not already one.
- `unwrapValue` Extracts a value by invoking it if it's a function, otherwise returns it unchanged.

## [0.0.2] - 2026-10-26

### Added

- Added content to `README.md`.

## [0.0.1] - 2026-10-26

First release.
