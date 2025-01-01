import React from 'react';
import create from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

test('renders without crashing', () => {
    const component = create(<ProfileStatus status="Status" />);
    const root = component.root();
    expect(instance.state.status).toBe("Status");
});

test('after creation <span> should be displated', () => {
    const component = create(<ProfileStatus status="Status" />);
    const root = component.root();
    let span = root.findByType("span")
    expect(span).not.toBeNull()
});

test('after creation <input> shouldn`t be displayed', () => {
    const component = create(<ProfileStatus status="Status" />);
    const root = component.root();
    expect(() => {
    let input = root.findByType("input")
    }).toThrow();
});

test('after creation <input> shouldn`t contains correct status', () => {
    const component = create(<ProfileStatus status="Status" />);
    const root = component.root();
    let span = root.findByType("span")
    expect(span.children[0]).toBe("Status");
});

test('input should be displayed in editMode instead of span', () => {
    const component = create(<ProfileStatus status="Status" />);
    const root = component.root();
    let span = root.findByType("span")
    span.props.onDoubleClick()
    let input = root.findByType("input")
    expect(input.props.value).toBe("Status");
});
