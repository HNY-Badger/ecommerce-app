import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Heading from '../pageComponents/AboutUsPage/Heading';

test('Should contain a link to the RSSchool courses', () => {
  render(
    <Router>
      <Heading />
    </Router>
  );

  const link = screen.getByTestId('rss-link');

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://rs.school/courses');
});
