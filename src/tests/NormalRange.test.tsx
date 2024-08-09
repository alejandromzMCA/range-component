import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
// import { userEvent } from '@testing-library/user-event'
import React from 'react'
import NormalRange from '../components/NormalRange'

describe('NormalRange Component', () => {
    it('should call onValuesChange with correct values', async () => {
        const onValuesChangeMock = vi.fn();

        render(<NormalRange minDefault={0} maxDefault={100} onValuesChange={onValuesChangeMock} />);

        expect(onValuesChangeMock).toHaveBeenCalledWith(0, 100);
    });
    it('should update min and max values correctly', async () => {
        render(<NormalRange minDefault={0} maxDefault={100} />);

        const minInput = screen.getByRole('textbox', { name: "Range min limit" });
        const maxInput = screen.getByRole('textbox', { name: "Range max limit" });

        await fireEvent.change(minInput, { target: { value: '50' } });
        await fireEvent.change(maxInput, { target: { value: '200' } });

        expect(await screen.findByDisplayValue('50')).toBeInTheDocument();
        expect(await screen.findByDisplayValue('200')).toBeInTheDocument();
    });
    // it('should update values correctly on click and move', async () => {
    //     const onValuesChangeMock = vi.fn();
    //     render(<NormalRange minDefault={0} maxDefault={100} onValuesChange={onValuesChangeMock} />);

    //     const leftDragHandle = screen.getByRole('slider', { name: "Left drag handle" });
    //     const rightDragHandle = screen.getByRole('slider', { name: "Right drag handle" });

    //     fireEvent.mouseDown(leftDragHandle);
    //     fireEvent.mouseMove(leftDragHandle, {  });
    //     fireEvent.mouseUp(leftDragHandle);
    //     expect(onValuesChangeMock).toHaveBeenCalledWith(30, 100);
    // });
});