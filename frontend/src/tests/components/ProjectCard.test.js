import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

describe('ProjectCard component', () => {
  const project = { name: 'Demo', description: 'Test project', github: '#' };

  it('renders project name and description', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('Demo')).toBeInTheDocument();
    expect(screen.getByText('Test project')).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('GitHub')).toHaveAttribute('href', '#');
  });
});
