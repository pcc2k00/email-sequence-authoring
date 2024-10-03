# Email Sequence Authoring

This project implements an email sequence authoring workflow on top of the starter project `material-kit-react`. The user can create, edit, and manage email sequences with a simple UI and features like **pre-filled text generation** for the sequence content.

## Features

- **Create New Email Sequences**: Users can create new email sequences with a title and emails such as opening, follow-up, and reply emails.
- **Edit Existing Sequences**: Users can edit the content of existing email sequences.
- **Delete Sequences**: Users can delete email sequences.
- **Pre-filled Text Generation**: A button allows the user to auto-generate content for the emails based on the sequence title.
- **Scheduling Options**: Support for configuring email delays (e.g., 1 day, 3 days, 1 week) between sending the follow-up and reply emails.

## Project Setup

- Clone the repo: `git clone https://github.com/pcc2k00/email-sequence-authoring.git`
- Recommended: `Node.js v20.x`
- **Install:** `npm i` or `yarn install`
- **Start:** `npm run dev` or `yarn dev`
- **Build:** `npm run build` or `yarn build`
- Open browser: `http://localhost:3039`

### Key Components

- **Email Sequences View**: The main component where sequences are listed, and new sequences can be created or edited.
- **SequenceItem**: A card that displays each sequence with options to edit or delete it.
- **Dialog for Sequence Creation**: A dialog that allows users to input sequence details like title, emails, and delays.
- **Text Generation**: The `Generate Texts` button in the sequence creation dialog pre-fills the emails based on the sequence title.

### Key Files

- `src/_mock/_mock.ts`: Mock data for initial sequences.
- `src/sections/email-sequences/view`: Main view component for creating and managing email sequences.
- `src/types.ts`: Contains type definitions for the sequence and steps, including scheduling delays.
- `src/components/sequence-item.tsx`: Component for rendering individual sequence items in the UI.

### Features Added:

1. **Email Sequence Management**:
    - Create, edit, and delete email sequences.
    - Each sequence contains three types of emails: Opening Email, Follow-up Email, and Reply Email.
    - Scheduling delays for follow-up and reply emails can be configured as "1 day," "3 days," or "1 week."

2. **Pre-filled Text Generation**:
    - The "Generate Texts" button automatically fills email content based on the sequence title, providing sample content without external API calls.

3. **Dialog for Sequence Creation/Editing**:
    - A dialog that allows users to input the sequence title and emails.
    - Text fields are disabled until the user enters the sequence title.

### Error Handling

In the **Create Sequence** dialog, error handling is built into the UI to ensure users provide required input for all email fields:

- **Title Error**: If the title is not entered, an error message "Sequence title cannot be empty" is shown, and the user cannot proceed.
- **Email Fields Error**: Each of the three emails (Opening, Follow-up, Reply) is validated. If any email is left blank, an error message specific to that field is shown, e.g., "Follow-up email cannot be empty."
  
  This ensures that sequences are always created with valid and complete data.

### Why AI-Based Prompting Is Not Used

Initially, AI-based prompting was considered to generate email content dynamically. However, since the OpenAI API is a paid service, we opted not to integrate this feature. Instead, we provided a **pre-filled content generation** option to demonstrate how email content can be filled based on the sequence title.

### Future Enhancements

- Add email sending and scheduling workflows.
- Explore integrating a free or lower-cost AI service for dynamic content generation.
- Improve the generated text templates to better suit different sequence use cases.

### Design Rationale

The design was chosen to satisfy the key requirements:
- A clean and intuitive UI for managing email sequences.
- Pre-filled text generation to help users quickly create sequences.
- Error handling to ensure users fill in all necessary fields before saving.
  
The design ensures simplicity while still allowing for potential future enhancements, such as dynamic content generation and scheduling workflows.
"""