import { it, expect, describe, vi } from 'vitest';

describe('test suite', () => {
  it('test case', () => {
    const sendText = vi.fn()
    sendText.mockReturnValue('ok')

    const result = sendText('message');

    expect(sendText).toHaveBeenCalledWith('message');
    expect(result).toBe('ok')
  })
})