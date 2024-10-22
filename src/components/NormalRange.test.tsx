import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import NormalRangeOld from './NormalRangeOld'

describe('NormalRange Component', () => {
    it('should call onValuesChange with correct values', async () => {
        const onValuesChangeMock = vi.fn();

        render(<NormalRangeOld minDefault={0} maxDefault={100} onValuesChange={onValuesChangeMock} />);

        expect(onValuesChangeMock).toHaveBeenCalledWith(0, 100);
    });
    it('should update min and max values correctly', async () => {
        render(<NormalRangeOld minDefault={0} maxDefault={100} />);

        const minInput = screen.getByRole('textbox', { name: "Range min limit" });
        const maxInput = screen.getByRole('textbox', { name: "Range max limit" });

        await fireEvent.change(minInput, { target: { value: '50' } });
        await fireEvent.change(maxInput, { target: { value: '200' } });

        expect(await screen.findByDisplayValue('50')).toBeInTheDocument();
        expect(await screen.findByDisplayValue('200')).toBeInTheDocument();
    });
    it('should call onValuesChange with correct values first time', async () => {
        const onValuesChangeMock = vi.fn();
        render(<NormalRangeOld minDefault={0} maxDefault={100} onValuesChange={onValuesChangeMock} />);

        expect(onValuesChangeMock).toHaveBeenCalledWith(0, 100);
    });
    it('should allow dragging the left dot and call onValuesChange with correct values', async () => {
        const onValuesChangeMock = vi.fn();
        render(<NormalRangeOld minDefault={0} maxDefault={100} onValuesChange={onValuesChangeMock} />);

        const lefDot = screen.getByRole('slider', { name: "Left drag handle" });
        fireEvent.mouseDown(lefDot, { clientX: 100 });
        fireEvent.mouseMove(lefDot, { clientX: 150 });
        fireEvent.mouseUp(lefDot);
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(onValuesChangeMock).toHaveBeenCalledWith(35.92, 100);
        fireEvent.mouseDown(lefDot, { clientX: 150 });
        fireEvent.mouseMove(lefDot, { clientX: 200 });
        fireEvent.mouseUp(lefDot);
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(onValuesChangeMock).toHaveBeenCalledWith(48.06, 100);
        fireEvent.mouseDown(lefDot, { clientX: 200 });
        fireEvent.mouseMove(lefDot, { clientX: 250 });
        fireEvent.mouseUp(lefDot);
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(onValuesChangeMock).toHaveBeenCalledWith(60.19, 100);

    });
});