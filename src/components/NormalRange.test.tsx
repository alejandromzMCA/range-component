import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import NormalRange from './NormalRange'

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
});