# GetItDone - Transforming Lives Through Education

A South African educational NGO empowering communities through free skills training workshops. Our mission is to help individuals overcome unemployment and build sustainable livelihoods through practical education.

## About GetItDone

GetItDone provides comprehensive skills training in various sectors including:
- Sewing and tailoring
- Gardening and agriculture
- Domestic services
- Catering and food preparation
- Cleaning services
- Retail and customer service


## Development Setup

This project requires Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps to set up the development environment:

```sh
# Clone the repository
git clone https://github.com/isozyn/GetItDone.git

# Navigate to the project directory
cd GetItDone

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── assets/        # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

We welcome contributions to help improve GetItDone's impact. Please feel free to submit issues and pull requests.

## License

This project is open source and available under the MIT License.

## Common Git & GitHub Commands

Below are some essential Git commands you will use when working with this project. Each command includes a brief definition and when to use it:

- `git clone <repo-url>`
  - **Definition:** Creates a local copy of a remote repository.
  - **When to use:** When you want to start working on a project hosted on GitHub or another remote server.

- `git pull`
  - **Definition:** Fetches changes from the remote repository and merges them into your current branch.
  - **When to use:** To update your local codebase with the latest changes from others before you start working or before pushing your own changes.

- `git fetch`
  - **Definition:** Downloads new data from the remote repository but does not merge it into your current branch.
  - **When to use:** To see what others have changed before you pull or to update remote-tracking branches.

- `git status`
  - **Definition:** Shows the current state of your working directory and staging area.
  - **When to use:** To see which files have been modified, added, or deleted before committing.

- `git add <file>`
  - **Definition:** Stages changes for the next commit.
  - **When to use:** Before committing, to specify which files you want to include in the commit.

- `git commit -m "your message"`
  - **Definition:** Records staged changes to your local repository with a message describing the changes.
  - **When to use:** After staging changes, to save a snapshot of your work.

- `git push`
  - **Definition:** Sends your committed changes to the remote repository.
  - **When to use:** To share your work with others or back up your changes to GitHub.

- `git checkout <branch>`
  - **Definition:** Switches your working directory to another branch.
  - **When to use:** To move between different lines of development or review past work.

- `git branch`
  - **Definition:** Lists, creates, or deletes branches.
  - **When to use:** To manage different features or versions of your project.

- `git stash`
  - **Definition:** Temporarily saves changes that are not ready to commit.
  - **When to use:** To clean your working directory without losing work, for example, before switching branches.

- `git tag <tagname>`
  - **Definition:** Creates a reference to a specific commit, often used for releases.
  - **When to use:** To mark release points (e.g., v1.0.0) in your project history.

- `git log`
  - **Definition:** Shows the commit history for the current branch.
  - **When to use:** To review changes and track project history.

These commands will help you manage your code, collaborate with others, and keep track of changes using Git and GitHub.
