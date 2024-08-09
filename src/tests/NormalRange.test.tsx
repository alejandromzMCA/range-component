import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
import NormalRange from '../components/NormalRange'

test('Link changes the state when hovered', async () => {
    render(
        <NormalRange minDefault={0} maxDefault={100} />,
    )

    const min = screen.getByDisplayValue('0')

    expect(min).toBeDefined()

    await userEvent.click(min)
    await userEvent.keyboard('10')

    const minUpdated = screen.getByDisplayValue('10')

    expect(minUpdated).toBeDefined()
})
