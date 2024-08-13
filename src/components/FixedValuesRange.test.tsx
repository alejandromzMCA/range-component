import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import FixedValuesRange from './FixedValuesRange'

describe('FixedValuesRange  Component', () => {
    it('should have right number of limits with 4 rangeLimitsValue', async () => {
        render(<FixedValuesRange rangeLimitsValue={[10, 30, 70, 100]} />);
        const limits = screen.getAllByTitle(/Limit/);

        expect(limits).toHaveLength(4);
    });
    it('should have right number of limits with 6 rangeLimitsValue', async () => {
        render(<FixedValuesRange rangeLimitsValue={[10, 20, 40, 60, 80, 100]} />);
        const limits = screen.getAllByTitle(/Limit/);

        expect(limits).toHaveLength(6);
    });
    it('should call onValuesChange with correct values first time', async () => {
        const onValuesChangeMock = vi.fn();
        render(<FixedValuesRange rangeLimitsValue={[10, 30, 70, 100]} onValuesChange={onValuesChangeMock} />);

        expect(onValuesChangeMock).toHaveBeenCalledWith(10, 30);
    });
    it('should disable dragging the left dot over right dot', async () => {
        const onValuesChangeMock = vi.fn();
        render(<FixedValuesRange rangeLimitsValue={[10, 30, 70, 100]} onValuesChange={onValuesChangeMock} />);

        const lefDot = screen.getByRole('slider', { name: "Left drag handle" });
        fireEvent.mouseDown(lefDot, { clientX: 100 });
        fireEvent.mouseMove(lefDot, { clientX: 300 });
        fireEvent.mouseUp(lefDot);

        expect(onValuesChangeMock).toHaveBeenCalledWith(10, 30);
    });
    it('should allow dragging the right dot to the right', async () => {
        const onValuesChangeMock = vi.fn();
        render(<FixedValuesRange rangeLimitsValue={[10, 30, 70, 100]} onValuesChange={onValuesChangeMock} />);

        const rightDot = screen.getByRole('slider', { name: "Right drag handle" });
        fireEvent.mouseDown(rightDot, { clientX: 100 });
        fireEvent.mouseMove(rightDot, { clientX: 300 });
        fireEvent.mouseUp(rightDot);

        expect(onValuesChangeMock).toHaveBeenCalledWith(10, 70);
    });
})