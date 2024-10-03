import type { CardProps } from '@mui/material/Card';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Sequence } from 'src/types';

export function SequenceItem({
  sx,
  sequence,
  onDelete,
  onEdit,
  ...other
}: CardProps & {
  sequence: Sequence;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        typography: 'h5',
      }}
    >
      {sequence.title}
    </Link>
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 1,
        color: 'text.disabled',
      }}
    >
      Created at: {sequence.createdAt}, Updated at: {sequence.updatedAt}
    </Typography>
  );

  const renderSteps = sequence.steps.map((step, index) => (
    <Typography key={index} variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {step.emailType === 'openingEmail' && `Opening Email: ${step.content}`}
      {step.emailType === 'followUpEmail' && `Follow-up Email: ${step.content} (Send after: ${step.scheduleDelay})`}
      {step.emailType === 'replyEmail' && `Reply Email: ${step.content} (Send after: ${step.scheduleDelay})`}
    </Typography>
  ));

  return (
    <Card sx={sx} {...other}>
      <Box sx={{ p: 3 }}>
        {renderTitle}
        {renderDate}
        {renderSteps}

        {/* Buttons */}
        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          <Button variant="outlined" color="primary" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
