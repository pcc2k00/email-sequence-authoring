import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { _sequences } from 'src/_mock/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Sequence, ScheduleDelay, SequenceStep } from 'src/types';
import { Iconify } from 'src/components/iconify';
import { SequenceItem } from '../sequence-item';

export function EmailSequencesView() {
  const [sequences, setSequences] = useState<Sequence[]>(_sequences);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSequence, setEditingSequence] = useState<Sequence | null>(null);
  const [newSequenceTitle, setNewSequenceTitle] = useState('');
  const [openingEmail, setOpeningEmail] = useState('');    
  const [followUpEmail, setFollowUpEmail] = useState('');  
  const [replyEmail, setReplyEmail] = useState('');        
  const [followUpDelay, setFollowUpDelay] = useState<ScheduleDelay>(ScheduleDelay.ONE_DAY);  
  const [replyDelay, setReplyDelay] = useState<ScheduleDelay>(ScheduleDelay.ONE_DAY);        

  const [titleError, setTitleError] = useState(false);
  const [openingEmailError, setOpeningEmailError] = useState(false);
  const [followUpEmailError, setFollowUpEmailError] = useState(false);
  const [replyEmailError, setReplyEmailError] = useState(false);

  const handleOpenEditor = (sequence?: Sequence) => {
    if (sequence) {
      setEditingSequence(sequence);
      setNewSequenceTitle(sequence.title);
      const [opening, followUp, reply] = sequence.steps;
      setOpeningEmail(opening.content);
      setFollowUpEmail(followUp.content);
      setReplyEmail(reply.content);
      setFollowUpDelay(followUp.scheduleDelay || ScheduleDelay.ONE_DAY);
      setReplyDelay(reply.scheduleDelay || ScheduleDelay.ONE_DAY);
    } else {
      setEditingSequence(null);
      setNewSequenceTitle('');
      setOpeningEmail('');
      setFollowUpEmail('');
      setReplyEmail('');
      setFollowUpDelay(ScheduleDelay.ONE_DAY);
      setReplyDelay(ScheduleDelay.ONE_DAY);
    }
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingSequence(null);
    setNewSequenceTitle('');
    setOpeningEmail('');
    setFollowUpEmail('');
    setReplyEmail('');
    setFollowUpDelay(ScheduleDelay.ONE_DAY);
    setReplyDelay(ScheduleDelay.ONE_DAY);

    setTitleError(false);
    setOpeningEmailError(false);
    setFollowUpEmailError(false);
    setReplyEmailError(false);
  };

  // Handle generating email text based on title
  const handleGenerateTexts = () => {
    if (newSequenceTitle.trim()) {
      setOpeningEmail(`This is an opening email for the ${newSequenceTitle} sequence.`);
      setFollowUpEmail(`This is a follow-up email for the ${newSequenceTitle} sequence.`);
      setReplyEmail(`This is a reply email for the ${newSequenceTitle} sequence.`);
    }
  };

  const handleSaveSequence = () => {
    let isValid = true;

    if (!newSequenceTitle) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (!openingEmail) {
      setOpeningEmailError(true);
      isValid = false;
    } else {
      setOpeningEmailError(false);
    }

    if (!followUpEmail) {
      setFollowUpEmailError(true);
      isValid = false;
    } else {
      setFollowUpEmailError(false);
    }

    if (!replyEmail) {
      setReplyEmailError(true);
      isValid = false;
    } else {
      setReplyEmailError(false);
    }

    if (!isValid) return;

    const newSteps: SequenceStep[] = [
      { content: openingEmail, emailType: 'openingEmail' },
      { content: followUpEmail, emailType: 'followUpEmail', scheduleDelay: followUpDelay },
      { content: replyEmail, emailType: 'replyEmail', scheduleDelay: replyDelay },
    ];

    if (editingSequence) {
      const updatedSequences = sequences.map(seq =>
        seq.id === editingSequence.id
          ? { ...seq, title: newSequenceTitle, steps: newSteps, updatedAt: new Date().toISOString().split('T')[0] }
          : seq
      );
      setSequences(updatedSequences);
    } else {
      const newSequence: Sequence = {
        id: (sequences.length + 1).toString(),
        title: newSequenceTitle,
        steps: newSteps,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setSequences([...sequences, newSequence]);
    }

    handleCloseEditor();
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Email Sequences</Typography>

        <Button variant="contained" color="primary" onClick={() => handleOpenEditor()}>
          New Sequence
        </Button>
      </Box>

      <Grid container spacing={3}>
        {sequences.map((sequence) => (
          <Grid key={sequence.id} xs={12} sm={6} md={4}>
            <SequenceItem
              sequence={sequence}
              onDelete={() => setSequences(sequences.filter((s) => s.id !== sequence.id))}
              onEdit={() => handleOpenEditor(sequence)}
            />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />

      <Dialog open={isEditorOpen} onClose={handleCloseEditor} maxWidth="md" fullWidth>
        <DialogTitle>Create a New Sequence (Please enter title then Generate Texts)</DialogTitle>
        <DialogContent>
          {/* Sequence Title */}
          <TextField
            label="Sequence Title"
            value={newSequenceTitle}
            onChange={(e) => setNewSequenceTitle(e.target.value)}
            fullWidth
            error={titleError}
            helperText={titleError ? 'Sequence title cannot be empty' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleGenerateTexts} disabled={!newSequenceTitle}>
                    <Iconify icon="eva:magic-outline" />
                    Generate Texts
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3, mt: 1 }}
          />

          {/* Opening Email */}
          <TextField
            label="Opening Email Content"
            value={openingEmail}
            onChange={(e) => setOpeningEmail(e.target.value)}
            fullWidth
            multiline
            rows={4}
            disabled={!newSequenceTitle}
            error={openingEmailError}
            helperText={openingEmailError ? 'Opening email cannot be empty' : ''}
            sx={{ mb: 2 }}
          />

          {/* Follow-up Email */}
          <TextField
            label="Follow-up Email Content"
            value={followUpEmail}
            onChange={(e) => setFollowUpEmail(e.target.value)}
            fullWidth
            multiline
            rows={4}
            disabled={!newSequenceTitle}
            error={followUpEmailError}
            helperText={followUpEmailError ? 'Follow-up email cannot be empty' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="caption" sx={{ mb: 0.5 }}>
                      Follow-up Delay
                    </Typography>
                    <TextField
                      select
                      value={followUpDelay}
                      onChange={(e) => setFollowUpDelay(e.target.value as ScheduleDelay)}
                      size="small"
                      sx={{ width: '120px' }}
                      disabled={!newSequenceTitle}
                    >
                      <MenuItem value={ScheduleDelay.ONE_DAY}>{ScheduleDelay.ONE_DAY}</MenuItem>
                      <MenuItem value={ScheduleDelay.THREE_DAYS}>{ScheduleDelay.THREE_DAYS}</MenuItem>
                      <MenuItem value={ScheduleDelay.ONE_WEEK}>{ScheduleDelay.ONE_WEEK}</MenuItem>
                    </TextField>
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Reply Email */}
          <TextField
            label="Reply Email Content"
            value={replyEmail}
            onChange={(e) => setReplyEmail(e.target.value)}
            fullWidth
            multiline
            rows={4}
            disabled={!newSequenceTitle}
            error={replyEmailError}
            helperText={replyEmailError ? 'Reply email cannot be empty' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="caption" sx={{ mb: 0.5 }}>
                      Reply Delay
                    </Typography>
                    <TextField
                      select
                      value={replyDelay}
                      onChange={(e) => setReplyDelay(e.target.value as ScheduleDelay)}
                      size="small"
                      sx={{ width: '120px' }}
                      disabled={!newSequenceTitle}
                    >
                      <MenuItem value={ScheduleDelay.ONE_DAY}>{ScheduleDelay.ONE_DAY}</MenuItem>
                      <MenuItem value={ScheduleDelay.THREE_DAYS}>{ScheduleDelay.THREE_DAYS}</MenuItem>
                      <MenuItem value={ScheduleDelay.ONE_WEEK}>{ScheduleDelay.ONE_WEEK}</MenuItem>
                    </TextField>
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditor} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveSequence} variant="contained" color="primary">
            {editingSequence ? 'Save Changes' : 'Save Sequence'}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
