import React from 'react';
import { render } from '@testing-library/react';
import {HeaderComponent, SearchComponent, ContactCardComponent, CalendarCardComponent, DropboxCardComponent, SlackCardComponent, TweetCardComponent} from './../App.js';

test('renders Title', () => {
  const { getByText } = render(<HeaderComponent />);
  const headerTag = getByText(/Welcome to Acme Search/i)
  expect(headerTag).toBeInTheDocument();
});


test('renders Search bar', () => {
  const { getByPlaceholderText  } = render(<SearchComponent/>);
  const placeholder = getByPlaceholderText(/Search something!/i)
  expect(placeholder).toBeTruthy();
});

test('renders Contact card', () => {
  const { getByText  } = render(<ContactCardComponent />);
  const contactHeader = getByText("Contacts");
  const contactBody = getByText("No Contacts to display!")
  expect(contactHeader).toBeInTheDocument();
  expect(contactBody).toBeInTheDocument();
});



test('renders Calendar card', () => {
  const { getByText  } = render(<CalendarCardComponent />);
  const contactHeader = getByText("Calendar");
  const contactBody = getByText("No Events to display!")
  expect(contactHeader).toBeInTheDocument();
  expect(contactBody).toBeInTheDocument();
});


test('renders Dashboard card', () => {
  const { getByText  } = render(<DropboxCardComponent />);
  const contactHeader = getByText("Dropbox");
  const contactBody = getByText("No Files to display!")
  expect(contactHeader).toBeInTheDocument();
  expect(contactBody).toBeInTheDocument();
});


test('renders Slack card', () => {
  const { getByText  } = render(<SlackCardComponent />);
  const contactHeader = getByText("Slack");
  const contactBody = getByText("No Messages to display!")
  expect(contactHeader).toBeInTheDocument();
  expect(contactBody).toBeInTheDocument();
});

test('renders Tweet card', () => {
  const { getByText  } = render(<TweetCardComponent />);
  const contactHeader = getByText("Tweets");
  const contactBody = getByText("No Tweets to display!")
  expect(contactHeader).toBeInTheDocument();
  expect(contactBody).toBeInTheDocument();
});



