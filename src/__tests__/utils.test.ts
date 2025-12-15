import { isCI, formatDuration } from '../utils';

describe('utils', () => {
  describe('isCI', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it('should return false when not in CI', () => {
      delete process.env.CI;
      delete process.env.GITHUB_ACTIONS;
      expect(isCI()).toBe(false);
    });

    it('should return true when CI env is set', () => {
      process.env.CI = 'true';
      expect(isCI()).toBe(true);
    });

    it('should return true when GITHUB_ACTIONS is set', () => {
      process.env.GITHUB_ACTIONS = 'true';
      expect(isCI()).toBe(true);
    });
  });

  describe('formatDuration', () => {
    it('should format milliseconds', () => {
      expect(formatDuration(500)).toBe('500ms');
    });

    it('should format seconds', () => {
      expect(formatDuration(5000)).toBe('5s');
    });

    it('should format minutes and seconds', () => {
      expect(formatDuration(125000)).toBe('2m 5s');
    });

    it('should handle zero seconds in minutes', () => {
      expect(formatDuration(120000)).toBe('2m 0s');
    });
  });
});
