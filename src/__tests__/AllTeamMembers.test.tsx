import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AllTeamMembers from '../pageComponents/AboutUsPage/AllTeamMembers';

test('Should contain a link to github', () => {
  render(
    <Router>
      <AllTeamMembers />
    </Router>
  );

  const linkOne = screen.getByTestId('HNY-Badger');
  const linkTwo = screen.getByTestId('PakhomovIvan');
  const linkThree = screen.getByTestId('marinrika');

  expect(linkOne).toBeInTheDocument();
  expect(linkTwo).toBeInTheDocument();
  expect(linkThree).toBeInTheDocument();
  expect(linkOne).toHaveAttribute('href', 'https://github.com/HNY-Badger');
  expect(linkTwo).toHaveAttribute('href', 'https://github.com/PakhomovIvan');
  expect(linkThree).toHaveAttribute('href', 'https://github.com/marinrika');
});
