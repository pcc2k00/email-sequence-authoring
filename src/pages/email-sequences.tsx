import { Helmet } from 'react-helmet-async';

import { EmailSequencesView } from 'src/sections/email-sequences/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Email Sequences</title>
      </Helmet>

      <EmailSequencesView />
    </>
  );
}
