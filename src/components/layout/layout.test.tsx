import React from 'react';

import { render } from 'src/utils/custom-render';

import Layout from '.';

describe('Layout Component', () => {
  const customChildren = <div data-testid="children"></div>;

  it('Should render the layout and header containers', () => {
    const { queryByTestId } = render(<Layout />);
    expect(queryByTestId('layout-container-div')).toBeInTheDocument();
    expect(queryByTestId('header-container-div')).toBeInTheDocument();
    expect(queryByTestId('sidebar-container-div')).not.toBeInTheDocument();
    expect(queryByTestId('footer-container-div')).not.toBeInTheDocument();
  });

  it('Should render the sidebar when passing the sidebarOn prop', () => {
    const { queryByTestId } = render(<Layout sidebarOn />);
    expect(queryByTestId('sidebar-container-div')).toBeInTheDocument();
  });

  it('Should render the footer when passing the footerOn prop', () => {
    const { queryByTestId } = render(<Layout footerOn />);
    expect(queryByTestId('footer-container-div')).toBeInTheDocument();
  });

  it('Should render a children when wrapping one', () => {
    const { queryByTestId } = render(<Layout>{customChildren}</Layout>);
    expect(queryByTestId('children')).toBeInTheDocument();
  });
});
