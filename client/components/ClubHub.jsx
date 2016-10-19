import React from 'react'

import Sample from 'Sample'
import SimpleSample from 'SimpleSample'

const ClubHub = () => {
  return (
    <div>
      {/* React components (i.e. page layout) goes here */}
      <Sample
        title={'clubhub'}
      />
      <SimpleSample
        colours={['red', 'blue', 'green']}
        shape={'square'}
      />
    </div>
  )
}

export default ClubHub
