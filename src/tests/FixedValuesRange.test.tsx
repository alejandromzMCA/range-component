import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import FixedValuesRange from '../components/FixedValuesRange'

describe('FixedValuesRange  Component', () => {
    it('should call onValuesChange with correct values', async () => {
        const onValuesChangeMock = vi.fn();

        render(<FixedValuesRange rangeLimitsValue={[10, 30, 70, 100]} onValuesChange={onValuesChangeMock} />);

        expect(onValuesChangeMock).toHaveBeenCalledWith(70, 100);
    });
    it('should allow dragging the left dot', async () => {
        const onValuesChangeMock = vi.fn();
        render(<FixedValuesRange rangeLimitsValue={[10, 30, 70, 100]} onValuesChange={onValuesChangeMock} />);

        expect(onValuesChangeMock).toHaveBeenCalledWith(70, 100);

        const lefDot = screen.getByRole('slider', { name: "Left drag handle" });
        fireEvent.mouseDown(lefDot, { clientX: 100 });
        fireEvent.mouseMove(lefDot, { clientX: 300 });
        fireEvent.mouseUp(lefDot);

        expect(onValuesChangeMock).toHaveBeenCalledWith(10, 100);
    });
})